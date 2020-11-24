/*
 *
 * MyNewsScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  loadNotificationsSuccessAction,
  loadNotificationsFailAction,
} from './actions';
import {
  LOAD_NOTIFICATIONS,
} from './constants';

export function* loadNotifications() {
  try {
    const notifications = yield call(StrapiApi.getNotifications);
    yield put(loadNotificationsSuccessAction(notifications));
  } catch (error) {
    yield put(loadNotificationsFailAction(error));
  }
}

export function* watchLoadForm() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}

export default [
  {
    key: 'myNewsScene',
    saga: watchLoadForm,
    mode: DAEMON,
  },
];
