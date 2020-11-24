import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import createReducer from './reducer';

// This connects the reducer to the store
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const initialState = fromJS({});
  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducer'); // eslint-disable-line
      store.replaceReducer(createReducer(nextRootReducer));
    });
  }

  return store;
};

export default configureStore;
