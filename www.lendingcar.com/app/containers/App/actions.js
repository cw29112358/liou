/*
 *
 * CarPage actions
 *
 */

import {
  PURCHASE_CAR,
  SHOW_SUBSCRIBE_MODAL,
  HIDE_SUBSCRIBE_MODAL,
  UPDATE_SUBSCRIBE_FORM,
  HIDE_NOTIFICATION,
  CHANGE_CALCULATOR,

  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_PASSWORD_WRONG,
  CHECK_IF_VERIFIED,

  USER_SEND_VERIFICATION,
  USER_SEND_VERIFICATION_SUCCESS,
  USER_SEND_VERIFICATION_FAIL,

  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,

  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,

  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,

  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,

  SHOW_PROFILE_MODAL,
  HIDE_PROFILE_MODAL,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  USER_UPDATE_CURRENT,
  LOAD_USER_INFO,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAIL,

  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,

  UPDATE_FORM,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAIL,

  LOAD_FORM,
  LOAD_FORM_SUCCESS,
  LOAD_FORM_FAIL,

  UPLOAD_FILE_FORM,
  UPLOAD_FILE_FORM_SUCCESS,
  UPLOAD_FILE_FORM_FAIL,

  LOAD_AREA_CONFIG,
  LOAD_AREA_CONFIG_SUCCESS,
  LOAD_AREA_CONFIG_FAIL,
} from './constants';

export function purchaseCarAction(carData, locale) {
  return {
    type: PURCHASE_CAR,
    carData,
    locale,
  };
}

export function showSubscribeModalAction(redirectUrl) {
  return {
    type: SHOW_SUBSCRIBE_MODAL,
    redirectUrl,
  };
}

export function hideSubscribeModalAction() {
  return {
    type: HIDE_SUBSCRIBE_MODAL,
  };
}

export function updateSignUpFormAction(formDataMap) {
  return {
    type: UPDATE_SUBSCRIBE_FORM,
    formDataMap,
  };
}

export function hideNotificationAction() {
  return {
    type: HIDE_NOTIFICATION,
  };
}

export function changeCalculatorAction(calculator) {
  return {
    type: CHANGE_CALCULATOR,
    calculator,
  };
}

export function signupUserAction(user) {
  return {
    type: USER_SIGNUP,
    user,
  };
}
export function signupUserSuccessAction(user) {
  return {
    type: USER_SIGNUP_SUCCESS,
    user,
  };
}
export function signupUserFailAction(error) {
  return {
    type: USER_SIGNUP_FAIL,
    error,
  };
}
export function signupPasswordWrongAction() {
  return {
    type: USER_SIGNUP_PASSWORD_WRONG,
  };
}

export function loginByUserAction(user) {
  return {
    type: USER_LOGIN,
    user,
  };
}
export function loggedInByUserAction(user) {
  return {
    type: USER_LOGIN_SUCCESS,
    user,
  };
}
export function loggedInByUserFailAction(error) {
  return {
    type: USER_LOGIN_FAIL,
    error,
  };
}

export function checkIfVerifiedAction(user) {
  return {
    type: CHECK_IF_VERIFIED,
    user,
  };
}

export function userSendVerificationAction(user) {
  return {
    type: USER_SEND_VERIFICATION,
    user,
  };
}
export function userSendVerificationSuccessAction() {
  return {
    type: USER_SEND_VERIFICATION_SUCCESS,
  };
}
export function userSendVerificationFailAction(error) {
  return {
    type: USER_SEND_VERIFICATION_FAIL,
    error,
  };
}

export function forgetPasswordAction(user) {
  return {
    type: FORGET_PASSWORD,
    user,
  };
}
export function forgetPasswordSuccessAction() {
  return {
    type: FORGET_PASSWORD_SUCCESS,
  };
}
export function forgetPasswordFailAction(error) {
  return {
    type: FORGET_PASSWORD_FAIL,
    error,
  };
}

export function resetPasswordAction(confirmationCode, email, password) {
  return {
    type: RESET_PASSWORD,
    confirmationCode,
    email,
    password,
  };
}
export function resetPasswordSuccessAction() {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}
export function resetPasswordFailAction(error) {
  return {
    type: RESET_PASSWORD_FAIL,
    error,
  };
}

export function changePasswordAction(oldPassword, password) {
  return {
    type: CHANGE_PASSWORD,
    oldPassword,
    password,
  };
}
export function changePasswordSuccessAction() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
}
export function changePasswordFailAction(error) {
  return {
    type: CHANGE_PASSWORD_FAIL,
    error,
  };
}

