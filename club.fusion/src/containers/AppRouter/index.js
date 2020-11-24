/**
* Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Alert,
} from 'react-native';
import { createPropsSelector } from 'reselect-immutable-helpers';
import SplashScreen from 'react-native-splash-screen';
import XGPush from 'react-native-xinge-push-fei';
import DeviceInfo from 'react-native-device-info';
import I18n from 'react-native-i18n';
import moment from 'moment';
import find from 'lodash/find';
import JMessage from 'jmessage-react-plugin';

import variables from 'platform';

import auth from 'utils/auth';
import {
  translate,
  clearLoginAuthKey,
  executeFunction,
  loginJMessage,
} from 'utils/helpers';
import {
  DATE_FORMAT,
  DATE_FORMAT_YMD,
  JMESSAGE_INIT_PARAMS,
} from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import AppRoutes from 'src/AppRoutes';

import {
  withReducer as homeReducer,
  withSagas as homeSagas,
} from 'containers/HomeScene';
import {
  loadAreaConfigAction,
  loadLocationCityAction,
  loadActivitiesAction,
} from 'containers/HomeScene/actions';

import RNToast from 'components/RNToast';

import {
  logInByJwtTokenAction,
  saveNotificationTokenAction,
  changeLanguageAction,
  saveUnreadMessageCountAction,
  saveConversationsInfoAction,
  updatePublicProfilesAction,
} from './actions';
import {
  selectIsLoggedIn,
  selectLanguage,
} from './selectors';
import reducer from './reducer';
import sagas from './sagas';

const { isIOS } = variables;
window.translate = translate;

window.alert = (title, message, buttons, options = {}, type) => {
  const {
    titleTranslate = true, messageTranslate = true, buttonTranslate = true,
    ...otherOptions
  } = options;

  const translateText = (label, isTranslate) => isTranslate ? window.translate(label) : label;

  const alertButtons = buttons || [{ text: 'confirm' }];
  const translateButtons = alertButtons.map((item) => {
    const { text, buttonTranslate: itemButtonTranslate = true } = item;

    return {
      ...item,
      text: translateText(text, buttonTranslate && itemButtonTranslate),
    };
  });

  Alert.alert(
    translateText(title, titleTranslate),
    translateText(message, messageTranslate),
    translateButtons,
    otherOptions,
    type,
  );
};

window.toast = (title = '', message = '', type = '', duration = 2500) => {
  RNToast.show({
    duration,
    position: 'middle',
    type,
    text: `${title}${message ? `\n ${message}` : ''}`,
  });
};

class AppRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSpash: true,
    };
    this.initPush();
    window.validIsLoggedIn = this.validIsLoggedIn;
    window.changeLanguage = this.onChangeLanguage;
    window.momentFormat = this.momentFormat;
  }
  componentWillMount() {
    this.onInitLanguage();
    this.loadHomeSceneData();
    this.onLogInByJwtToken();
    JMessage.init(JMESSAGE_INIT_PARAMS);
    JMessage.addReceiveMessageListener(this.receiveMessageCallBack);
    JMessage.addClickMessageNotificationListener(this.clickMessageNotificationListener);
    this.saveUnreadMessageCount();
    this.saveAllConversationsInfo();
  }
  componentDidMount() {
    this.onXGAddEvent();
  }
  componentWillUnmount() {
    this.onXGRemoveEvent();
    JMessage.removeClickMessageNotificationListener(this.clickMessageNotificationListener);
  }
  // 监听好友消息
  receiveMessageCallBack = () => {
    this.saveUnreadMessageCount();
    this.saveAllConversationsInfo();
  }
  // 监听点击消息通知事件
  clickMessageNotificationListener = (message) => {
    const { message: { from: { username } } } = message;
    Actions.push('imessage', {
      userName: username,
    });
  }
  saveAllConversationsInfo = () => {
    const { saveConversationsInfo } = this.props;
    JMessage.getConversations((conArr) => {
      saveConversationsInfo(conArr);
    }, (error) => {
      console.log(error);
    });
  }
  saveUnreadMessageCount = () => {
    const { saveUnreadMessageCount } = this.props;
    JMessage.getAllUnreadCount((count) => {
      saveUnreadMessageCount(count);
    });
  }
  // 隐藏Splash
  onHideSplashScreen = () => {
    SplashScreen.hide();
    this.setState({
      showSpash: false,
    });
  }
  onHideSplashScreenAndClearKey = () => {
    clearLoginAuthKey();
    this.onHideSplashScreen();
  }
  // 刷新登陆
  async onLogInByJwtToken() {
    const { logInByJwtToken } = this.props;
    const accessToken = await auth.getToken();
    const isOnline = await auth.get('isOnline');
    if (isOnline === 'true' && accessToken) {
      logInByJwtToken(this.onLogInByJwtTokenSuccess, this.onHideSplashScreenAndClearKey);
    } else {
      this.onHideSplashScreenAndClearKey();
    }
  }
  onLogInByJwtTokenSuccess = (authUser) => {
    const { saveNotificationToken } = this.props;
    const { profile: { user, id } } = authUser;
    const loginInfo = {
      username: user,
      password: id,
    };
    loginJMessage(loginInfo);
    this.onHideSplashScreen();
    saveNotificationToken();
  }

  // language
  async onInitLanguage() {
    let language = await auth.get('language');

    if (!language) {
      const systemLanguage = DeviceInfo.getDeviceLocale();
      const findLanguage = find(Object.keys(I18n.translations), (value) => !!systemLanguage.match(value));
      language = findLanguage || 'en';
    }
    this.onChangeLanguage(language);
  }
  onChangeLanguage = (language) => {
    const { changeLanguage } = this.props;
    changeLanguage(language);
  }
  momentFormat = (date, formatString, options = {}) => {
    const { isUTC = true } = options;
    const { language } = this.props;

    let realFormat = formatString;
    if (!realFormat) {
      realFormat = language === 'en' ? DATE_FORMAT : DATE_FORMAT_YMD;
    }

    const dateMoment = isUTC ? moment.utc(date) : moment(date);
    const result = dateMoment.format(realFormat);
    if (result === 'Invalid date') return '';
    return result;
  };

  // 信鸽通知跳转
  async onLinkToSceneKeyPath(notification) {
    const accessToken = await auth.getToken();
    if (!accessToken) return;

    const customContent = isIOS ? notification.custom
      : JSON.parse(notification.custom_content);
    if (!customContent) return;

    const { sceneKeyPath, notificationId } = customContent;
    if (!sceneKeyPath) return;

    const funcName = Actions.currentScene === sceneKeyPath ? 'replace' : 'push';
    Actions[funcName](sceneKeyPath, { notificationId });
  }
  // 信鸽增加事件
  onXGAddEvent() {
    XGPush.addEventListener('register', this.onRegister);
    XGPush.addEventListener('notification', this.onNotification);
  }
  // 信鸽移除事件
  onXGRemoveEvent() {
    XGPush.removeEventListener('register', this.onRegister);
    XGPush.removeEventListener('notification', this.onNotification);
  }
  // 初始化推送
  initPush = () => {
    if (!isIOS) {
      XGPush.init(2100322984, 'AD7F7S3D87YV');// ACCESS ID+ACCESS KEY
    } else {
      XGPush.init(2200322983, 'I9ZIM9W344UH');
    }
    this.initXGRegister();
  }
  // 注册
  initXGRegister = () => {
    XGPush.register('club.fusion')
      .then((result) => result)
      .catch((err) => {
        console.warn('xinge registration fail', err);
      });
  }
  // 注册成功
  onRegister = (deviceToken) => {
    auth.set(deviceToken, 'xgDeviceToken');
    console.log(`onRegister: ${deviceToken}`);
  }
  // 通知到达
  onNotification = (notification) => {
    if (notification.clicked === true) {
      this.onLinkToSceneKeyPath(notification);
      console.log(`app处于后台时收到通知${JSON.stringify(notification)}`);
    } else {
      console.log(`app处于前台时收到通知${JSON.stringify(notification)}`);
    }
  }

  // 判断是否登陆
  getIsLoggedIn = () => {
    const { isLoggedIn } = this.props;
    return isLoggedIn;
  }
  validIsLoggedIn = (loginCallback, backToEntry = true) => {
    const isLoggedIn = this.getIsLoggedIn();
    if (isLoggedIn) {
      executeFunction(loginCallback);
    } else if (backToEntry) {
      Actions.reset('entry');
    }
  }

  // 判断进入app显示哪一页面
  getInitialKey = () => {
    const isLoggedIn = this.getIsLoggedIn();

    if (!isLoggedIn) return 'entry';
    return 'home';
  }

  // 加载inventories
  async loadHomeSceneData() {
    const {
      updatePublicProfiles,
      loadLocationCity, loadAreaConfig, loadActivities,
    } = this.props;
    updatePublicProfiles({ getAll: true });
    loadAreaConfig();

    const localArea = await auth.get('localArea');
    const localIndustry = await auth.get('localIndustry');
    const onSuccess = (localCity) => {
      loadActivities({
        area: localCity.area,
        industry: localIndustry || 'all',
      });
    };
    if (localArea) {
      onSuccess({ area: localArea });
    } else {
      loadLocationCity(onSuccess);
    }
  }

  render() {
    const { showSpash } = this.state;
    if (showSpash) return null;

    const initialKey = this.getInitialKey();
    return <AppRoutes initialKey={initialKey} />;
  }
}

AppRouter.defaultProps = {
  isLoggedIn: false,
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool,
  language: PropTypes.string.isRequired,
  updatePublicProfiles: PropTypes.func.isRequired,
  logInByJwtToken: PropTypes.func.isRequired,
  saveNotificationToken: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  loadAreaConfig: PropTypes.func.isRequired,
  loadActivities: PropTypes.func.isRequired,
  loadLocationCity: PropTypes.func.isRequired,
  saveUnreadMessageCount: PropTypes.func.isRequired,
  saveConversationsInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoggedIn: selectIsLoggedIn,
  language: selectLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  logInByJwtToken: (onSuccess, onFail) => dispatch(logInByJwtTokenAction(onSuccess, onFail)),
  saveNotificationToken: () => dispatch(saveNotificationTokenAction()),
  changeLanguage: (language) => dispatch(changeLanguageAction(language)),
  updatePublicProfiles: (params) => dispatch(updatePublicProfilesAction(params)),
  loadAreaConfig: () => dispatch(loadAreaConfigAction()),
  loadActivities: (params) => dispatch(loadActivitiesAction(params)),
  loadLocationCity: (onSuccess) => dispatch(loadLocationCityAction(onSuccess)),
  saveUnreadMessageCount: (count) => dispatch(saveUnreadMessageCountAction(count)),
  saveConversationsInfo: (conversations) => dispatch(saveConversationsInfoAction(conversations)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appRouter', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  homeReducer,
  ...withSagas,
  ...homeSagas,
  withConnect,
)(AppRouter);
