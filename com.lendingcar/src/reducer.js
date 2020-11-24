import { combineReducers } from 'redux-immutable';
import Immutable, { fromJS } from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import {
  LOAD_FORM,
  LOAD_FORM_SUCCESS,
  LOAD_FORM_FAIL,

  UPDATE_FORM,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAIL,

  UPLOAD_REF_FILE,
  UPLOAD_REF_FILE_SUCCESS,
  UPLOAD_REF_FILE_FAIL,
} from 'containers/AppRouter/constants';

export default function createReducer(injectedReducers) {
  const allReducer = combineReducers({
    form: formReducer,
    ...injectedReducers,
  });
  const rootReducer = (state = fromJS({}), action) => {
    switch (action.type) {
      case LOAD_FORM:
        return state;
      case LOAD_FORM_SUCCESS: {
        const { reduxEndPoint, formObj } = action;

        const result = state.setIn(['appRouter', 'isLoading'], false);
        if (!reduxEndPoint) return result;

        const reduxData = formObj ? fromJS(formObj) : Immutable.Map();
        return result.setIn(reduxEndPoint, reduxData);
      }
      case LOAD_FORM_FAIL:
        return state.setIn(['appRouter', 'isLoading'], false);

      case UPDATE_FORM:
        return state.setIn(['appRouter', 'isLoading'], true);
      case UPDATE_FORM_SUCCESS: {
        const { reduxEndPoint, formObj } = action;

        const result = state.setIn(['appRouter', 'isLoading'], false);
        if (!reduxEndPoint) return result;

        return result.updateIn(reduxEndPoint, (val) => {
          const original = (val && val.size) ? val : Immutable.Map();
          return original.merge(fromJS(formObj));
        });
      }
      case UPDATE_FORM_FAIL: {
        return state.setIn(['appRouter', 'isLoading'], false);
      }

      case UPLOAD_REF_FILE:
        return state.setIn(['appRouter', 'isLoading'], true);
      case UPLOAD_REF_FILE_SUCCESS: {
        const { files, reduxEndPoint, reduxFormEndPoint } = action;
        const filesMap = files ? fromJS(files) : null;

        return state
          .setIn(['appRouter', 'isLoading'], false)
          .updateIn(reduxEndPoint, (value) => filesMap || value)
          .updateIn(reduxFormEndPoint, (value) => filesMap || value);
      }
      case UPLOAD_REF_FILE_FAIL: {
        return state.setIn(['appRouter', 'isLoading'], false);
      }

      default:
        return allReducer(state, action);
    }
  };

  return rootReducer;
}
