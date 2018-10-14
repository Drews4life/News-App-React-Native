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

export const fetchCurrencyData = currency => {
    
}