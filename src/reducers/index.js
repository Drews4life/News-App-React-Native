import { combineReducers } from 'redux';
import fetchNews from './fetchNewsReducer';
import fetchCrypto from './fetchCryptoReducer';

export default combineReducers({
    fetchNews,
    fetchCrypto
});