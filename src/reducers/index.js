import { combineReducers } from 'redux';
import fetchNews from './fetchNewsReducer';
import fetchCrypto from './fetchCryptoReducer';
import getOfflineData from './getOfflineDataReducer'

export default combineReducers({
    fetchNews,
    fetchCrypto,
    getOfflineData
});