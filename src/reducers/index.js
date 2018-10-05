import { combineReducers } from 'redux';
import fetchNews from './fetchNewsReducer';

export default combineReducers({
    fetchNews,
});