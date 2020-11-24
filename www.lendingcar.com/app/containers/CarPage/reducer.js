/*
 *
 * CarPage reducer
 *
 */

import Immutable, { fromJS } from 'immutable';
import {
  LOAD_CAR,
  LOAD_CAR_SUCCESS,
  LOAD_CAR_FAIL,
  CHANGE_PLAN,
  CHANGE_TYPE,
} from './constants';

const initialState = fromJS({
  carId: '',
  carObject: {},
  error: '',
  isLoading: true,
});

function carPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CAR:
      return state
        .set('carId', action.params.carId)
        .set('carObject', Immutable.Map())
        .set('isLoading', true);
    case LOAD_CAR_SUCCESS:
      return state.set('carObject', fromJS(action.carObject)).set('isLoading', false);
    case LOAD_CAR_FAIL:
      return state.set('error', action.error).set('isLoading', false);
    case CHANGE_PLAN:
      return state.set('curPlanType', action.curPlanType);
    case CHANGE_TYPE:
      return state.set('curPlanCategory', action.curPlanCategory);
    default:
      return state;
  }
}

export default carPageReducer;
