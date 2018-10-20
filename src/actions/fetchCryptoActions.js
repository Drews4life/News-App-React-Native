import * as TYPES from '../types';

export const fetchCryptoList = () => dispatch => {
    
    dispatch({
        type: TYPES.LOADING
    })

    console.log('method called');
    fetch('https://www.cryptocompare.com/api/data/coinlist/')
        .then(res => res.json())
        .then(response => {
            let coinNames = [];
            for (let key in response.Data) {
                if(response.Data.hasOwnProperty(key)) {
                    coinNames.push(key);
                }
            }
            dispatch({
                type: TYPES.FETCH_CRYPTO_LIST,
                payload: coinNames
            })
        })
}

export const fetchCurrenciesPrices = currencies => dispatch => {
    let queryData = currencies.map(t => t).join(',');
    fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${queryData}&tsyms=USD`, {method: 'GET'})
        .then(res => res.json())
        .then(res => {
            let resultFromObjectToArray = [];
            for (let i in res) {
                resultFromObjectToArray.push({
                    [i]: res[i].USD
                });
            }
            dispatch({
                type: TYPES.FETCH_CURRENCY_PRICES,
                payload: resultFromObjectToArray            
            })
        })
}

export const fetchCurrencyGraph = currency => dispatch => {
    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${currency}&tsym=USD&limit=10`, {method: 'GET'})
        .then(res => res.json())
        .then(res => {
            let priceChangesFromOlderToYounger = [];
            let startingDate = '';
            let endingDate = '';

            res.Data.forEach((item, i) => {
                if(i === 0) {
                    startingDate = timeStampToNormalDate(item.time);
                } else if (i === res.Data.length - 1) {
                    endingDate = timeStampToNormalDate(item.time);
                }
                priceChangesFromOlderToYounger.push(item.open)
            })

            let priceAndTimeObject = {
                data: priceChangesFromOlderToYounger,
                startingDate: startingDate,
                endingDate: endingDate,
                currency: currency
            }

            dispatch({
                type: TYPES.FETCH_CURRENCY_DATA,
                payload: priceAndTimeObject
            })
        })
} 

const timeStampToNormalDate = timestamp => {
    let date = new Date(timestamp*1000);

    let day = date.getDate();
    
    let month = date.getMonth();

    let year = date.getFullYear();

    return `${day}:${month}:${year}`;
}