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
import I18n from 'react-native-i18n';
import XGPush from 'react-native-xinge-push-fei';

import variables from 'platform';

import auth from 'utils/auth';
import {
  translate,
  clearLoginAuthKey,
  executeFunction,
} from 'utils/helpers';
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
} from 'containers/HomeScene/actions';
import {
  withReducer as inventoryReducer,
  withSagas as inventorySagas,
} from 'containers/InventoryScene';
import {
  loadInventoryAction,
} from 'containers/InventoryScene/actions';

import RNToast from 'components/RNToast';

import {
  logInByJwtTokenAction,
  saveNotificationTokenAction,
} from './actions';
import {
  selectIsLoggedIn,
  selectIsFillFirstName,
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
      leaseType: null,
    };
    this.initPush();
    window.validIsLoggedIn = this.validIsLoggedIn;
  }
  componentWillMount() {
    I18n.locale = 'zh';
    this.onLogInByJwtToken();
    this.loadHomeSceneData();
    this.getLeaseType();
    // auth.clearLeaseType() //清空leaseType作为测试
  }
  componentDidMount() {
    this.onXGAddEvent();
  }
  componentWillUnmount() {
    this.onXGRemoveEvent();
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
  onLogInByJwtTokenSuccess = () => {
    const { saveNotificationToken } = this.props;
    this.onHideSplashScreen();
    saveNotificationToken();
  }

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

  //  从storage获取leaseType
  async getLeaseType() {
    let result = await auth.getLeaseType();
    if (!result) result = 'leaseType';
    if (result === 'lease') result = 'home';
    this.setState({ leaseType: result });
  }
  // 初始化推送
  initPush = () => {
    if (!isIOS) {
      XGPush.init(2100313884, 'AAPC2GJ3456B');
    } else {
      XGPush.init(2200313885, 'IN1C2V735CHW');
    }
    this.initXGRegister();
  }
  // 注册
  initXGRegister = () => {
    XGPush.register('com.xutao.iccars')
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
      Actions.reset('login');
    }
  }

  // 判断进入app显示哪一页面
  getInitialKey = () => {
    const { isFillFirstName } = this.props;
    const { leaseType } = this.state;
    const isLoggedIn = this.getIsLoggedIn();
    if (!isLoggedIn) return 'login';
    if (!isFillFirstName) return 'simpleProfile';
    if (leaseType) {
      return leaseType;
    }
    return 'leaseType';
  }

  // 加载inventories
  async loadHomeSceneData() {
    const { loadAreaConfig, loadLocationCity, loadInventory } = this.props;
    loadAreaConfig();

    const localArea = await auth.get('localArea');
    if (localArea) {
      loadInventory({ area: localArea });
      loadLocationCity();// may be don't add
    } else {
      const onSuccess = (localCity) => {
        loadInventory({ area: localCity.area });
      };
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
  isFillFirstName: false,
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool,
  isFillFirstName: PropTypes.bool,
  logInByJwtToken: PropTypes.func.isRequired,
  saveNotificationToken: PropTypes.func.isRequired,
  loadAreaConfig: PropTypes.func.isRequired,
  loadLocationCity: PropTypes.func.isRequired,
  loadInventory: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoggedIn: selectIsLoggedIn,
  isFillFirstName: selectIsFillFirstName,
});

const mapDispatchToProps = (dispatch) => ({
  logInByJwtToken: (onSuccess, onFail) => dispatch(logInByJwtTokenAction(onSuccess, onFail)),
  saveNotificationToken: () => dispatch(saveNotificationTokenAction()),
  loadAreaConfig: () => dispatch(loadAreaConfigAction()),
  loadLocationCity: (onSuccess) => dispatch(loadLocationCityAction(onSuccess)),
  loadInventory: (params) => dispatch(loadInventoryAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appRouter', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  homeReducer,
  inventoryReducer,
  ...withSagas,
  ...homeSagas,
  ...inventorySagas,
  withConnect,
)(AppRouter);
