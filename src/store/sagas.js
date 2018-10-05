import { takeEvery, all, takeLatest, fork } from 'redux-saga/effects';
import * as TYPES from '../types';
import callingAPItoFetchNews  from '../sagas';

function* mySaga() {
    yield all ([
        callingAPItoFetchNews()
    ])
}

export default mySaga;