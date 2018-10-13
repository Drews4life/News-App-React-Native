import * as TYPES from '../types';

const INITIAL_STATE = {
    cryptoList: [],
    cryptoData: [],
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