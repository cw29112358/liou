import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { fromJS } from 'immutable';
import * as FirebaseApi from 'apis/firebase';
import Amazons3Api from 'apis/amazons3Api';

import { userLogOutInitMytripAction } from 'containers/MyTripPage/actions';
import {
  loggedInByUserAction, updateCurrUserAction, checkIfVerifiedAction, loggedInByUserFailAction,
  userSendVerificationSuccessAction, userSendVerificationFailAction,
  updateUserInfoSuccessAction, updateUserInfoFailAction,
  signupUserSuccessAction, signupUserFailAction, signupPasswordWrongAction,
  loggedOutByUserAction, loggedOutByUserFailAction,

  forgetPasswordSuccessAction, forgetPasswordFailAction,
  resetPasswordSuccessAction, resetPasswordFailAction,
  changePasswordSuccessAction, changePasswordFailAction,

  loadFormSuccessAction, loadFormFailAction,
  updateFormSuccessAction, updateFormFailAction,
  uploadImageSuccessAction, uploadImageFailAction,
  uploadFileFormSuccessAction, uploadFileFormFailAction,

  loadAreaConfigSuccessAction, loadAreaConfigFailAction,
} from './actions';
import {
  USER_LOGIN, USER_LOGIN_SUCCESS, USER_SEND_VERIFICATION, USER_LOGOUT, USER_SIGNUP,
  FORGET_PASSWORD, RESET_PASSWORD, CHANGE_PASSWORD,
  LOAD_FORM, UPDATE_FORM, UPLOAD_IMAGE, UPLOAD_FILE_FORM,
  LOAD_AREA_CONFIG,
 } from './constants';
import { selectAreaConfig } from './selectors';
import { getSameBoolean } from '../../utils/helpers';

export function* loginByUser(action) {
  try {
    const authUser = yield call(FirebaseApi.signInWithEmailAndPassword, action.user);
    // console.log(authUser);
    if (getSameBoolean(authUser.emailVerified)) { // not until email verification is checked.
      yield put(loggedInByUserAction(authUser));

      const preRoutePath = sessionStorage.getItem('preRoutePath');
      if (!preRoutePath || typeof preRoutePath !== 'string' || preRoutePath === '/login') {
        yield put(push('/profile'));
      } else {
        yield put(push(preRoutePath));
      }
      yield sessionStorage.removeItem('preRoutePath');
    } else {
      yield put(checkIfVerifiedAction(authUser));
    }
  } catch (err) {
    yield put(loggedInByUserFailAction(err));
  }
}
export function* loggedInByUser(action) {
  try {
    const authUser = action.user;
    yield put(updateCurrUserAction(authUser.uid));
  } catch (err) {
    yield put(loggedInByUserFailAction(err));
  }
}
export function* sendUserVerification(action) {
  try {
    yield call(FirebaseApi.sendVerificationEmail, action.user);
    yield put(userSendVerificationSuccessAction());
  } catch (err) {
    yield put(userSendVerificationFailAction(err));
  }
}
export function* updateUserInfo(action) {
  try {
    yield call(FirebaseApi.updateUserProfile, action.user.uid, action.user);
    yield put(updateUserInfoSuccessAction(action.user.uid, action.user));
  } catch (err) {
    yield put(updateUserInfoFailAction(err));
  }
}

export function* signupUser(action) {
  if (action.user.password !== action.user.repeatPassword) {
    yield put(signupPasswordWrongAction());
    return;
  }
  const emailInfo = action.user.email;
  const passwordInfo = action.user.password;
  const userInfo = { email: emailInfo, password: passwordInfo };
  try {
    const authUser = yield call(FirebaseApi.signUpAndSendEmailVerify, userInfo);
    yield put(signupUserSuccessAction(authUser));

    const preRoutePath = sessionStorage.getItem('preRoutePath');
    if (!preRoutePath || typeof preRoutePath !== 'string' || preRoutePath === '/signup') {
      yield put(push('/profile'));
    } else {
      yield put(push(preRoutePath));
    }
    yield sessionStorage.removeItem('preRoutePath');
  } catch (err) {
    yield put(signupUserFailAction(err));
  }
}
export function* logoutByUser() {
  try {
    const results = yield call(FirebaseApi.signOut);
    yield put(loggedOutByUserAction(results));
    yield put(userLogOutInitMytripAction());
    if (location.pathname === '/profile' || location.pathname === '/myTrip' || location.pathname === '/changePassword') {
      yield put(push('/'));
    }
  } catch (err) {
    yield put(loggedOutByUserFailAction(err));
  }
}

export function* forgetPassword(action) {
  try {
    yield call(FirebaseApi.forgetUserPassword, action.user);
    yield put(forgetPasswordSuccessAction());
  } catch (err) {
    yield put(forgetPasswordFailAction(err));
  }
}
export function* resetPassword(action) {
  try {
    yield call(FirebaseApi.resetUserPassword, action.confirmationCode, action.email, action.password);
    yield put(resetPasswordSuccessAction());
  } catch (err) {
    yield put(resetPasswordFailAction(err));
  }
}
export function* changePassword(action) {
  try {
    yield call(FirebaseApi.changeUserPassword, action.oldPassword, action.password);
    yield put(changePasswordSuccessAction());
  } catch (err) {
    yield put(changePasswordFailAction(err));
  }
}

