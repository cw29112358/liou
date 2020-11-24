/*
 *
 * AppRouter actions
 *
 */

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_JWTTOKEN,

  USER_UPDATE_MEMBERSHIP,
  USER_UPDATE_MEMBERSHIP_SUCCESS,

  SAVE_NOTIFICATION_TOKEN,

  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,

  SEND_VERIFICATION_CODE,
  SEND_VERIFICATION_CODE_SUCCESS,
  SEND_VERIFICATION_CODE_FAIL,
  DELETE_VERIFICATION_CODE_INFO,

  VERIFY_VERIFICATION_CODE,
  VERIFY_VERIFICATION_CODE_SUCCESS,
  VERIFY_VERIFICATION_CODE_FAIL,

  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,

  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,

  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,

  LOAD_FORM,
  LOAD_FORM_SUCCESS,
  LOAD_FORM_FAIL,

  UPDATE_FORM,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAIL,

  UPLOAD_REF_FILE,
  UPLOAD_REF_FILE_SUCCESS,
  UPLOAD_REF_FILE_FAIL,

  GET_FAVOURITE_CAR,
  GET_FAVOURITE_CAR_SUCCESS,
  GET_FAVOURITE_CAR_FAIL,

  UPDATE_FAVOURITE_CAR,
  UPDATE_FAVOURITE_CAR_SUCCESS,
  UPDATE_FAVOURITE_CAR_FAIL,
} from './constants';

export function loginByUserAction(user, isPasswordLogin = true, onSuccess, isOnlyValid) {
  return {
    type: USER_LOGIN,
    user,
    isPasswordLogin,
    onSuccess,
    isOnlyValid,
  };
}
export function loggedInByUserAction(authUser, isOnlyValid) {
  return {
    type: USER_LOGIN_SUCCESS,
    authUser,
    isOnlyValid,
  };
}
export function loggedInByUserFailAction(error, isOnlyValid) {
  return {
    type: USER_LOGIN_FAIL,
    error,
    isOnlyValid,
  };
}
export function logInByJwtTokenAction(onSuccess, onFail) {
  return {
    type: USER_LOGIN_JWTTOKEN,
    onSuccess,
    onFail,
  };
}

export function updateMembershipAction(onSuccess, onFail) {
  return {
    type: USER_UPDATE_MEMBERSHIP,
    onSuccess,
    onFail,
  };
}
export function updateMembershipSuccessAction(membership) {
  return {
    type: USER_UPDATE_MEMBERSHIP_SUCCESS,
    membership,
  };
}

export function saveNotificationTokenAction() {
  return {
    type: SAVE_NOTIFICATION_TOKEN,
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

export function sendVerificationCodeAction(isAccountUser, countryCode, phoneNumber, seconds, onSuccess) {
  return {
    type: SEND_VERIFICATION_CODE,
    isAccountUser,
    countryCode,
    phoneNumber,
    seconds,
    onSuccess,
  };
}
export function sendVerificationCodeSuccessAction(result, verificationCodeInfo) {
  return {
    type: SEND_VERIFICATION_CODE_SUCCESS,
    result,
    verificationCodeInfo,
  };
}
export function sendVerificationCodeFailAction(error) {
  return {
    type: SEND_VERIFICATION_CODE_FAIL,
    error,
  };
}

export function deleteVerificationCodeInfoAction(startScene) {
  return {
    type: DELETE_VERIFICATION_CODE_INFO,
    startScene,
  };
}

export function verifyVerificationCodeAction(countryCode, phoneNumber, verificationCode, onSuccess) {
  return {
    type: VERIFY_VERIFICATION_CODE,
    countryCode,
    phoneNumber,
    verificationCode,
    onSuccess,
  };
}
export function verifyVerificationCodeSuccessAction(result) {
  return {
    type: VERIFY_VERIFICATION_CODE_SUCCESS,
    result,
  };
}
export function verifyVerificationCodeFailAction(error) {
  return {
    type: VERIFY_VERIFICATION_CODE_FAIL,
    error,
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

export function resetPasswordAction(newPassword) {
  return {
    type: RESET_PASSWORD,
    newPassword,
  };
}
export function resetPasswordSuccessAction(result) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    result,
  };
}
export function resetPasswordFailAction(error) {
  return {
    type: RESET_PASSWORD_FAIL,
    error,
  };
}

export function changePasswordAction(oldPassword, newPassword, onSuccess) {
  return {
    type: CHANGE_PASSWORD,
    oldPassword,
    newPassword,
    onSuccess,
  };
}
export function changePasswordSuccessAction(result) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    result,
  };
}
export function changePasswordFailAction(error) {
  return {
    type: CHANGE_PASSWORD_FAIL,
    error,
  };
}

export function loadFormAction(path, reduxEndPoint) {
  return {
    type: LOAD_FORM,
    path,
    reduxEndPoint,
  };
}
export function loadFormSuccessAction(formObj, path, reduxEndPoint) {
  return {
    type: LOAD_FORM_SUCCESS,
    formObj,
    path,
    reduxEndPoint,
  };
}
export function loadFormFailAction(error) {
  return {
    type: LOAD_FORM_FAIL,
    error,
  };
}

export function updateFormAction(formMap, path, reduxEndPoint, isCreate, onSuccess) {
  return {
    type: UPDATE_FORM,
    formMap,
    path,
    reduxEndPoint,
    isCreate,
    onSuccess,
  };
}
export function updateFormSuccessAction(formObj, path, reduxEndPoint) {
  return {
    type: UPDATE_FORM_SUCCESS,
    formObj,
    path,
    reduxEndPoint,
  };
}
export function updateFormFailAction(error) {
  return {
    type: UPDATE_FORM_FAIL,
    error,
  };
}

export function uploadRefFileAction(ref, refId, field, fileBuffer, reduxEndPoint, reduxFormEndPoint, isSingleFile) {
  return {
    type: UPLOAD_REF_FILE,
    ref,
    refId,
    field,
    fileBuffer,
    reduxEndPoint,
    reduxFormEndPoint,
    isSingleFile,
  };
}
export function uploadRefFileSuccessAction(reduxEndPoint, reduxFormEndPoint, files) {
  return {
    type: UPLOAD_REF_FILE_SUCCESS,
    reduxEndPoint,
    reduxFormEndPoint,
    files,
  };
}
export function uploadRefFileFailAction(error) {
  return {
    type: UPLOAD_REF_FILE_FAIL,
    error,
  };
}

export function getFavouriteCarAction() {
  return {
    type: GET_FAVOURITE_CAR,
  };
}
export function getFavouriteCarSuccessAction(favouriteCar) {
  return {
    type: GET_FAVOURITE_CAR_SUCCESS,
    favouriteCar,
  };
}
export function getFavouriteCarFailAction(error) {
  return {
    type: GET_FAVOURITE_CAR_FAIL,
    error,
  };
}

export function updateFavouriteCarAction(carId, deletedCar, initialCar) {
  return {
    type: UPDATE_FAVOURITE_CAR,
    carId,
    initialCar,
    deletedCar,
  };
}
export function updateFavouriteCarSuccessAction() {
  return {
    type: UPDATE_FAVOURITE_CAR_SUCCESS,
  };
}
export function updateFavouriteCarFailAction(error, initialCar) {
  return {
    type: UPDATE_FAVOURITE_CAR_FAIL,
    initialCar,
    error,
  };
}
