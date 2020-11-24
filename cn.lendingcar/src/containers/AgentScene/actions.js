/*
 *
 * AgentScene actions
 *
 */

import {
  AGENT_LOAD,
  AGENT_LOAD_SUCCESS,
  AGENT_LOAD_FAIL,
} from './constants';

export function agentLoadAction(params = {}) {
  return {
    type: AGENT_LOAD,
    params,
  };
}
export function agentLoadSuccessAction(agentPerformanceObject, agentProfitObject) {
  return {
    type: AGENT_LOAD_SUCCESS,
    agentPerformanceObject,
    agentProfitObject,
  };
}
export function agentLoadFailAction() {
  return {
    type: AGENT_LOAD_FAIL,
  };
}
