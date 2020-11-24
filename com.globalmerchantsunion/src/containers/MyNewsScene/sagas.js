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
import { executeFunction } from 'utils/helpers';

import { updatePublicProfilesAction } from 'containers/AppRouter/actions';
import { loadConnectionsAction } from 'containers/MyConnectionScene/actions';

import {
  loadNotificationsSuccessAction, loadNotificationsFailAction,
  loadInvitationsSuccessAction, loadInvitationsFailAction,
  changeInvitationSuccessAction, changeInvitationFailAction,
} from './actions';
import {
  LOAD_NOTIFICATIONS,
  LOAD_INVITATIONS,
  CHANGE_INVITATION,
} from './constants';

export function* loadNotifications(action) {
  try {
    const { onSuccess } = action;
    const notifications = yield call(StrapiApi.getNotifications);
    yield put(loadNotificationsSuccessAction(notifications));
    executeFunction(onSuccess, notifications);
  } catch (error) {
    yield put(loadNotificationsFailAction(error));
  }
}
export function* loadInvitations(action) {
  try {
    const { onSuccess } = action;
    const result = yield call(StrapiApi.getReceivedInvitations);
    yield put(loadInvitationsSuccessAction(result));
    yield put(updatePublicProfilesAction({ list: result, key: 'from' }));
    executeFunction(onSuccess, result);
  } catch (error) {
    yield put(loadInvitationsFailAction(error));
  }
}
export function* changeInvitation(action) {
  try {
    const { apiType, id } = action;
    const result = yield call(StrapiApi.changeInvitation, apiType, id);
    yield put(changeInvitationSuccessAction(result, apiType));
    if (apiType === 'accept') yield put(loadConnectionsAction({ forceReload: true }));
  } catch (error) {
    yield put(changeInvitationFailAction(error));
  }
}

export function* watchLoadNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}
export function* watchLoadInvitations() {
  yield takeLatest(LOAD_INVITATIONS, loadInvitations);
}
export function* watchChangeInvitation() {
  yield takeLatest(CHANGE_INVITATION, changeInvitation);
}

export default [
  {
    key: 'loadNotifications',
    saga: watchLoadNotifications,
    mode: DAEMON,
  },
  {
    key: 'loadInvitations',
    saga: watchLoadInvitations,
    mode: DAEMON,
  },
  {
    key: 'changeInvitation',
    saga: watchChangeInvitation,
    mode: DAEMON,
  },
];
