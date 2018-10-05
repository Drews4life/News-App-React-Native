import * as TYPES from '../types';

const INITIAL_STATE = {
    news: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.FETCH_NEWS:
            return {...state, news: action.payload};
        default:
            return state;
    }
};