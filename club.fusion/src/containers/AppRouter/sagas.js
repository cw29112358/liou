/*
 *
 * AppRouter sagas
 *
 */

import {
  takeLatest,
  takeEvery,
  call,
  put,
  all,
  select,
} from 'redux-saga/effects';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import pick from 'lodash/pick';
import { fromJS } from 'immutable';

import * as StrapiApi from 'apis/strapi';

import auth from 'utils/auth';
import { DAEMON } from 'utils/constants';
import {
  executeFunction,
  setIsOnline,
} from 'utils/helpers';

import {
  USER_LOGIN, USER_LOGIN_JWTTOKEN,
  USER_UPDATE_MEMBERSHIP, SAVE_NOTIFICATION_TOKEN,
  USER_LOGOUT,
  SEND_VERIFICATION_CODE, VERIFY_VERIFICATION_CODE, USER_SIGNUP,

  RESET_PASSWORD, CHANGE_PASSWORD, CHANGE_LANGUAGE,
  UPDATE_PUBLIC_PROFILES,

  LOAD_FORM, UPDATE_FORM, UPLOAD_REF_FILE,
} from './constants';
import {
  loggedInByUserAction, loggedInByUserFailAction,
  updateMembershipSuccessAction, updateMembershipFailAction,
  saveNotificationTokenAction,
  loggedOutByUserAction, loggedOutByUserFailAction,

  sendVerificationCodeSuccessAction, sendVerificationCodeFailAction,
  verifyVerificationCodeSuccessAction, verifyVerificationCodeFailAction,
  signupUserSuccessAction, signupUserFailAction,

  resetPasswordSuccessAction, resetPasswordFailAction,
  changePasswordSuccessAction, changePasswordFailAction,
  changeLanguageSuccessAction,
  updatePublicProfilesSuccessAction, updatePublicProfilesFailAction,

  loadFormSuccessAction, loadFormFailAction,
  updateFormSuccessAction, updateFormFailAction,
  uploadRefFileSuccessAction, uploadRefFileFailAction,
} from './actions';
import {
  selectProfiles,
} from './selectors';

// login/singnUp/logout
function validProfile(authUser) {
  const { profile } = authUser;
  if (!profile || !profile.id) {
    const error = new Error('Profile is null!');
    StrapiApi.reportFetchError(error);
    throw error;
  }
}
export function* loginByUser(action) {
  try {
    const {
      user, isPasswordLogin, onSuccess, isOnlyValid,
    } = action;
    const loginAPI = isPasswordLogin ? StrapiApi.signIn : StrapiApi.signInByVerificationCode;
    const authUser = yield call(loginAPI, user);

    validProfile(authUser);
    yield put(loggedInByUserAction(authUser, isOnlyValid));
    executeFunction(onSuccess, authUser);
  } catch (err) {
    yield put(loggedInByUserFailAction(err, action.isOnlyValid));
  }
}
export function* logInByJwtToken(action) {
  const { onSuccess, onFail } = action;
  try {
    const authUser = yield call(StrapiApi.logInByJwtToken);
    validProfile(authUser);
    yield put(loggedInByUserAction(authUser));
    executeFunction(onSuccess, authUser);
  } catch (err) {
    yield put(loggedInByUserFailAction(err));
    executeFunction(onFail);
  }
}

export function* updateMembership(action) {
  const { onSuccess, onFail } = action;
  try {
    const membership = yield call(StrapiApi.getMembershipsMe);
    yield put(updateMembershipSuccessAction(membership));
    executeFunction(onSuccess, membership);
  } catch (err) {
    yield put(updateMembershipFailAction());
    executeFunction(onFail);
  }
}
export function* saveNotificationToken() {
  try {
    const token = yield call(auth.get, 'xgDeviceToken');
    const platform = Platform.OS;
    if (token) {
      yield call(StrapiApi.saveNotificationToken, token, platform);
    }
  } catch (err) {
    console.warn('save notification token fail');
  }
}
export function* logoutByUser() {
  try {
    const results = yield call(StrapiApi.signOut);
    yield put(loggedOutByUserAction(results));
    Actions.reset('entry');
  } catch (err) {
    yield put(loggedOutByUserFailAction(err));
  }
}

