/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
 import URLSearchParams from 'url-search-params';
 let search = '';
 try {
   search = window.location.search;
 } catch (e) {
   window.alert('Error', 'Please note, lendingcar.com will not work properly under Privacy Mode.\n\n温馨提示：LendingCar网站在隐私浏览模式下将无法提供最好的服务。', 'error');// eslint-disable-line global-require
 }
 const params = new URLSearchParams(search);
 const locale = params.get('locale') || params.get('lang') || 'en';
 const referralCode = params.get('ref');
 try {
   window.localStorage.referralCode = referralCode || window.localStorage.referralCode;
   window.localStorage.DEFAULT_LOCALE = window.localStorage.DEFAULT_LOCALE || locale;
 } catch (e) {
   window.alert('Error', 'Please note, lendingcar.com will not work properly under Privacy Mode.\n\n温馨提示：LendingCar网站在隐私浏览模式下将无法提供最好的服务。', 'error');// eslint-disable-line global-require
 }

 export const DEFAULT_LOCALE = window.localStorage.DEFAULT_LOCALE || 'en';
 export const PURCHASE_CAR = 'app/App/PURCHASE_CAR';
 export const SHOW_SUBSCRIBE_MODAL = 'app/App/SHOW_SUBSCRIBE_MODAL';
 export const HIDE_SUBSCRIBE_MODAL = 'app/App/HIDE_SUBSCRIBE_MODAL';
 export const UPDATE_SUBSCRIBE_FORM = 'app/App/UPDATE_SUBSCRIBE_FORM';
 export const HIDE_NOTIFICATION = 'app/App/HIDE_NOTIFICATION';
 export const CHANGE_CALCULATOR = 'app/App/CHANGE_CALCULATOR';

 export const USER_SIGNUP = 'app/App/USER_SIGNUP';
 export const USER_SIGNUP_SUCCESS = 'app/App/USER_SIGNUP_SUCCESS';
 export const USER_SIGNUP_FAIL = 'app/App/USER_SIGNUP_FAIL';
 export const USER_SIGNUP_PASSWORD_WRONG = 'app/App/USER_SIGNUP_PASSWORD_WRONG';

 export const USER_LOGIN = 'app/App/USER_LOGIN';
 export const USER_LOGIN_SUCCESS = 'app/App/USER_LOGIN_SUCCESS';
 export const USER_LOGIN_FAIL = 'app/App/USER_LOGIN_FAIL';

 export const CHECK_IF_VERIFIED = 'app/App/CHECK_IF_VERIFIED';

 export const USER_SEND_VERIFICATION = 'app/App/USER_SEND_VERIFICATION';
 export const USER_SEND_VERIFICATION_SUCCESS = 'app/App/USER_SEND_VERIFICATION_SUCCESS';
 export const USER_SEND_VERIFICATION_FAIL = 'app/App/USER_SEND_VERIFICATION_FAIL';

 export const FORGET_PASSWORD = 'app/App/FORGET_PASSWORD';
 export const FORGET_PASSWORD_SUCCESS = 'app/App/FORGET_PASSWORD_SUCCESS';
 export const FORGET_PASSWORD_FAIL = 'app/App/FORGET_PASSWORD_FAIL';

 export const RESET_PASSWORD = 'app/App/RESET_PASSWORD';
 export const RESET_PASSWORD_SUCCESS = 'app/App/RESET_PASSWORD_SUCCESS';
 export const RESET_PASSWORD_FAIL = 'app/App/RESET_PASSWORD_FAIL';

 export const CHANGE_PASSWORD = 'app/App/CHANGE_PASSWORD';
 export const CHANGE_PASSWORD_SUCCESS = 'app/App/CHANGE_PASSWORD_SUCCESS';
 export const CHANGE_PASSWORD_FAIL = 'app/App/CHANGE_PASSWORD_FAIL';

 export const USER_LOGOUT = 'app/App/USER_LOGOUT';
 export const USER_LOGOUT_SUCCESS = 'app/App/USER_LOGOUT_SUCCESS';
 export const USER_LOGOUT_FAIL = 'app/App/USER_LOGOUT_FAIL';

 export const SHOW_PROFILE_MODAL = 'app/App/SHOW_PROFILE_MODAL';
 export const HIDE_PROFILE_MODAL = 'app/App/HIDE_PROFILE_MODAL';
 export const UPDATE_USER_INFO = 'app/App/UPDATE_USER_INFO';
 export const UPDATE_USER_INFO_SUCCESS = 'app/App/UPDATE_USER_INFO_SUCCESS';
 export const UPDATE_USER_INFO_FAIL = 'app/App/UPDATE_USER_INFO_FAIL';
 export const DELETE_USER = 'app/App/DELETE_USER';
 export const DELETE_USER_SUCCESS = 'app/App/DELETE_USER_SUCCESS';
 export const DELETE_USER_FAIL = 'app/App/DELETE_USER_FAIL';

 export const USER_UPDATE_CURRENT = 'app/App/USER_UPDATE_CURRENT';

 export const LOAD_USER_INFO = 'app/App/LOAD_USER_INFO';
 export const LOAD_USER_INFO_SUCCESS = 'app/App/LOAD_USER_INFO_SUCCESS';
 export const LOAD_USER_INFO_FAIL = 'app/App/LOAD_USER_INFO_FAIL';

 export const UPLOAD_IMAGE = 'app/App/UPLOAD_IMAGE';
 export const UPLOAD_IMAGE_SUCCESS = 'app/App/UPLOAD_IMAGE_SUCCESS';
 export const UPLOAD_IMAGE_FAIL = 'app/App/UPLOAD_IMAGE_FAIL';

 export const UPDATE_FORM = 'app/App/UPDATE_FORM';
 export const UPDATE_FORM_SUCCESS = 'app/App/UPDATE_FORM_SUCCESS';
 export const UPDATE_FORM_FAIL = 'app/App/UPDATE_FORM_FAIL';

 export const LOAD_FORM = 'app/App/LOAD_FORM';
 export const LOAD_FORM_SUCCESS = 'app/App/LOAD_FORM_SUCCESS';
 export const LOAD_FORM_FAIL = 'app/App/LOAD_FORM_FAIL';

 export const UPLOAD_FILE_FORM = 'app/App/UPLOAD_FILE_FORM';
 export const UPLOAD_FILE_FORM_SUCCESS = 'app/App/UPLOAD_FILE_FORM_SUCCESS';
 export const UPLOAD_FILE_FORM_FAIL = 'app/App/UPLOAD_FILE_FORM_FAIL';

 export const LOAD_AREA_CONFIG = 'app/App/LOAD_AREA_CONFIG';
 export const LOAD_AREA_CONFIG_SUCCESS = 'app/App/LOAD_AREA_CONFIG_SUCCESS';
 export const LOAD_AREA_CONFIG_FAIL = 'app/App/LOAD_AREA_CONFIG_FAIL';
