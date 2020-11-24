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
  USER_UPDATE_MEMBERSHIP_FAIL,

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

  CHANGE_LANGUAGE,
  CHANGE_LANGUAGE_SUCCESS,

  UPDATE_PUBLIC_PROFILES,
  UPDATE_PUBLIC_PROFILES_SUCCESS,
  UPDATE_PUBLIC_PROFILES_FAIL,

  SAVE_UNREAD_MESSAGE_COUNT,
  SAVE_CONVERSATIONS_INFO,
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
export function updateMembershipFailAction() {
  return {
    type: USER_UPDATE_MEMBERSHIP_FAIL,
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

export function signupUserAction(user, onSuccess) {
  return {
    type: USER_SIGNUP,
    user,
    onSuccess,
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

export function loadFormAction(path, reduxEndPoint, onSuccess) {
  return {
    type: LOAD_FORM,
    path,
    reduxEndPoint,
    onSuccess,
  };
}
export function loadFormSuccessAction(formObj, reduxEndPoint) {
  return {
    type: LOAD_FORM_SUCCESS,
    formObj,
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
export function updateFormSuccessAction(formObj, reduxEndPoint) {
  return {
    type: UPDATE_FORM_SUCCESS,
    formObj,
    reduxEndPoint,
  };
}
export function updateFormFailAction(error) {
  return {
    type: UPDATE_FORM_FAIL,
    error,
  };
}

export function uploadRefFileAction(ref, refId, field, fileBuffer, reduxEndPoint, isSingleFile) {
  return {
    type: UPLOAD_REF_FILE,
    ref,
    refId,
    field,
    fileBuffer,
    reduxEndPoint,
    isSingleFile,
  };
}
export function uploadRefFileSuccessAction(reduxEndPoint, files) {
  return {
    type: UPLOAD_REF_FILE_SUCCESS,
    reduxEndPoint,
    files,
  };
}
export function uploadRefFileFailAction(error) {
  return {
    type: UPLOAD_REF_FILE_FAIL,
    error,
  };
}

export function changeLanguageAction(language) {
  return {
    type: CHANGE_LANGUAGE,
    language,
  };
}
export function changeLanguageSuccessAction(language) {
  return {
    type: CHANGE_LANGUAGE_SUCCESS,
    language,
  };
}

export function updatePublicProfilesAction(params = {}) {
  return {
    type: UPDATE_PUBLIC_PROFILES,
    params,
  };
}
export function updatePublicProfilesSuccessAction(profiles) {
  return {
    type: UPDATE_PUBLIC_PROFILES_SUCCESS,
    profiles,
  };
}
export function updatePublicProfilesFailAction(error) {
  return {
    type: UPDATE_PUBLIC_PROFILES_FAIL,
    error,
  };
}

export function saveUnreadMessageCountAction(unreadMessageCount) {
  return {
    type: SAVE_UNREAD_MESSAGE_COUNT,
    unreadMessageCount,
  };
}

export function saveConversationsInfoAction(conversations) {
  return {
    type: SAVE_CONVERSATIONS_INFO,
    conversations,
  };
}
