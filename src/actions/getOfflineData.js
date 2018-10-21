import { AsyncStorage } from 'react-native';
import { fetchCurrenciesPrices } from './fetchCryptoActions'
import _ from 'lodash';
import * as TYPES from '../types';

export const getAllCurrenciesOffline = () => dispatch => {
    AsyncStorage.getItem('currencies')
      .then(res => JSON.parse(res))
      .then(result => {
        console.log(`
              
        result
        
        `, result);
          if (!_.isNull(result) && !_.isUndefined(result) && !_.isEmpty(result)) {
            
            dispatch({
                type: TYPES.GET_OFFLINE_CURRENCIES,
                payload: result
            })
            dispatch(fetchCurrenciesPrices(result));
          }
    })
}

export const deleteCurrency = itemName => dispatch => {
    AsyncStorage.getItem('currencies')
        .then(unparsedResult => {
            let currencies = JSON.parse(unparsedResult);
           
            let excludedCurrenciesList = currencies.filter(item => item !== itemName);
            
            AsyncStorage.setItem('currencies', JSON.stringify(excludedCurrenciesList))
                .then(() => {
                    dispatch({
                        type: TYPES.DELETE_OFFLINE_CURRENCIE,
                        payload: excludedCurrenciesList
                    })
                }
            )
        })
}