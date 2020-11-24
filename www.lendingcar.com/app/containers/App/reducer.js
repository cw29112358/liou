/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { trackEvent } from 'utils/helpers';
import {
  PURCHASE_CAR,
  SHOW_SUBSCRIBE_MODAL,
  HIDE_SUBSCRIBE_MODAL,
  UPDATE_SUBSCRIBE_FORM,
  CHANGE_CALCULATOR,

  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_PASSWORD_WRONG,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_UPDATE_CURRENT,

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

  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,

  HIDE_NOTIFICATION,

  SHOW_PROFILE_MODAL,
  HIDE_PROFILE_MODAL,

  LOAD_AREA_CONFIG,
  LOAD_AREA_CONFIG_SUCCESS,
  LOAD_AREA_CONFIG_FAIL,
} from './constants';

const initialState = fromJS({
  curCar: null,
  shouldSubscribeModalShown: false,
  signUpForm: {
    email: '',
    name: '',
    referralCode: '',
    redirectUrl: '',
  },
  calculator: {
    area: 'bayArea',
    passengers: 1,
    size: 'all',
    date: new Date(),
    term: 1,
    dlType: 'usDL',
  },
  areaConfig: {},
  showResend: false,
  showNotification: false,
  isLoading: false,
  done: true,
  error: false,
  msg: '',
});

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_SUBSCRIBE_MODAL:
      return state.set('shouldSubscribeModalShown', false);
    case SHOW_SUBSCRIBE_MODAL:
      return state.set('shouldSubscribeModalShown', true)
                  .setIn(['signUpForm', 'redirectUrl'], action.redirectUrl);

    case UPDATE_SUBSCRIBE_FORM: { // success
      const formDataObject = action.formDataMap.toJS();
      const { email, name, referralCode } = formDataObject;
      try {
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('referralCode', referralCode);
        if (window.Intercom) {
          window.Intercom('update', formDataObject);
        }
      } catch (e) {
        window.alert('Error', 'Please note, lendingcar.com will not work properly under Privacy Mode.\n\n温馨提示：LendingCar网站在隐私浏览模式下将无法提供最好的服务。', 'error');// eslint-disable-line global-require
      }
      return state
              .setIn(['signUpForm', 'email'], email)
              .setIn(['signUpForm', 'name'], name)
              .setIn(['signUpForm', 'referralCode'], referralCode)
              .set('shouldSubscribeModalShown', false);
    }

    case PURCHASE_CAR: {
      const { year, model, make, id } = action.carData;
      const { locale } = action;
      let message;
      const url = `https://www.lendingcar.com/c/${id}`;
      if (locale && locale === 'zh') {
        message = `你好，我想租这辆车 (${make} ${model} ${year}) ${url}, 可以给我个优惠价吗?`;
      } else {
        message = `Hi, I am very interested in this car (${make} ${model} ${year}) ${url}, could you give me a good price?`;
      }
      try {
        if (window.Intercom) {
          window.Intercom('hide');
          setTimeout(() => {
            window.Intercom('showNewMessage', message);
          }, 300);
          const referralCode = window.localStorage.referralCode;
          trackEvent({
            eventName: 'Get It Now',
            eventData: {
              make,
              model,
              referralCode,
              locale,
            },
          });
        }
      } catch (e) {
        window.alert('Error', 'Please note, lendingcar.com will not work properly under Privacy Mode.\n\n温馨提示：LendingCar网站在隐私浏览模式下将无法提供最好的服务。', 'error');// eslint-disable-line global-require
      }
      return state.set('curCar', action.carData);
    }

    case CHANGE_CALCULATOR:
      return state.set('calculator', state.get('calculator').merge(fromJS(action.calculator)));

    case HIDE_NOTIFICATION:
      return state
            .set('showNotification', false)
            .set('error', false)
            .set('msg', '');

    case USER_SIGNUP: {
      return state
              .set('done', false)
              .set('error', false)
              .set('msg', '')
              .set('showNotification', true);
    }
    case USER_SIGNUP_SUCCESS: {
      if (action.user.accessToken) localStorage.setItem('accessToken', action.user.accessToken);
      if (action.user.refreshToken) localStorage.setItem('refreshToken', action.user.refreshToken);
      const user = action.user;
      delete user.accessToken;
      delete user.refreshToken;
      return state
              .set('done', true)
              .set('error', false)
              .set('msg', 'Sign up success! Please visit your email to verify.')
              .set('authUser', action.user.uid)
              .setIn(['users', action.user.uid], fromJS(user));
    }
    case USER_SIGNUP_FAIL:
      return state
              .set('done', true)
              .set('error', true)
              .set('msg', action.error.message);

    case USER_SIGNUP_PASSWORD_WRONG:
      return state
              .set('done', true)
              .set('error', true)
              .set('msg', 'These passwords don\'t match. Please try again.');

    case USER_LOGIN: {
      return state
              .set('done', false)
              .set('error', false)
              .set('msg', '')
              .set('showNotification', true)
              .set('authUser', '');
    }
    case USER_LOGIN_SUCCESS: {
      if (action.user.accessToken) localStorage.setItem('accessToken', action.user.accessToken);
      if (action.user.refreshToken) localStorage.setItem('refreshToken', action.user.refreshToken);
      const user = action.user;
      delete user.accessToken;
      delete user.refreshToken;
      return state.set('done', true)
                  .set('error', false)
                  .set('msg', 'Login in success!')
                  .set('authUser', action.user.uid)
                  .setIn(['users', action.user.uid], fromJS(user))
                  .set('showResend', false);
    }
    case USER_LOGIN_FAIL: {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return state.set('done', true)
                  .set('error', true)
                  .set('msg', action.error.message)
                  .set('authUser', '')
                  .set('showResend', false);
    }

    case USER_UPDATE_CURRENT: {
      return state.set('profileUserId', action.uid);
    }

    case CHECK_IF_VERIFIED:
      return state.set('done', true)
                  .set('error', true)
                  .set('msg', 'Email is not verified, please click below button to verify your email address.')
                  .set('showResend', true);
    case USER_SEND_VERIFICATION:
      return state.set('done', false)
                  .set('error', false)
                  .set('showNotification', true);
    case USER_SEND_VERIFICATION_SUCCESS:
      return state.set('done', true)
                  .set('error', false)
                  .set('msg', 'Verification email sent, please check your email.')
                  .set('showResend', false);
    case USER_SEND_VERIFICATION_FAIL:
      return state.set('done', true)
                  .set('error', true)
                  .set('msg', action.error.message);

    case FORGET_PASSWORD: {
      return state.set('done', false)
                  .set('error', false)
                  .set('msg', '')
                  .set('showNotification', true);
    }
    case FORGET_PASSWORD_SUCCESS:
      return state
                .set('done', true)
                .set('error', false)
                .set('msg', 'Reset email sent, please check your email.');
    case FORGET_PASSWORD_FAIL:
      return state
                .set('done', true)
                .set('error', true)
                .set('msg', action.error.message);
    case RESET_PASSWORD: {
      return state.set('done', false)
                  .set('error', false)
                  .set('msg', '')
                  .set('showNotification', true);
    }
    case RESET_PASSWORD_SUCCESS:
      return state
                .set('done', true)
                .set('error', false)
                .set('msg', 'Reset password success! Please Login !');
    case RESET_PASSWORD_FAIL:
      return state
                .set('done', true)
                .set('error', true)
                .set('msg', action.error.message);

    case CHANGE_PASSWORD: {
      return state
                .set('done', false)
                .set('error', null);
    }
    case CHANGE_PASSWORD_SUCCESS:
      return state.set('done', true)
                  .set('error', null);
    case CHANGE_PASSWORD_FAIL:
      return state.set('done', true)
                  .set('error', action.error.message);
    case USER_LOGOUT: {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('preRoutePath');
      return state
              .set('logoutDone', false)
              .set('error', '');
    }
    case USER_LOGOUT_SUCCESS: {
      return initialState;
    }
    case USER_LOGOUT_FAIL:
      return state
              .set('logoutDone', true)
              .set('error', action.error.message);
    case HIDE_PROFILE_MODAL:
      return state.set('shouldProfileModalShown', false);
    case SHOW_PROFILE_MODAL:
      return state.set('shouldProfileModalShown', true)
                  .set('disableCloseProfile', action.disableClose || false)
                  .set('profileUserId', action.userId);

    case LOAD_AREA_CONFIG:
      return state;
    case LOAD_AREA_CONFIG_SUCCESS: {
      return state.set('areaConfig', fromJS(action.areaConfig));
    }
    case LOAD_AREA_CONFIG_FAIL:
      return state;
    default:
      return state;
  }
}

export default appReducer;
