/*
 *
 * AppRouter reducer
 *
 */
import XGPush from 'react-native-xinge-push-fei';

import auth from 'utils/auth';
import {
  getImmutableData,
  clearLoginAuthKey,
} from 'utils/helpers';

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  USER_UPDATE_MEMBERSHIP,
  USER_UPDATE_MEMBERSHIP_SUCCESS,
  USER_UPDATE_MEMBERSHIP_FAIL,

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

  CHANGE_LANGUAGE_SUCCESS,

  UPDATE_PUBLIC_PROFILES,
  UPDATE_PUBLIC_PROFILES_SUCCESS,
  UPDATE_PUBLIC_PROFILES_FAIL,

  SAVE_UNREAD_MESSAGE_COUNT,
  SAVE_CONVERSATIONS_INFO,
} from './constants';

const initialState = getImmutableData({
});
function appRouterReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN: {
      const result = state
        .set('done', false)
        .set('error', false)
        .set('msg', '');
      if (action.isOnlyValid) return result;

      return result.set('authUserId', '');
    }
    case USER_LOGIN_SUCCESS: {
      const { authUser } = action;
      const { profile: { refId, id }, jwt } = authUser;

      if (refId) auth.set(refId, 'refId');
      if (jwt) auth.setToken(jwt);

      const result = state.set('done', true)
        .set('error', false)
        .set('msg', 'Login in success!');
      if (action.isOnlyValid) return result;

      return result.set('authUserId', id)
        .setIn(['users', id], getImmutableData(authUser).delete('jwt'));
    }
    case USER_LOGIN_FAIL: {
      XGPush.unRegister();

      const result = state.set('done', true)
        .set('error', true)
        .set('msg', action.error.message);
      if (action.isOnlyValid) return result;

      return result.set('authUserId', '');
    }

    case USER_UPDATE_MEMBERSHIP: {
      return state
        .set('done', false);
    }
    case USER_UPDATE_MEMBERSHIP_SUCCESS: {
      const id = state.get('authUserId');
      return state
        .set('done', true)
        .setIn(['users', id, 'membership'], getImmutableData(action.membership));
    }
    case USER_UPDATE_MEMBERSHIP_FAIL: {
      return state
        .set('done', true);
    }

    case USER_LOGOUT: {
      XGPush.unRegister();
      clearLoginAuthKey();

      return state
        .set('logoutDone', false)
        .set('error', false)
        .set('msg', '');
    }
    case USER_LOGOUT_SUCCESS: {
      return state
        .set('logoutDone', true)
        .delete('authUserId')
        .delete('users');
    }
    case USER_LOGOUT_FAIL:
      return state
        .set('logoutDone', true)
        .set('error', true)
        .set('msg', action.error.message);

    case SEND_VERIFICATION_CODE: {
      return state
        .set('done', false)
        .set('error', false)
        .set('msg', '');
    }
    case SEND_VERIFICATION_CODE_SUCCESS: {
      const { verificationCodeInfo } = action;
      return state
        .setIn(['verificationCodeInfos', verificationCodeInfo.startScene], getImmutableData(verificationCodeInfo))
        .set('done', true)
        .set('error', false)
        .set('msg', 'send verifyVerification code success!');
    }
    case SEND_VERIFICATION_CODE_FAIL: {
      return state.set('done', true)
        .set('error', true)
        .set('msg', action.error.message);
    }
    case DELETE_VERIFICATION_CODE_INFO: {
      const { startScene } = action;
      return state
        .deleteIn(['verificationCodeInfos', startScene]);
    }

    case VERIFY_VERIFICATION_CODE: {
      return state
        .set('done', false)
        .set('error', false)
        .set('msg', '');
    }
    case VERIFY_VERIFICATION_CODE_SUCCESS: {
      return state.set('done', true)
        .set('error', false)
        .set('msg', 'verify verification code success!');
    }
    case VERIFY_VERIFICATION_CODE_FAIL: {
      return state.set('done', true)
        .set('error', true)
        .set('msg', action.error.message);
    }

    case USER_SIGNUP: {
      return state
        .set('done', false)
        .set('error', false)
        .set('msg', '');
    }
    case USER_SIGNUP_SUCCESS: {
      return state
        .set('done', true)
        .set('error', false)
        .set('msg', 'Sign up success!');
    }
    case USER_SIGNUP_FAIL:
      return state
        .set('done', true)
        .set('error', true)
        .set('msg', action.error.message);

    case RESET_PASSWORD: {
      return state
        .set('done', false)
        .set('error', false)
        .set('msg', '');
    }
    case RESET_PASSWORD_SUCCESS: {
      clearLoginAuthKey();

      return state.set('done', true)
        .set('error', false)
        .set('msg', 'reset password success!');
    }
    case RESET_PASSWORD_FAIL: {
      return state.set('done', true)
        .set('error', true)
        .set('msg', action.error.message);
    }

    case CHANGE_PASSWORD: {
      return state
        .set('done', false)
        .set('error', false)
        .set('msg', '');
    }
    case CHANGE_PASSWORD_SUCCESS: {
      clearLoginAuthKey();

      return state.set('done', true)
        .set('error', false)
        .set('msg', 'change password success!');
    }
    case CHANGE_PASSWORD_FAIL: {
      return state.set('done', true)
        .set('error', true)
        .set('msg', action.error.message);
    }

    case CHANGE_LANGUAGE_SUCCESS: {
      return state.set('language', action.language);
    }

    case UPDATE_PUBLIC_PROFILES: {
      return state.set('profilesIsLoading', true);
    }
    case UPDATE_PUBLIC_PROFILES_SUCCESS: {
      return state
        .set('profilesIsLoading', false)
        .set('profiles', getImmutableData(action.profiles));
    }
    case UPDATE_PUBLIC_PROFILES_FAIL: {
      return state
        .set('profilesIsLoading', false);
    }
    case SAVE_UNREAD_MESSAGE_COUNT: {
      return state
        .set('unreadMessageCount', action.unreadMessageCount);
    }
    case SAVE_CONVERSATIONS_INFO: {
      return state
        .set('conversations', action.conversations);
    }
    default:
      return state;
  }
}

export default appRouterReducer;
