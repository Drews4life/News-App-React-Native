import * as TYPES from '../types';


export const fetchNews = (region, newsType) => dispatch => {
    let url = `https://newsapi.org/v2/top-headlines?country=${region || 'us'}&apiKey=1fb2e951fa05458187f1e74fae5eb65e`;

    if(newsType === 'Bitcoin') url = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=1fb2e951fa05458187f1e74fae5eb65e'
    if(newsType === 'NYTimes') url = 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=1fb2e951fa05458187f1e74fae5eb65e'
    

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
    .catch(e => dispatch({type: TYPES.fetchNewsFailed}));
}