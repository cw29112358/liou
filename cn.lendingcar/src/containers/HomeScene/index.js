/**
 *
 * HomeScene Container
 *
 */
/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  View,
} from 'native-base';
import moment from 'moment';

import { openURLByLinking } from 'utils/helpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import auth from 'utils/auth';

import { logoutByUserAction, getFavouriteCarAction } from 'containers/AppRouter/actions';
import {
  selectAuthUserInfo,
  selectIsLoggedIn,
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

import Loader from 'components/Loader';
import NoticeModal from 'components/NoticeModal';
import Mask from 'components/Mask';
import PriceFilter from 'components/PriceFilter';

import HomeHeader from './components/HomeHeader';
import AreaSelectModal from './components/AreaSelectModal';
import CarTypeList from './components/CarTypeList';
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
      isShowSelectModal: false,
      isShowNotice: false,
      lastAlertVersion: '',
    };
  }

  componentWillMount() {
    const {
      authUser, loadNotifications, getFavouriteCar, loadAppVersion,
    } = this.props;

    this.getNotificationLastReadTime();
    this.getLastAlertVersion();

    loadAppVersion();
    // TODO: react-native-router-flux 堆栈内页面，其他页面修改页面props，会重新渲染
    if (authUser.id) {
      loadNotifications();
      getFavouriteCar();
    }
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
  componentWillUnmount() {
    this.clearVersionTask();
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
    Actions.push('inventory');
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

  goToProfileCenter = () => {
    window.validIsLoggedIn(this.goToProfileCenterAfterLoggedIn);
  };
  goToProfileCenterAfterLoggedIn = () => {
    this.setState({ isShowSelectModal: false });
    Actions.push('profileCenter');
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

  getIndication = () => {
    const { inventories, isLoading } = this.props;
    const {
      isShowNotice,
    } = this.state;

    const realIsLoading = inventories.length <= 0 && isLoading;
    const realIsShowNotice = !realIsLoading && isShowNotice;

    return {
      isLoading: realIsLoading,
      isShowNotice: realIsShowNotice,
    };
  }

  renderHeader = (area) => {
    const {
      currentArea, authUser, notificationIsRead, isLoggedIn,
    } = this.props;

    return (
      <HomeHeader
        currentArea={currentArea}
        area={area}
        goToProfileCenter={this.goToProfileCenter}
        changeSelectModal={this.changeSelectModal}
        notificationIsRead={notificationIsRead}
        isLoggedIn={isLoggedIn}
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

  renderFilterPrice = () => {
    const { filterData, changeFilter } = this.props;
    return (
      <PriceFilter
        rightLabel="purchaseBudget"
        viewStyle={styles.filterView}
        slideWidth={styles.slideLength}
        filterData={filterData}
        changeFilter={changeFilter}
        changeIsScroll={() => null}
      />
    );
  }
  renderCarTypeList = () => {
    const { typeOfInventory } = this.props;
    return (
      <CarTypeList
        typeOfInventory={typeOfInventory}
        onFilterCarTypeChange={this.onFilterCarTypeChange}
      />
    );
  }
  renderContent = () => (
    <View style={styles.contentContainer}>
      {this.renderFilterPrice()}
      {this.renderCarTypeList()}
    </View>
  )

  render() {
    const { allArea, notice, isLoading } = this.props;
    const area = Object.keys(allArea);
    const { isShowSelectModal } = this.state;
    const {
      isLoading: realIsLoading,
      isShowNotice,
    } = this.getIndication();

    return (
      <Container>
        { this.renderHeader(area) }
        { !realIsLoading && this.renderContent() }
        { isShowSelectModal && this.renderAreaSelect(area) }
        { isLoading && <Loader /> }
        { isShowNotice && <NoticeModal isShowNotice={isShowNotice} onClose={this.closeNotice} notice={notice} />}
        { isShowNotice && <Mask onPress={this.closeNotice} />}
      </Container>
    );
  }
}

HomeScene.defaultProps = {
  isLoading: true,
  isLoggedIn: false,
  notificationIsRead: false,
  notice: null,
};

HomeScene.propTypes = {
  authUser: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  inventories: PropTypes.array.isRequired,
  typeOfInventory: PropTypes.array.isRequired,
  filterData: PropTypes.object.isRequired,
  allArea: PropTypes.object.isRequired,
  currentArea: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
  notificationIsRead: PropTypes.any,
  notice: PropTypes.object,
  versionInfo: PropTypes.object.isRequired,
  loadInventory: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  notificationsLastReadTime: PropTypes.func.isRequired,
  getFavouriteCar: PropTypes.func.isRequired,
  loadAppVersion: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  isLoading: selectIsLoading,
  inventories: selectAllInventory,
  typeOfInventory: selectInventoryByType,
  filterData: selectFilterData,
  allArea: selectAreaConfig,
  currentArea: selectArea,
  notificationIsRead: selectNotificationListIsRead,
  notice: selectNotice,
  versionInfo: selectVersionInfo,
  isLoggedIn: selectIsLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutByUserAction()),
  loadInventory: (params) => dispatch(loadInventoryAction(params)),
  changeFilter: (name, value) => dispatch(changeFilterAction(name, value)),
  loadNotifications: () => dispatch(loadNotificationsAction()),
  getFavouriteCar: () => dispatch(getFavouriteCarAction()),
  notificationsLastReadTime: (time) => dispatch(setNotificationsLastReadTimeAction(time)),
  loadAppVersion: () => dispatch(loadAppVersionAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'homeScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  newsReducer,
  versionReducer,
  ...withSagas,
  ...newsWithSagas,
  ...versionSagas,
  withConnect,
)(HomeScene);