function getVerificationCodeInfo(seconds) {
  return {
    startScene: Actions.currentScene,
    startTime: new Date().getTime(),
    seconds,
  };
}
export function* sendVerificationCode(action) {
  try {
    const {
      isAccountUser, countryCode, phoneNumber, seconds, onSuccess,
    } = action;
    const sendVerificationCodeAPI = isAccountUser ? StrapiApi.submitPhoneNumberAccountVerification : StrapiApi.submitPhoneNumberVerification;
    const result = yield call(sendVerificationCodeAPI, countryCode, phoneNumber);
    const verificationCodeInfo = getVerificationCodeInfo(seconds);
    yield put(sendVerificationCodeSuccessAction(result, verificationCodeInfo));
    executeFunction(onSuccess);
  } catch (err) {
    yield put(sendVerificationCodeFailAction(err));
  }
}
export function* verifyVerificationCode(action) {
  try {
    const {
      countryCode,
      phoneNumber,
      verificationCode,
      onSuccess,
    } = action;
    const result = yield call(StrapiApi.verifyPhoneNumber, countryCode, phoneNumber, verificationCode);
    yield put(verifyVerificationCodeSuccessAction(result));
    executeFunction(onSuccess);
  } catch (err) {
    yield put(verifyVerificationCodeFailAction(err));
  }
}
export function* signupUser(action) {
  const { user, onSuccess } = action;
  try {
    const authUser = yield call(StrapiApi.signUp, user);
    yield put(signupUserSuccessAction(authUser));
    yield put(loggedInByUserAction(authUser));
    yield put(saveNotificationTokenAction());
    executeFunction(onSuccess, authUser);
    setIsOnline();
    Actions.reset('signUp', { step: 3 });
  } catch (err) {
    yield put(signupUserFailAction(err));
  }
}

export function* resetPassword(action) {
  try {
    const { newPassword } = action;
    const result = yield call(StrapiApi.resetUserPassword, newPassword);
    yield put(resetPasswordSuccessAction(result));
    Actions.reset('login');
  } catch (err) {
    yield put(resetPasswordFailAction(err));
  }
}
export function* changePassword(action) {
  try {
    const { oldPassword, newPassword, onSuccess } = action;
    const result = yield call(StrapiApi.changeUserPassword, oldPassword, newPassword);
    yield put(changePasswordSuccessAction(result));
    executeFunction(onSuccess);
  } catch (err) {
    yield put(changePasswordFailAction(err));
  }
}
export function* changeLanguage(action) {
  try {
    const { language } = action;
    const hasLanguage = I18n.translations[language];
    if (hasLanguage) {
      I18n.locale = language;
      auth.set(language, 'language');
      yield put(changeLanguageSuccessAction(language));
    } else {
      console.warn('Don\'t have have this language!');
    }
  } catch (err) {
    console.warn('change language error', err);
  }
}
function pickProfilePublicInfo(profile) {
  return pick(profile, [
    'id', 'user', 'area', 'industry', 'avatar',
    'verificationStatus', 'verifiedName', 'verifiedCompany', 'verifiedOccupation',
  ]);
}
export function* updatePublicProfiles(action) {
  try {
    const {
      params: {
        getAll, list, key = 'user', profile, profiles,
      },
    } = action;
    let reduxPublicProfiles = yield select(selectProfiles);

    let addProfiles = [];
    if (getAll) {
      addProfiles = yield call(StrapiApi.getPublicProfiles);
    } else if (list && list.length) { // 1. list key => call api
      const userIds = list
        .filter((item) => !reduxPublicProfiles.has(item[key]))
        .map((item) => item[key]);

      if (userIds.length) {
        addProfiles = yield call(StrapiApi.getPublicProfilesByIds, userIds);
      }
    } else if (profile) { // 2. 新增的profile
      addProfiles = [pickProfilePublicInfo(profile)];
    } else if (profiles) { // 3. 新增的profiles
      addProfiles = profiles.map((item) => pickProfilePublicInfo(item));
    }

    reduxPublicProfiles = addProfiles.reduce((map, item) => {
      if (item.user) return map.set(item.user, fromJS(item));
      return map;
    }, reduxPublicProfiles);

    yield put(updatePublicProfilesSuccessAction(reduxPublicProfiles));
  } catch (err) {
    yield put(updatePublicProfilesFailAction(err));
  }
}

