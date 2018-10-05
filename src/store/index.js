import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Thunk from 'redux-thunk';

import reducer from '../reducers';
import rootSaga from './sagas';

//const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    reducer,
    applyMiddleware(Thunk)
)

//sagaMiddleware.run(rootSaga);
