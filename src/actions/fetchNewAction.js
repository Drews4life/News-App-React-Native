import * as TYPES from '../types';
import { AsyncStorage } from 'react-native';

export const fetchNews = (region, newsType) => dispatch => {
    let url = `https://newsapi.org/v2/top-headlines?country=${region || 'us'}&apiKey=1fb2e951fa05458187f1e74fae5eb65e`;

    if (newsType === 'Bitcoin') url = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=1fb2e951fa05458187f1e74fae5eb65e'
    if (newsType === 'NYTimes') url = 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=1fb2e951fa05458187f1e74fae5eb65e'
    
    dispatch({type: TYPES.LOADING});

    fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: TYPES.FETCH_NEWS,
                payload: response
            })
        })
        .catch(e => dispatch({ type: TYPES.fetchNewsFailed }));
}

export const fetchFavourite = () => dispatch => {
    dispatch({type: TYPES.LOADING});
    AsyncStorage.getItem('favourites')
        .then(res => {
            if (res !== null) {
                dispatch({
                    type: TYPES.FETCH_FAVOURITE,
                    payload: JSON.parse(res)
                });
            }
        })
}