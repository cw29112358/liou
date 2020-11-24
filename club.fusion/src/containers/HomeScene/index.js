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
  View,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { OPTIONS_INDUSTRY } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import {
  selectAuthUserId,
  selectAuthUserInfo,
  selectAuthUserMembership,
} from 'containers/AppRouter/selectors';
import {
  withReducer as connectionReducer,
  withSagas as connectionSagas,
} from 'containers/MyConnectionScene';
import {
  loadConnectionsAction,
} from 'containers/MyConnectionScene/actions';
import {
  withSagas as favouritesSagas,
  withReducer as favouritesWithReducer,
} from 'containers/MyFavouritesScene';
import {
  loadMyFavouritesAction,
} from 'containers/MyFavouritesScene/actions';
import {
  selectIsLoading as selectFavouritesLoading,
} from 'containers/MyFavouritesScene/selectors';
import {
  withReducer as newsReducer,
  withSagas as newsSagas,
} from 'containers/MyNewsScene';
import {
  loadNotificationsAction,
  loadInvitationsAction,
} from 'containers/MyNewsScene/actions';

import ProjectLargeList from 'components/ProjectLargeList';
import FullScreenScene from 'components/FullScreenScene';
import EmptyList from 'components/EmptyList';

import SelectModal from './components/SelectModal';
import {
  loadActivitiesAction,
  loadAreaConfigAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import {
  selectDone,
  selectArea,
  selectIndustry,
  selectLocationAreaList,
  selectAreaOptions,
  selectSortActivities,
  selectIsLoading,
} from './selectors';
import locationImage from './assets/location.png';
import pullDownImage from './assets/pullDown.png';
import styles from './styles';

const industryOptions = [
  {
    label: 'all',
    value: 'all',
  },
  ...OPTIONS_INDUSTRY,
];

export class HomeScene extends React.Component {
  constructor(props) {
    super(props);
    const locationArea = props.area || props.areaList[0];
    const selectedIndustry = props.industry || industryOptions[0].value;
    this.state = {
      locationArea,
      isShowLocationModal: false,
      selectedIndustry,
      isShowIndustryModal: false,
      isRefreshing: true,
    };
    window.validRights = this.validRights;
  }
  componentWillMount() {
    const {
      loadConnections,
      authUserId,
      industry, area,
      activities, loadActivities,
      areaList, loadAreaConfig,
      loadMyFavourites,
      loadNotifications, loadInvitations,
    } = this.props;
    loadConnections();
    loadMyFavourites();
    if (authUserId && activities.length <= 0) {
      loadActivities({ forceReload: true, area, industry });
    }
    if (areaList.length <= 0) {
      loadAreaConfig({ forceReload: true });
    }
    loadNotifications();
    loadInvitations();
  }
  componentWillReceiveProps(nextProps) {
    const { areaList } = this.props;
    if (areaList !== nextProps.areaList) {
      this.setState({ locationArea: nextProps.areaList[0] });
    }
    if (!nextProps.isLoading && !nextProps.favouritesLoading) {
      this.setState({ isRefreshing: false });
    }
  }
  componentWillUnmount() {
    this.setState = () => null;
  }

  onRefresh = () => {
    const {
      industry, area,
      loadActivities, loadMyFavourites,
    } = this.props;
    this.setState({ isRefreshing: true });
    loadActivities({ forceReload: true, area, industry });
    loadMyFavourites({ forceReload: true });
  }

  validRights = (callback, validVerificationStatus = true, validMmebership = true) => {
    if (!validVerificationStatus && !validMmebership) {
      executeFunction(callback);
      return;
    }

    const {
      membership: { isMembership },
      authUser: { verificationStatus },
    } = this.props;
    if (!isMembership && validMmebership) {
      Actions.push('member');
    } else if (verificationStatus !== 'verified' && validVerificationStatus) {
      Actions.push('verified');
    } else {
      executeFunction(callback);
    }
  }
  openSelectModal = (type) => {
    if (type === 'area') {
      this.setState({ isShowLocationModal: true });
    } else {
      this.setState({ isShowIndustryModal: true });
    }
  }
  closeSelectModal = (type) => {
    if (type === 'area') {
      this.setState({ isShowLocationModal: false });
    } else {
      this.setState({ isShowIndustryModal: false });
    }
  }
  onValueChange = (type, item) => {
    const { industry, area, loadActivities } = this.props;
    loadActivities({
      forceReload: true,
      area,
      industry,
      [type === 'area' ? 'area' : 'industry']: item,
    });

    this.setState({ [type === 'area' ? 'locationArea' : 'selectedIndustry']: item });
    this.closeSelectModal(type);
  }
  leftPlaceHolderPress = (type) => {
    if (type === 'area') {
      this.closeSelectModal(type);
    } else {
      this.closeSelectModal();
      this.openSelectModal('area');
    }
  }
  rightPlaceHolderPress = (type) => {
    if (type === 'area') {
      this.closeSelectModal(type);
      this.openSelectModal();
    } else {
      this.closeSelectModal();
    }
  }
  closeSelectModal = () => {
    this.setState({
      isShowLocationModal: false,
      isShowIndustryModal: false,
    });
  }
  renderModal = () => {
    const { areaList } = this.props;
    const {
      isShowLocationModal, isShowIndustryModal, locationArea, selectedIndustry,
    } = this.state;
    let options;
    let currentSelect;
    let onChange;
    let modalType = '';
    if (isShowLocationModal) {
      options = areaList;
      currentSelect = locationArea;
      modalType = 'area';
      onChange = this.onValueChange;
    }
    if (isShowIndustryModal) {
      options = industryOptions.map((item) => item.value);
      currentSelect = selectedIndustry;
      onChange = this.onValueChange;
    }
    return (
      <SelectModal
        closeSelectModal={this.closeSelectModal}
        type={modalType}
        options={options}
        currentSelect={currentSelect}
        onChange={onChange}
        leftPlaceHolderPress={this.leftPlaceHolderPress}
        rightPlaceHolderPress={this.rightPlaceHolderPress}
      />
    );
  }

  setHeaderProps = () => {
    const { locationArea, selectedIndustry } = this.state;
    return ({
      title: 'projectTitle',
      hasRight: true,
      leftImage: locationImage,
      leftLable: locationArea,
      leftPress: () => this.openSelectModal('area'),
      leftIconStyle: styles.leftIcon,
      leftButtonStyle: styles.leftButton,
      leftButtonOtherProps: {
        textStyle: styles.leftText,
      },
      milldeButtonOtherProps: {
        buttonStyle: styles.middleButton,
      },
      leftFieldStyle: styles.leftField,
      rightImage: pullDownImage,
      rightLable: selectedIndustry,
      rightPress: () => this.openSelectModal(),
      rightIconStyle: styles.rightIcon,
      rightButtonStyle: styles.rightButton,
      rightFieldStyle: styles.rightField,
      rightButtonOtherProps: {
        textStyle: styles.rightText,
      },
      bodyFieldStyle: styles.bodyField,
    });
  }
  /* 事件event + 数据 */
  linkTo = (route, params) => {
    Actions.push(route, params);
  }

  renderEmptyList = (isPullRefresh) => (
    <EmptyList
      label="noActivites"
      onRefresh={this.onRefresh}
      isRefreshing={isPullRefresh}
    />
  )

  renderChildren = (isPullRefresh) => {
    const { activities } = this.props;
    if (activities.length <= 0) {
      return this.renderEmptyList(isPullRefresh);
    }
    return (
      <View style={styles.listContent}>
        <ProjectLargeList
          listData={activities}
          linkTo={this.linkTo}
          onRefresh={this.onRefresh}
          isListRefreshing={isPullRefresh}
        />
      </View>
    );
  }

  render() {
    const { isLoading, favouritesLoading } = this.props;
    const {
      isShowLocationModal, isShowIndustryModal, isRefreshing,
    } = this.state;
    const isShowLoader = (isLoading || favouritesLoading) && !isRefreshing;
    const isPullRefresh = (isLoading || favouritesLoading) && isRefreshing;
    const isShowModal = isShowLocationModal || isShowIndustryModal;
    return (
      <FullScreenScene
        headerProps={this.setHeaderProps()}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
        isLoading={isShowLoader}
      >
        { this.renderChildren(isPullRefresh) }
        { isShowModal && this.renderModal() }
      </FullScreenScene>
    );
  }
}

HomeScene.defaultProps = {
  isLoading: true,
  favouritesLoading: true,
  activities: [],
  areaList: [],
  area: '',
  industry: '',
  loadConnections: () => null,
  loadActivities: () => null,
  loadAreaConfig: () => null,
  loadMyFavourites: () => null,
};

HomeScene.propTypes = {
  authUser: PropTypes.object.isRequired,
  membership: PropTypes.object.isRequired,
  authUserId: PropTypes.string.isRequired,
  // areaPotions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  favouritesLoading: PropTypes.bool,
  activities: PropTypes.array,
  area: PropTypes.string,
  industry: PropTypes.string,
  areaList: PropTypes.array,
  loadConnections: PropTypes.func,
  loadActivities: PropTypes.func,
  loadAreaConfig: PropTypes.func,
  loadMyFavourites: PropTypes.func,
  loadNotifications: PropTypes.func.isRequired,
  loadInvitations: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  membership: selectAuthUserMembership,
  authUserId: selectAuthUserId,
  done: selectDone,
  isLoading: selectIsLoading,
  favouritesLoading: selectFavouritesLoading,
  area: selectArea,
  industry: selectIndustry,
  areaList: selectLocationAreaList,
  areaPotions: selectAreaOptions,
  activities: selectSortActivities,
});

const mapDispatchToProps = (dispatch) => ({
  loadActivities: (params) => dispatch(loadActivitiesAction(params)),
  loadAreaConfig: (params) => dispatch(loadAreaConfigAction(params)),
  loadConnections: () => dispatch(loadConnectionsAction()),
  loadMyFavourites: (params) => dispatch(loadMyFavouritesAction(params)),
  loadNotifications: () => dispatch(loadNotificationsAction()),
  loadInvitations: () => dispatch(loadInvitationsAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'homeScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  connectionReducer,
  favouritesWithReducer,
  newsReducer,
  ...withSagas,
  ...connectionSagas,
  ...favouritesSagas,
  ...newsSagas,
  withConnect,
)(HomeScene);
