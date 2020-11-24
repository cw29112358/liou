/*
 *
 * AppRouter sagas
 *
 */

import {
  takeLatest,
  call,
  put,
  all,
} from 'redux-saga/effects';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
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

  RESET_PASSWORD, CHANGE_PASSWORD,

  LOAD_FORM, UPDATE_FORM, UPLOAD_REF_FILE,

  GET_FAVOURITE_CAR, UPDATE_FAVOURITE_CAR,
} from './constants';
import {
  loggedInByUserAction, loggedInByUserFailAction,
  updateMembershipSuccessAction, saveNotificationTokenAction,
  loggedOutByUserAction, loggedOutByUserFailAction,

  sendVerificationCodeSuccessAction, sendVerificationCodeFailAction,
  verifyVerificationCodeSuccessAction, verifyVerificationCodeFailAction,
  signupUserSuccessAction, signupUserFailAction,

  resetPasswordSuccessAction, resetPasswordFailAction,
  changePasswordSuccessAction, changePasswordFailAction,

  loadFormSuccessAction, loadFormFailAction,
  updateFormSuccessAction, updateFormFailAction,
  uploadRefFileSuccessAction, uploadRefFileFailAction,

  getFavouriteCarAction, getFavouriteCarSuccessAction, getFavouriteCarFailAction,
  updateFavouriteCarSuccessAction, updateFavouriteCarFailAction,
} from './actions';

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
    executeFunction(onSuccess);
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
    executeFunction(onSuccess);
  } catch (err) {
    yield put(loggedInByUserFailAction(err));
    executeFunction(onFail);
  }
}

export function* updateMembership(action) {
  const { onSuccess, onFail } = action;
  try {
    const membership = yield call(StrapiApi.getMembershipStatus);
    yield put(updateMembershipSuccessAction(membership));
    executeFunction(onSuccess, membership);
  } catch (err) {
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
    Actions.reset('login');
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
      countryCode, phoneNumber, verificationCode, onSuccess,
    } = action;
    const result = yield call(StrapiApi.verifyPhoneNumber, countryCode, phoneNumber, verificationCode);
    yield put(verifyVerificationCodeSuccessAction(result));
    executeFunction(onSuccess);
  } catch (err) {
    yield put(verifyVerificationCodeFailAction(err));
  }
}
export function* signupUser(action) {
  try {
    const authUser = yield call(StrapiApi.signUp, action.user);
    yield put(signupUserSuccessAction(authUser));
    yield put(loggedInByUserAction(authUser));
    yield put(saveNotificationTokenAction());
    setIsOnline();
    Actions.reset('simpleProfile');
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

// form
export function* loadForm(action) {
  try {
    const results = yield call(StrapiApi.loadForm, action.path);
    yield put(loadFormSuccessAction(fromJS(results), action.path, action.reduxEndPoint));
  } catch (err) {
    yield put(loadFormFailAction(err));
  }
}
export function* updateForm(action) {
  try {
    const {
      formMap, path, reduxEndPoint, isCreate, onSuccess,
    } = action;

    const formObj = formMap.toJS();
    const updateAPI = (formObj instanceof Array || isCreate) ? StrapiApi.setForm : StrapiApi.updateForm;
    const result = yield call(updateAPI, formObj, path);

    yield put(updateFormSuccessAction(result, path, reduxEndPoint));
    executeFunction(onSuccess);
  } catch (err) {
    yield put(updateFormFailAction(err));
  }
}
export function* uploadRefFile(action) {
  try {
    const {
      ref, refId, field, fileBuffer, reduxEndPoint, reduxFormEndPoint, isSingleFile,
    } = action;
    const results = yield call(StrapiApi.uploadRefFile, ref, refId, field, fileBuffer);
    const files = isSingleFile ? results[0] : results;
    yield put(uploadRefFileSuccessAction(reduxEndPoint, reduxFormEndPoint, files));
  } catch (err) {
    yield put(uploadRefFileFailAction(err));
  }
}
export function* getFavouriteCar() {
  try {
    const favouriteCar = yield call(StrapiApi.getFavouriteCar);
    yield put(getFavouriteCarSuccessAction(favouriteCar));
  } catch (err) {
    yield put(getFavouriteCarFailAction(err));
  }
}
export function* updateFavouriteCar(action) {
  try {
    yield call(StrapiApi.updateFavouriteCar, { carId: action.carId });
    yield put(updateFavouriteCarSuccessAction());
    yield put(getFavouriteCarAction());
  } catch (error) {
    yield put(updateFavouriteCarFailAction(error, action.initialCar));
  }
}
// watch
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

export function* watchLoadForm() {
  yield takeLatest(LOAD_FORM, loadForm);
}
export function* watchUpdateForm() {
  yield takeLatest(UPDATE_FORM, updateForm);
}
export function* watchUploadRefFile() {
  yield takeLatest(UPLOAD_REF_FILE, uploadRefFile);
}
export function* watchGetFavouriteCar() {
  yield takeLatest(GET_FAVOURITE_CAR, getFavouriteCar);
}
export function* watchUpdateFavouriteCar() {
  yield takeLatest(UPDATE_FAVOURITE_CAR, updateFavouriteCar);
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

    watchLoadForm(),
    watchUpdateForm(),
    watchUploadRefFile(),

    watchGetFavouriteCar(),
    watchUpdateFavouriteCar(),
  ]);
}

export default [
  {
    key: 'rootSaga',
    saga: rootSaga,
    mode: DAEMON,
  },
];
