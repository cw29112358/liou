/**
 *
 * HomeScene Container
 *
 */
/* global window translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base';
import { Animated, Image } from 'react-native';
import moment from 'moment';

import { openURLByLinking, notificationLink, getCurrentDate } from 'utils/helpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import auth from 'utils/auth';

import {
  logoutByUserAction,
  updateMembershipAction,
  getFavouriteCarAction,
} from 'containers/AppRouter/actions';
import {
  selectAuthUserInfo,
  selectAuthUserMembership,
  selectAuthUserAgent,
  selectIsPrimary,
} from 'containers/AppRouter/selectors';
import {
  loadInventoryAction,
  changeFilterAction,
} from 'containers/InventoryScene/actions';
import {
  selectIsLoading,
  selectAllInventory,
  selectInventoryByType,
  selectFilterData,
} from 'containers/InventoryScene/selectors';
import PriceFilter from 'containers/InventoryScene/components/PriceFilter';
import { PRICE_OPTIONS } from 'containers/InventoryScene/constants';
import {
  withReducer as newsReducer,
  withSagas as newsWithSagas,
} from 'containers/MyNewsScene';
import {
  selectNotice,
  selectNotificationListIsRead,
} from 'containers/MyNewsScene/selectors';
import {
  loadNotificationsAction,
  setNotificationsLastReadTimeAction,
} from 'containers/MyNewsScene/actions';
import {
  withReducer as versionReducer,
  withSagas as versionSagas,
} from 'containers/VersionScene';
import {
  loadAppVersionAction,
} from 'containers/VersionScene/actions';
import {
  selectVersionInfo,
} from 'containers/VersionScene/selectors';
import {
  withReducer as memberSceneReducer,
  withSagas as memberSceneSagas,
} from 'containers/MemberScene';
import {
  loadMembershipPriceAction,
} from 'containers/MemberScene/actions';
import {
  selectSpecialActivity,
} from 'containers/MemberScene/selectors';

import SideBar from 'components/SideBar';
import Loader from 'components/Loader';
import NoticeModal from 'components/NoticeModal';
import Mask from 'components/Mask';

import HomeHeader from './components/HomeHeader';
import AreaSelectModal from './components/AreaSelectModal';
import CarCard from './components/CarCard';
import GuideLayer from './components/GuideLayer';
import {
  selectAreaConfig,
  selectArea,
} from './selectors';
import sagas from './sagas';
import reducer from './reducer';
import styles from './styles';

export class HomeScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMask: false,
      isShowSelectModal: false,
      isShowNotice: false,
      drawer: new Animated.Value(-styles.drawerWidth),
      isPrimaryState: props.isPrimary,
      currentStep: 1,
      lastAlertVersion: '',
      currentDate: getCurrentDate(),
    };
  }

  componentWillMount() {
    const {
      authUser, loadNotifications, getFavouriteCar, loadAppVersion,
      loadMembershipPrice,
    } = this.props;

    this.getLocalPrimary();
    this.getNotificationLastReadTime();
    this.getLastAlertVersion();
    loadMembershipPrice();
    loadAppVersion();
    // TODO: react-native-router-flux 堆栈内页面，其他页面修改页面props，会重新渲染
    if (authUser.id) {
      loadNotifications();
      getFavouriteCar();
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ currentDate: getCurrentDate() });
    }, 1000);
  }
  componentWillReceiveProps(nextProps) {
    const { notice, versionInfo } = this.props;

    if (nextProps.notice && nextProps.notice !== notice) {
      const { promotionExpiration } = nextProps.notice;
      if (!promotionExpiration || moment(promotionExpiration).unix() > moment().unix()) {
        this.setState({ isShowNotice: true });
      }
    }

    if (nextProps.versionInfo !== versionInfo) {
      this.initLastAlertVersion(nextProps.versionInfo);
    }
  }
  componentWillUpdate(nextProps, nextState) {
    const { loadMembershipPrice, specialActivity } = this.props;
    if (!!specialActivity[0] && nextState.currentDate > specialActivity[0].endDate) {
      loadMembershipPrice({ forceReload: true });
      clearInterval(this.interval);
    }
  }
  componentWillUnmount() {
    this.isDestory = true;
    this.clearVersionTask();
    clearInterval(this.interval);
  }

  getLocalPrimary = async () => {
    const localPrimary = await auth.get('isPrimary');
    if (!localPrimary && !this.isDestory) {
      this.setState({ isPrimaryState: localPrimary !== 'seen' });
    }
  }
  getNotificationLastReadTime = async () => {
    const { notificationsLastReadTime } = this.props;
    const lastReadTime = await auth.get('notificationLastReadTime');
    notificationsLastReadTime(lastReadTime);
  }

  onFilterCarTypeChange = (value) => {
    const { changeFilter } = this.props;
    const carType = value === 'all' ? '' : value;
    changeFilter('carType', carType);
  }

  closeNotice = () => {
    this.setState({ isShowNotice: false });
  }

  // version alert
  getLastAlertVersion = async () => {
    const lastAlertVersion = await auth.get('lastAlertVersion');
    if (lastAlertVersion) this.setState({ lastAlertVersion });
  }
  initLastAlertVersion = async (versionInfo) => {
    const { version, isLargeLatest } = versionInfo;
    const { lastAlertVersion } = this.state;

    if (version !== lastAlertVersion) {
      auth.set(version, 'lastAlertVersion');
      this.setState({ lastAlertVersion: version });

      if (!isLargeLatest) this.alertVersionUpdateTask();
    }
  }
  alertVersionUpdateTask = () => {
    this.clearVersionTask();
    this.versionTimer = setInterval(() => {
      const { isLoading, isShowGuide, isShowNotice } = this.getIndication();
      if (isLoading || isShowGuide || isShowNotice) return;

      this.alertVersionUpdate();
    }, 100);
  }
  clearVersionTask = () => {
    clearInterval(this.versionTimer);
  }
  alertVersionUpdate = () => {
    this.clearVersionTask();
    window.alert(
      'findVersion',
      'findVersionText',
      [
        {
          text: 'cancel',
        },
        {
          text: 'update',
          onPress: this.linkToDownload,
        },
      ],
    );
  }
  linkToDownload = () => {
    const { versionInfo: { url } } = this.props;
    openURLByLinking(url);
  }

  closeDrawer = (closeSpeed) => {
    const { drawer } = this.state;
    if (closeSpeed) {
      Animated.timing(drawer, {
        toValue: -styles.drawerWidth,
        duration: 300,
      }).start();
      setTimeout(() => this.setState({ isShowMask: false }), 300);
    } else {
      drawer.setValue(-styles.drawerWidth);
      this.setState({ isShowMask: false });
    }
  };
  openDrawer = () => {
    window.validIsLoggedIn(this.openDrawerAfterLoggedIn);
  };
  openDrawerAfterLoggedIn = () => {
    const { drawer } = this.state;
    this.setState({
      isShowMask: true,
      isShowSelectModal: false,
    });
    Animated.timing(drawer, {
      toValue: 0,
      duration: 300,
    }).start();
    this.updateMembership();
  }
  updateMembership = () => {
    const { authUserMembership, updateMembership } = this.props;
    if (authUserMembership.status === 'pending') {
      updateMembership(this.openDrawerSuccess);
    }
  }

  goToNews = () => {
    window.validIsLoggedIn(this.goToNewsAfterLoggedIn);
  };
  goToNewsAfterLoggedIn = () => {
    this.setState({ isShowSelectModal: false });
    Actions.push('myNews');
  }

  changeSelectModal = () => {
    const { isShowSelectModal } = this.state;
    this.setState({ isShowSelectModal: !isShowSelectModal });
  }
  changeArea = (item) => {
    const { loadInventory } = this.props;
    loadInventory({ forceReload: true, area: item });
    this.changeSelectModal();
  }

  renderSkipButton =() => (
    <Button
      onPress={() => this.nextStep(4)}
      style={styles.skipButton}
    >
      <Text style={styles.buttonText}>{translate('skip')}</Text>
    </Button>
  )
  nextStep = (index) => {
    const { currentStep } = this.state;
    if (index) {
      this.setState({ currentStep: index });
    } else {
      this.setState({ currentStep: currentStep + 1 });
    }
    if (currentStep + 1 > 3 || index) {
      auth.set('seen', 'isPrimary');
    }
  }

  getIndication = () => {
    const { inventories, isLoading } = this.props;
    const { isPrimaryState, currentStep, isShowNotice } = this.state;

    const realIsLoading = inventories.length <= 0 && isLoading;
    const isShowGuide = !realIsLoading && isPrimaryState && currentStep <= 3;
    const realIsShowNotice = !realIsLoading && !isShowGuide && isShowNotice;

    return {
      isLoading: realIsLoading,
      isShowGuide,
      isShowNotice: realIsShowNotice,
    };
  }

  renderHeader = (area) => {
    const { currentArea, notificationIsRead, authUser } = this.props;
    const { isShowSelectModal } = this.state;

    return (
      <HomeHeader
        currentArea={currentArea}
        area={area}
        isShowSelectModal={isShowSelectModal}
        openDrawer={this.openDrawer}
        changeSelectModal={this.changeSelectModal}
        rightPress={this.goToNews}
        notificationIsRead={notificationIsRead}
        authUser={authUser}
      />
    );
  }
  renderAreaSelect = (area) => {
    const { currentArea } = this.props;
    return (
      <AreaSelectModal
        changeSelectModal={this.changeSelectModal}
        area={area}
        currentArea={currentArea}
        changeArea={this.changeArea}
      />
    );
  }

  renderCarCard = () => {
    const { typeOfInventory, authUserMembership } = this.props;
    return (
      <CarCard
        authUserMembership={authUserMembership}
        typeOfInventory={typeOfInventory}
        onFilterCarTypeChange={this.onFilterCarTypeChange}
        specialButton={this.renderSpecialButton()}
      />
    );
  }
  renderFilterPrice() {
    const { filterData, changeFilter } = this.props;

    return (
      <PriceFilter
        titleViewStyle={styles.priceTitleView}
        leftLabel="purchaseBudget"
        rightLabel="purchaseBudget2"
        leftLabelStyle={styles.priceLeftLabel}
        rightLabelStyle={styles.priceRightLabel}
        options={PRICE_OPTIONS}
        selectedOption={filterData.priceLabel}
        changeFilter={changeFilter}
        buttonViewStyle={styles.priceButtonView}
      />
    );
  }

  renderSpecialButton = () => {
    const { specialActivity } = this.props;
    if (!specialActivity[0]) return null;
    return (
      <Button
        style={styles.specialButton}
        onPress={() => notificationLink(specialActivity[0].url)}
      >
        <Image source={{ uri: specialActivity[0].icon }} style={styles.specialImage} />
      </Button>
    );
  }
  renderContent = () => (
    <Content
      style={styles.content}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={false}
    >
      {this.renderFilterPrice()}
      {this.renderCarCard()}
    </Content>
  )

  renderChildren = () => {
    const { allArea, notice, isLoading } = this.props;
    const area = Object.keys(allArea);
    const { isShowSelectModal, isShowMask, currentStep } = this.state;
    const { isLoading: realIsLoading, isShowGuide, isShowNotice } = this.getIndication();

    return (
      <Container>
        { this.renderHeader(area) }
        { !realIsLoading && this.renderContent() }
        { isShowSelectModal && this.renderAreaSelect(area) }
        { isShowMask && this.renderSideBar() }
        { isLoading && <Loader /> }
        { isShowGuide && <GuideLayer nextStep={this.nextStep} currentStep={currentStep} /> }
        { isShowGuide && this.renderSkipButton() }
        { isShowNotice && <NoticeModal isShowNotice={isShowNotice} onClose={this.closeNotice} notice={notice} />}
        { isShowNotice && <Mask onPress={this.closeNotice} />}
      </Container>
    );
  }
  renderSideBar = () => {
    const { authUser, authUserMembership, authUserAgent } = this.props;
    const { drawer } = this.state;

    return (
      <SideBar
        authUser={authUser}
        authUserMembership={authUserMembership}
        authUserAgent={authUserAgent || {}}
        closeDrawer={this.closeDrawer}
        offset={drawer}
      />
    );
  }

  render() {
    return this.renderChildren();
  }
}

HomeScene.defaultProps = {
  isLoading: true,
  isPrimary: false,
  notificationIsRead: false,
  notice: null,
  specialActivity: [],
  loadMembershipPrice: () => null,
};

HomeScene.propTypes = {
  authUser: PropTypes.object.isRequired,
  authUserMembership: PropTypes.object.isRequired,
  authUserAgent: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  inventories: PropTypes.array.isRequired,
  typeOfInventory: PropTypes.array.isRequired,
  // priceRange: PropTypes.array.isRequired,
  filterData: PropTypes.object.isRequired,
  allArea: PropTypes.object.isRequired,
  currentArea: PropTypes.string.isRequired,
  isPrimary: PropTypes.any,
  notificationIsRead: PropTypes.any,
  notice: PropTypes.object,
  versionInfo: PropTypes.object.isRequired,
  specialActivity: PropTypes.array,
  updateMembership: PropTypes.func.isRequired,
  loadInventory: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  notificationsLastReadTime: PropTypes.func.isRequired,
  getFavouriteCar: PropTypes.func.isRequired,
  loadAppVersion: PropTypes.func.isRequired,
  loadMembershipPrice: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  authUserMembership: selectAuthUserMembership,
  authUserAgent: selectAuthUserAgent,
  isLoading: selectIsLoading,
  inventories: selectAllInventory,
  typeOfInventory: selectInventoryByType,
  filterData: selectFilterData,
  allArea: selectAreaConfig,
  currentArea: selectArea,
  isPrimary: selectIsPrimary,
  notificationIsRead: selectNotificationListIsRead,
  notice: selectNotice,
  versionInfo: selectVersionInfo,
  specialActivity: selectSpecialActivity,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutByUserAction()),
  updateMembership: (onSuccess, onFail) => dispatch(updateMembershipAction(onSuccess, onFail)),
  loadInventory: (params) => dispatch(loadInventoryAction(params)),
  changeFilter: (name, value) => dispatch(changeFilterAction(name, value)),
  loadNotifications: () => dispatch(loadNotificationsAction()),
  getFavouriteCar: () => dispatch(getFavouriteCarAction()),
  notificationsLastReadTime: (time) => dispatch(setNotificationsLastReadTimeAction(time)),
  loadAppVersion: () => dispatch(loadAppVersionAction()),
  loadMembershipPrice: (params) => dispatch(loadMembershipPriceAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'homeScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  newsReducer,
  versionReducer,
  memberSceneReducer,
  ...withSagas,
  ...newsWithSagas,
  ...versionSagas,
  ...memberSceneSagas,
  withConnect,
)(HomeScene);
