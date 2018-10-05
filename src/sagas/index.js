// import * as TYPES from '../types';
// import { call, put, takeLatest, takeEvery, take} from 'redux-saga/effects';

// const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=1fb2e951fa05458187f1e74fae5eb65e`;

// const api = link => fetch(link, {
//     method: 'GET'
// }).then(res => res.json());

// function* callingAPItoFetchNews (action) {
//     try {
//         const response = yield call(api, url);
//         yield put({type: TYPES.FETCH_NEWS, payload: response});
//     } catch (e) {
//         yield put({type: TYPES.FETCH_NEW_FAILED});
//     }
// }


// export default function* watcherSaga () {
//     yield takeEvery([TYPES.FETCH_NEWS, TYPES.FETCH_NEW_FAILED], callingAPItoFetchNews)
// }