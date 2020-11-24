/*
 *
 * AgentScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
  all,
} from 'redux-saga/effects';
import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  AGENT_LOAD,
} from './constants';
import {
  agentLoadSuccessAction,
  agentLoadFailAction,
} from './actions';

export function* loadAgent() {
  try {
    const result = yield all([
      call(StrapiApi.getAgentPerformance),
      call(StrapiApi.getAgentProfit),
    ]);
    yield put(agentLoadSuccessAction(result[0], result[1]));
  } catch (err) {
    yield put(agentLoadFailAction(err));
  }
}

export function* watchLoadAgent() {
  yield takeLatest(AGENT_LOAD, loadAgent);
}

export default [
  {
    key: 'agentScene',
    saga: watchLoadAgent,
    mode: DAEMON,
  },
];
