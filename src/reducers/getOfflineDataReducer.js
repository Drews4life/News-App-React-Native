import * as TYPES from '../types';

const INITIAL_STATE = {
    currencies: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.GET_OFFLINE_CURRENCIES:
            return {...state, currencies: action.payload}
        case TYPES.DELETE_OFFLINE_CURRENCIE:
            return {...state, currencies: action.payload}
        default:
            return state;
    }
}