/*
 *
 * MyFavouritesScene sagas
 *
 */

/* global window translate */

import {
  takeLatest,
  call,
  select,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import { updatePublicProfilesAction } from 'containers/AppRouter/actions';

import {
  LOAD_MY_FAVOURITES,

  UPDATE_FAVOURITES,
} from './constants';
import {
  loadMyFavouritesAction,

  loadMyFavouritesSuccessAction, loadMyFavouritesFailAction,

  updateFavouritesSuccessAction, updateFavouritesFailAction,
} from './actions';
import {
  selectFavourites,
  selectFavouritesIds,
} from './selectors';

export function* loadFavouriteProjects(action) {
  try {
    const { forceReload, updateAction } = action.params;
    const favourites = yield select(selectFavourites);
    let result = favourites;

    if (favourites.size === 0 || forceReload) {
      result = yield call(StrapiApi.getMyFavouritesApi);
    }
    yield put(loadMyFavouritesSuccessAction(result));
    yield put(updatePublicProfilesAction({ list: result }));
    if (updateAction) {
      yield toastFavourite(updateAction, 'unFavourite', 'favouriteSuccess');
    }
  } catch (error) {
    const { updateAction } = action.params;
    if (updateAction) {
      yield toastFavourite(updateAction, 'unFavouriteFail', 'favouriteFail');
    }
    yield put(loadMyFavouritesFailAction(error));
  }
}

function* toastFavourite(action, defaultLabel, otherLabel) {
  const { projectId: { activityId } } = action;
  const isString = typeof activityId === 'string';
  let label = defaultLabel;
  if (isString) {
    const ids = yield select(selectFavouritesIds);
    if (ids.includes(activityId)) {
      label = otherLabel;
    }
  }
  window.toast(translate(label));
}
export function* updateFavouriteProjects(action) {
  try {
    yield call(StrapiApi.updateFavouriteProjects, action.projectId);
    yield put(updateFavouritesSuccessAction());
    yield put(loadMyFavouritesAction({ forceReload: true, updateAction: action }));
  } catch (error) {
    yield put(updateFavouritesFailAction(error));
  }
}

export function* watchLoadFavouriteProjects() {
  yield takeLatest(LOAD_MY_FAVOURITES, loadFavouriteProjects);
}
export function* watchUpdateFavouriteProjects() {
  yield takeLatest(UPDATE_FAVOURITES, updateFavouriteProjects);
}
export default [
  {
    key: 'watchLoadFavouriteProjects',
    saga: watchLoadFavouriteProjects,
    mode: DAEMON,
  },
  {
    key: 'watchUpdateFavouriteProjects',
    saga: watchUpdateFavouriteProjects,
    mode: DAEMON,
  },
];
