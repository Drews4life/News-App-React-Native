import * as TYPES from '../types';

const INITIAL_STATE = {
    news: [],
    favourite: [],
    fetchingFavs: false,
    fetchingNews: false,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.FETCH_NEWS:
            return {
                ...state, 
                news: action.payload, 
                fetchingNews: true,
                fetchingFavs: false,
                loading: false
            };
        case TYPES.FETCH_FAVOURITE: 
            return {
                ...state, 
                favourite: action.payload,
                fetchingNews: false,
                fetchingFavs: true,
                loading: false
            };
        case TYPES.FETCH_NEW_FAILED:
            return {
                ...state,
                loading: false
            }
        case TYPES.LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
};