export function* loadForm(action) {
  try {
    const results = yield call(FirebaseApi.loadForm, action.firebaseEndPoint);
    yield put(loadFormSuccessAction(fromJS(results), action.firebaseEndPoint, action.reduxEndPoint));
  } catch (err) {
    yield put(loadFormFailAction(err));
  }
}
export function* updateForm(action) {
  try {
    const form = action.formMap.toJS();
    if (form instanceof Array) {
      yield call(FirebaseApi.setForm, form, action.firebaseEndPoint);
    } else {
      yield call(FirebaseApi.updateForm, form, action.firebaseEndPoint);
    }
    if (action.alertMessages && action.alertMessages.success) {
      const { title, message, type } = action.alertMessages.success;
      window.alert(title, message, type);
    }
    yield put(updateFormSuccessAction(action.formMap, action.firebaseEndPoint, action.reduxEndPoint));
    // console.log('saga', action.reduxEndPoint);
  } catch (err) {
    if (action.alertMessages && action.alertMessages.fail) {
      const { title, message, type } = action.alertMessages.fail;
      window.alert(title, message, type);
    }
    yield put(updateFormFailAction(err));
  }
}
export function* uploadImageToS3(action) {
  try {
    const results = yield call(Amazons3Api.uploadFile, `users/${action.userId}/${action.filePath}`, action.fileBlob);
    yield put(uploadImageSuccessAction(action.userId, results.Location));
  } catch (err) {
    yield put(uploadImageFailAction(err));
  }
}
export function* uploadFileFormToS3(action) {
  try {
    const results = yield call(Amazons3Api.uploadFile, action.fileName, action.fileBlob);
    yield put(uploadFileFormSuccessAction(action.reduxEndPoint, action.fieldName, results.Location));
  } catch (err) {
    yield put(uploadFileFormFailAction(err));
  }
}

// export function* changeCalculator(action) {
//   try {
//     const inventoriesObject = yield select(selectAllInventory);
//     // const area = sessionStorage.getItem('area') || 'bayArea';
//     // const preArea = sessionStorage.getItem('preArea');
//     const area = yield select(selectArea);
//     // if (inventoriesObject.size === 0 || area !== preArea) {
//     console.log('action.calculator', action.calculator, 'area', area);
//     if (inventoriesObject.size === 0 || area !== action.calculator.area) {
//       // sessionStorage.setItem('preArea', area);
//       // yield put(loadAreaConfigAction({ forceReload: true }));
//       yield put(loadInventoryAction({ forceReload: true }));
//     }
//   } catch (err) {
//     //
//   }
// }

export function* loadAreaConfig(action) {
  try {
    const { forceReload } = action.params;
    const areaConfig = yield select(selectAreaConfig);

    let areaConfigObject = {};
    if (areaConfig.size === 0 || forceReload) {
      // const area = sessionStorage.getItem('area') || 'bayArea';
      areaConfigObject = yield call(FirebaseApi.getAllAreaConfigs);
    } else {
      areaConfigObject = areaConfig.toJS();
    }
    yield put(loadAreaConfigSuccessAction(areaConfigObject));
  } catch (err) {
    yield put(loadAreaConfigFailAction(err));
  }
}

export function* watchLoadForm() {
  yield takeLatest(LOAD_FORM, loadForm);
}
export function* watchUpdateForm() {
  yield takeLatest(UPDATE_FORM, updateForm);
}
export function* watchUpload() {
  yield takeLatest(UPLOAD_IMAGE, uploadImageToS3);
}
export function* watchUploadFileForm() {
  yield takeLatest(UPLOAD_FILE_FORM, uploadFileFormToS3);
}

export function* watchLogin() {
  yield takeLatest(USER_LOGIN, loginByUser);
}
export function* watchLoggedIn() {
  yield takeLatest(USER_LOGIN_SUCCESS, loggedInByUser);
}
export function* watchResendVerification() {
  yield takeLatest(USER_SEND_VERIFICATION, sendUserVerification);
}
export function* watchSignup() {
  yield takeLatest(USER_SIGNUP, signupUser);
}
export function* watchLogout() {
  yield takeLatest(USER_LOGOUT, logoutByUser);
}

export function* watchForgetPassword() {
  yield takeLatest(FORGET_PASSWORD, forgetPassword);
}
export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD, resetPassword);
}
export function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD, changePassword);
}

// export function* watchChangeCalculator() {
//   yield takeLatest(CHANGE_CALCULATOR, changeCalculator);
// }

export function* watchAreaConfig() {
  yield takeLatest(LOAD_AREA_CONFIG, loadAreaConfig);
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

export default [
  watchLogin,
  watchLoggedIn,
  watchSignup,
  watchLogout,
  watchResendVerification,
  watchForgetPassword,
  watchResetPassword,
  watchChangePassword,
  watchLoadForm,
  watchUpdateForm,
  watchUpload,
  watchUploadFileForm,
  // watchChangeCalculator,
  watchAreaConfig,
];
