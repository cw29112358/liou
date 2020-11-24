/*
 *
 * AgentScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';
import { USER_LOGOUT_SUCCESS } from 'containers/AppRouter/constants';

import {
  AGENT_LOAD,
  AGENT_LOAD_SUCCESS,
  AGENT_LOAD_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function agentSceneReducer(state = initialState, action) {
  switch (action.type) {
    case AGENT_LOAD:
      return state.set('isLoading', true);
    case AGENT_LOAD_SUCCESS: {
      return state
        .set('agentPerformance', getImmutableData(action.agentPerformanceObject))
        .set('agentProfit', getImmutableData(action.agentProfitObject))
        .set('isLoading', false);
    }
    case AGENT_LOAD_FAIL:
      return state
        .set('isLoading', false);
    case USER_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default agentSceneReducer;
