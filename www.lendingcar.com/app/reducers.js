/**
* Combine all reducers in this file and export the combined reducers.
* If we were to do this in store.js, reducers wouldn't be hot reloadable.
*/

import Immutable, { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import appReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { LOAD_FORM, LOAD_FORM_SUCCESS, LOAD_FORM_FAIL, UPDATE_FORM, UPDATE_FORM_SUCCESS, UPDATE_FORM_FAIL, UPLOAD_FILE_FORM, UPLOAD_FILE_FORM_SUCCESS, UPLOAD_FILE_FORM_FAIL } from 'containers/App/constants';
/*
* routeReducer
*
* The reducer merges route location changes into our immutable state.
* The change is necessitated by moving to react-router-redux@4
*
*/

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
* Merge route into the global application state
*/
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
  /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
* Creates the main reducer with the asynchronously loaded ones
*/
export default function createReducer(asyncReducers) {
  const allReducer = combineReducers({
    app: appReducer,
    route: routeReducer,
    form: reduxFormReducer,
    language: languageProviderReducer,
    ...asyncReducers,
  });
  const rootReducer = (state, action) => {
    switch (action.type) {
      case UPDATE_FORM:
        return state.setIn(['app', 'isLoading'], true);
      case UPDATE_FORM_SUCCESS: {
        const original = state.getIn(action.reduxEndPoint, Immutable.Map());
        return state.setIn(['app', 'isLoading'], false)
                    .setIn(action.reduxEndPoint, original.merge(action.formMap));
      }
      case UPDATE_FORM_FAIL: {
        return state;
        // .setIn(['app', 'isLoading', 'error'], action.error.message);
      }

      case LOAD_FORM:
        return state;
      case LOAD_FORM_SUCCESS: {
        let newState = state.setIn(['app', 'isLoading'], false);
        if (action.formMap) newState = newState.setIn(action.reduxEndPoint, action.formMap);
        else newState = newState.setIn(action.reduxEndPoint, Immutable.Map());
        return newState;
      }
      case LOAD_FORM_FAIL:
        return state;
        // .setIn(['app', 'users', 'error'], action.error.message);

      case UPLOAD_FILE_FORM:
        return state.setIn(['app', 'isLoading'], true);
      case UPLOAD_FILE_FORM_SUCCESS: {
        action.reduxEndPoint.push(action.fieldName);
        const relativeUrl = action.fileUrl.split('/').reverse().slice(0, 3).reverse().join('/');
        return state.setIn(['app', 'isLoading'], false)
                    .setIn(action.reduxEndPoint, relativeUrl);
      }
      case UPLOAD_FILE_FORM_FAIL: {
        console.warn(action.error);
        return state;
        // .setIn(['app', 'users', 'error'], action.error.message);
      }
      default:
        return allReducer(state, action);
    }
  };
  return rootReducer;
}
