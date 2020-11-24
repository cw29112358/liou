/*
 *
 * UserInfoScene sagas
 *
 */
import {
  takeLatest,
  // cancel,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';
import { DAEMON } from 'utils/constants';
import { GET_CUSTOMER_INFO } from './constants';
import {
  getCustomerActionSuccess,
  getCustomerActionFail,
} from './actions';

export function* getCustomer() {
  try {
    const result = yield call(StrapiApi.getAgentCustomer);
    yield put(getCustomerActionSuccess(result));
  } catch (error) {
    yield put(getCustomerActionFail(error));
  }
}
export function* watchGetCustomer() {
  yield takeLatest(GET_CUSTOMER_INFO, getCustomer);
}

export default [
  {
    key: 'userInfoScene',
    saga: watchGetCustomer,
    mode: DAEMON,
  },
];