export function logoutByUserAction() {
  return {
    type: USER_LOGOUT,
  };
}
export function loggedOutByUserAction() {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
}
export function loggedOutByUserFailAction(error) {
  return {
    type: USER_LOGOUT_FAIL,
    error,
  };
}

export function showProfileModalAction(userId, disableClose) {
  return {
    type: SHOW_PROFILE_MODAL,
    userId,
    disableClose,
  };
}

export function hideProfileModalAction() {
  return {
    type: HIDE_PROFILE_MODAL,
  };
}

export function updateUserInfoAction(user) {
  return {
    type: UPDATE_USER_INFO,
    user,
  };
}
export function updateUserInfoSuccessAction(userId, user) {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    userId,
    user,
  };
}
export function updateUserInfoFailAction(error) {
  return {
    type: UPDATE_USER_INFO_FAIL,
    error,
  };
}

export function deleteUserAction(userId) {
  return {
    type: DELETE_USER,
    userId,
  };
}
export function deleteUserSuccessAction(userId) {
  return {
    type: DELETE_USER_SUCCESS,
    userId,
  };
}
export function deleteUserFailAction(error) {
  return {
    type: DELETE_USER_FAIL,
    error,
  };
}

export function updateCurrUserAction(uid) {
  return {
    type: USER_UPDATE_CURRENT,
    uid,
  };
}

export function loadUserInfoAction(userId) {
  return {
    type: LOAD_USER_INFO,
    userId,
  };
}
export function loadUserInfoSuccessAction(userId, user) {
  return {
    type: LOAD_USER_INFO_SUCCESS,
    userId,
    user,
  };
}
export function loadUserInfoFailAction(error) {
  return {
    type: LOAD_USER_INFO_FAIL,
    error,
  };
}

export function loadFormAction(firebaseEndPoint, reduxEndPoint) {
  return {
    type: LOAD_FORM,
    firebaseEndPoint,
    reduxEndPoint,
  };
}
export function loadFormSuccessAction(formMap, firebaseEndPoint, reduxEndPoint) {
  return {
    type: LOAD_FORM_SUCCESS,
    formMap,
    firebaseEndPoint,
    reduxEndPoint,
  };
}
export function loadFormFailAction(error) {
  return {
    type: LOAD_FORM_FAIL,
    error,
  };
}

export function updateFormAction(formMap, firebaseEndPoint, reduxEndPoint, alertMessages) {
  return {
    type: UPDATE_FORM,
    formMap,
    firebaseEndPoint,
    reduxEndPoint,
    alertMessages,
  };
}
export function updateFormSuccessAction(formMap, firebaseEndPoint, reduxEndPoint) {
  return {
    type: UPDATE_FORM_SUCCESS,
    formMap,
    firebaseEndPoint,
    reduxEndPoint,
  };
}
export function updateFormFailAction(error) {
  return {
    type: UPDATE_FORM_FAIL,
    error,
  };
}

export function uploadImageAction(userId, filePath, fileBlob) {
  return {
    type: UPLOAD_IMAGE,
    userId,
    filePath,
    fileBlob,
  };
}
export function uploadImageSuccessAction(userId, fileUrl) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    userId,
    fileUrl,
  };
}
export function uploadImageFailAction(error) {
  return {
    type: UPLOAD_IMAGE_FAIL,
    error,
  };
}

export function uploadFileFormAction(fileName, fileBlob, fieldName, reduxEndPoint, firebaseEndPoint) {
  return {
    type: UPLOAD_FILE_FORM,
    fileName,
    fileBlob,
    fieldName,
    reduxEndPoint,
    firebaseEndPoint,
  };
}
export function uploadFileFormSuccessAction(reduxEndPoint, fieldName, fileUrl) {
  return {
    type: UPLOAD_FILE_FORM_SUCCESS,
    reduxEndPoint,
    fieldName,
    fileUrl,
  };
}
export function uploadFileFormFailAction(error) {
  return {
    type: UPLOAD_FILE_FORM_FAIL,
    error,
  };
}

export function loadAreaConfigAction(params = {}) {
  return {
    type: LOAD_AREA_CONFIG,
    params,
  };
}
export function loadAreaConfigSuccessAction(areaConfig) {
  return {
    type: LOAD_AREA_CONFIG_SUCCESS,
    areaConfig,
  };
}
export function loadAreaConfigFailAction(error) {
  return {
    type: LOAD_AREA_CONFIG_FAIL,
    error,
  };
}