// form
export function* loadForm(action) {
  try {
    const { path, reduxEndPoint, onSuccess } = action;
    const result = yield call(StrapiApi.loadForm, path);
    yield put(loadFormSuccessAction(result, reduxEndPoint));
    executeFunction(onSuccess, result);
  } catch (err) {
    yield put(loadFormFailAction(err));
  }
}
export function* updateForm(action) {
  try {
    const {
      formMap, path, reduxEndPoint, isCreate, onSuccess,
    } = action;
    let result = formMap;

    // call create/update form api
    if (path) {
      const formObj = formMap.toJS();
      const updateAPI = (formObj instanceof Array || isCreate) ? StrapiApi.setForm : StrapiApi.updateForm;
      result = yield call(updateAPI, formObj, path);
    }

    yield put(updateFormSuccessAction(result, reduxEndPoint));
    executeFunction(onSuccess, result);
  } catch (err) {
    yield put(updateFormFailAction(err));
  }
}
export function* uploadRefFile(action) {
  try {
    const {
      ref, refId, field, fileBuffer, reduxEndPoint, isSingleFile,
    } = action;
    const results = yield call(StrapiApi.uploadRefFile, ref, refId, field, fileBuffer);
    const files = isSingleFile ? results[0] : results;
    yield put(uploadRefFileSuccessAction(reduxEndPoint, files));
  } catch (err) {
    yield put(uploadRefFileFailAction(err));
  }
}

/* watch */
export function* watchLogin() {
  yield takeLatest(USER_LOGIN, loginByUser);
}
export function* watchlogInByJwtToken() {
  yield takeLatest(USER_LOGIN_JWTTOKEN, logInByJwtToken);
}
export function* watchLogout() {
  yield takeLatest(USER_LOGOUT, logoutByUser);
}

export function* watchUpdateMembership() {
  yield takeLatest(USER_UPDATE_MEMBERSHIP, updateMembership);
}
export function* watchSaveNotificationToken() {
  yield takeLatest(SAVE_NOTIFICATION_TOKEN, saveNotificationToken);
}

export function* watchSendVerificationCode() {
  yield takeLatest(SEND_VERIFICATION_CODE, sendVerificationCode);
}
export function* watchVerifyVerificationCode() {
  yield takeLatest(VERIFY_VERIFICATION_CODE, verifyVerificationCode);
}
export function* watchSignup() {
  yield takeLatest(USER_SIGNUP, signupUser);
}

export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD, resetPassword);
}
export function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD, changePassword);
}
export function* watchChangeLanguage() {
  yield takeLatest(CHANGE_LANGUAGE, changeLanguage);
}
export function* watchUpdatePublicProfiles() {
  yield takeEvery(UPDATE_PUBLIC_PROFILES, updatePublicProfiles);
}

export function* watchLoadForm() {
  yield takeLatest(LOAD_FORM, loadForm);
}
export function* watchUpdateForm() {
  yield takeLatest(UPDATE_FORM, updateForm);
}
export function* watchUploadRefFile() {
  yield takeLatest(UPLOAD_REF_FILE, uploadRefFile);
}
export function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield all([
    watchLogin(),
    watchlogInByJwtToken(),
    watchUpdateMembership(),
    watchSaveNotificationToken(),
    watchLogout(),

    watchSendVerificationCode(),
    watchVerifyVerificationCode(),
    watchSignup(),

    watchResetPassword(),
    watchChangePassword(),
    watchChangeLanguage(),
    watchUpdatePublicProfiles(),

    watchLoadForm(),
    watchUpdateForm(),
    watchUploadRefFile(),
  ]);
}

export default [
  {
    key: 'rootSaga',
    saga: rootSaga,
    mode: DAEMON,
  },
];
