/*
 *
 * ProfileScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  uploadRefFileAction,
} from 'containers/AppRouter/actions';

import {
  RELEASE_ACTIVITIES,
} from './constants';
import {
  releaseActivitiesSuccessAction, releaseActivitiesFailAction,
} from './actions';
import { selectUploadFileObject } from './selectors';

export function* releaseActivities(action) {
  const {
    formData,
  } = action;
  try {
    const result = yield call(StrapiApi.releaseApi, formData);
    const { id } = result;
    const reduxEndPoint = ['form', 'releaseForm', 'values', field];
    const fileObject = yield select(selectUploadFileObject);
    const { field, fileBuffer } = fileObject;

    if (field) {
      yield put(uploadRefFileAction('Activity', id, field, fileBuffer, reduxEndPoint, false));
    }
    yield put(releaseActivitiesSuccessAction(result));
  } catch (error) {
    yield put(releaseActivitiesFailAction(error));
  }
}

export function* watchReleaseActivities() {
  yield takeLatest(RELEASE_ACTIVITIES, releaseActivities);
}
export default [
  {
    key: 'watchReleaseActivities',
    saga: watchReleaseActivities,
    mode: DAEMON,
  },
];
