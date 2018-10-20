import * as TYPES from '../types';

const INITIAL_STATE = {
    cryptoList: [],
    cryptoData: [],
    cryptoPrices: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case TYPES.FETCH_CRYPTO_LIST: 
            return {
                ...state,
                cryptoList: action.payload,
                loading: false
            }
        case TYPES.FETCH_CURRENCY_PRICES:
            return {
                ...state,
                cryptoPrices: action.payload,
                loading: false
            }
        case TYPES.FETCH_CURRENCY_DATA: 
            return {
                ...state,
                cryptoData: [
                    ...state.cryptoData,
                    action.payload
                ],
                loading: false
            }
        case TYPES.LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return {
                ...state, 
                loading: false
            };
    }
};