/**
 *
 * MemberScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Image,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { selectAuthUserMembership } from 'containers/AppRouter/selectors';
// import { selectArea } from 'containers/HomeScene/selectors';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';
import Mask from 'components/Mask';

import MemberCard from './components/MemberCard';
import PrivilegeList from './components/PrivilegeList';
import PrivilegeModal from './components/PrivilegeModal';

import ribbonImage from './assets/ribbon.png';
import supercarImage from './assets/supercar.png';
import truckRVImage from './assets/truckRV.png';
import freeImage from './assets/free.png';
import inspectionImage from './assets/inspection.png';
import dmvImage from './assets/dmv.png';
import rebateImage from './assets/rebate.png';
import discountImage from './assets/discount.png';
import subscriptionImage from './assets/subscription.png';
import fifteenPercentImage from './assets/fifteenPercent.png';
import clubImage from './assets/club.png';
import platinumImage from './assets/platinum.png';
import twentyPercentImage from './assets/twentyPercent.png';
import receiveImage from './assets/receive.png';
import airlineImage from './assets/airline.png';

import {
  selectLoading,
  selectCalculatedMemberShipPrice,
  selectUserCouponsStatus,
  selectSpecialActivity,
} from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class MemberScene extends React.Component {
  constructor(props) {
    super(props);
    const currentIndex = this.getLevelNumber();
    this.getCarGroupStatus(currentIndex);
    this.getAreaListSort();
    this.showAreaPrivilege = true;
    // 会员基础特权
    this.basicPrivilege = [
      [0, 1],
      [0, 1, 2, 3, 4, 5, 6],
      [0, 1, 2, 3, 7, 5, 4, 8, 9],
    ];

    this.state = {
      contentScroll: true,
      currentIndex,
      showPrivilegeModal: false,
      privilege: {},
    };
  }
  // 免费驾驶一年是否使用
  getUserMemberShipStatus = () => {
    const { authUserMembership: { isMembership, status } } = this.props;
    return (isMembership && status !== 'active') || !isMembership;
  }
  // 获取三大体验特权状态
  getCarGroupStatus = (currentIndex) => {
    const { userCoupons, authUserMembership: { isMembership } } = this.props;
    if (isMembership) {
      this.hasSuperCarTimes = userCoupons.supercar.unused !== 0 && currentIndex >= 1;
      this.hasPickupTimes = userCoupons.pickup.unused !== 0 && currentIndex >= 2;
    } else {
      this.hasSuperCarTimes = currentIndex >= 1;
      this.hasPickupTimes = currentIndex >= 2;
    }
  }
  // 根据体验是否使用过排序体验特权的顺序
  setAreaArray = () => {
    const listSort = [
      {
        label: this.getUserMemberShipStatus(),
        value: 0,
      }, {
        label: this.hasSuperCarTimes,
        value: 1,
      }, {
        label: this.hasPickupTimes,
        value: 2,
      },
    ];
    return sortBy(listSort, (item) => !item.label).map((item) => item.value);
  }
  getAreaListSort = () => {
    this.areaPrivilege = this.setAreaArray();
  }

  changeContentScroll = (contentScroll) => {
    this.setState({ contentScroll });
  }

  // 改变当前展示的会员卡等级
  setCurrentIndex = (currentIndex) => {
    this.setState({ currentIndex });
    this.getCarGroupStatus(currentIndex);
    this.getAreaListSort();
  }
  // 获取会员等级
  getLevelNumber = () => {
    const { authUserMembership: { isMembership, level } } = this.props;
    if (!isMembership) return 0;
    const levelObj = {
      basic: 0,
      premium: 1,
      deluxe: 2,
    };
    return levelObj[level] || 0;
  }

  // // 展示体验特权的区域
  // getShowArea = () => {
  //   const { area } = this.props;
  //   return ['losAngeles', 'bayArea'].includes(area);
  // }
  // 体验特权
  getAreaPrivilegeList = (pickArray = []) => {
    const list = [
      {
        image: freeImage,
        text: 'freeCar',
        onPress: this.linkToFreeCar,
        imageLabel: 'areaPrivilege3Tip',
        type: 'freeCar',
        hasCrown: this.getUserMemberShipStatus(),
      },
      {
        image: supercarImage,
        text: 'supercar',
        onPress: this.linkToAreaPrivilege,
        imageLabel: 'areaPrivilege1Tip',
        hasCrown: this.hasSuperCarTimes,
        type: 'supercar',
      },
      {
        image: truckRVImage,
        text: 'truckRV',
        onPress: this.linkToAreaPrivilege,
        imageLabel: 'areaPrivilege2Tip',
        hasCrown: this.hasPickupTimes,
        type: 'pickup',
      },
    ];
    return pickArray.map((i) => ({
      ...list[i],
    }));
  };
  // 基本特权
  getPrivilegeList = (pickArray = [], isGrey) => {
    const { currentIndex } = this.state;
    const list = [
      {
        image: dmvImage,
        text: 'dmvText',
        modalText: 'dmvModalText',
      },
      {
        image: inspectionImage,
        text: 'inspectionText',
        modalText: 'inspectionModalText',
      },
      {
        image: rebateImage,
        text: 'rebateText',
        modalText: 'rebateModalText',
      },
      {
        image: discountImage,
        text: 'discountText',
        modalText: 'discountModalText',
      },
      {
        image: subscriptionImage,
        text: 'subscriptionText',
        modalText: 'subscriptionModalText',
      },
      {
        image: currentIndex === 2 ? twentyPercentImage : fifteenPercentImage,
        text: 'fifteenPercentText',
        modalText: currentIndex === 2 ? 'twentyPercentModalText' : 'fifteenPercentModalText',
      },
      {
        image: clubImage,
        text: 'clubText',
        modalText: 'clubModalText',
      },
      {
        image: platinumImage,
        text: 'platinumText',
        modalText: 'platinumModalText',
      },
      {
        image: receiveImage,
        text: 'receiveText',
        modalText: 'receiveModalText',
      },
      {
        image: airlineImage,
        text: 'airlineText',
        modalText: 'airlineModalText',
      },
    ];
    return pickArray.map((i) => ({
      ...list[i],
      isGrey,
    }));
  };

  linkToAreaPrivilege = (privilege) => {
    const { authUserMembership, membershipPrice } = this.props;
    const { currentIndex } = this.state;
    Actions.push('memberBenefit', {
      authUserMembership,
      privilege,
      memberCardInfo: membershipPrice[currentIndex],
    });
  }
  linkToFreeCar = () => {
    const { membershipPrice, authUserMembership: { isMembership } } = this.props;
    const { currentIndex } = this.state;
    Actions.push('freeCar', {
      memberCardInfo: membershipPrice[currentIndex],
      isMembership,
    });
  }

  openPrivilegeModal = (privilege) => {
    this.setState({
      showPrivilegeModal: true,
      privilege,
    });
  }
  hidePrivilegeModal = () => {
    this.setState({ showPrivilegeModal: false });
  }

  // modal
  renderPrivilegeModal() {
    const { showPrivilegeModal, privilege } = this.state;

    return (
      <PrivilegeModal
        visible={showPrivilegeModal}
        onClose={this.hidePrivilegeModal}
        privilege={privilege}
      />
    );
  }

  renderMemberCard() {
    const { membershipPrice, specialActivity, authUserMembership: { isMembership } } = this.props;
    const { currentIndex } = this.state;

    return (
      <MemberCard
        list={membershipPrice}
        currentIndex={currentIndex}
        setCurrentIndex={this.setCurrentIndex}
        changeContentScroll={this.changeContentScroll}
        specialActivity={specialActivity}
        isMembership={isMembership}
      />
    );
  }
  renderRibbonImage() {
    return (
      <Image
        source={ribbonImage}
        resizeMode="contain"
        style={styles.ribbonImage}
      />
    );
  }
  renderMemberPrivilege = () => {
    const { currentIndex } = this.state;

    const pickArray = this.basicPrivilege[currentIndex];
    let list = this.getPrivilegeList(pickArray);
    if (this.showAreaPrivilege) {
      const areaList = this.getAreaPrivilegeList(this.areaPrivilege);
      list = areaList.concat(list);
    }

    return (
      <PrivilegeList
        list={list}
        onPress={this.openPrivilegeModal}
      />
    );
  }
  renderPaymentButton() {
    const {
      authUserMembership: { status, isMembership },
      membershipPrice,
    } = this.props;
    if (isMembership) return null;
    const { currentIndex } = this.state;

    const disabled = status === 'pending';
    const label = disabled ? 'orderProcessing' : 'buttonPrivilege';

    const buttonStyle = [styles.buttonPrivilege];
    if (disabled) buttonStyle.push(styles.disabledStyle);

    const textStyle = [styles.buttonText];
    if (disabled) textStyle.push(styles.disabledText);

    return (
      <Button
        rounded
        style={buttonStyle}
        onPress={() => Actions.push('memberPayment', {
          memberCardInfo: membershipPrice[currentIndex],
        })}
        disabled={disabled}
      >
        <Text style={textStyle}>{translate(label)}</Text>
      </Button>
    );
  }
  renderFooter() {
    const { authUserMembership: { isMembership } } = this.props;
    const { currentIndex } = this.state;
    const footerStyles = [styles.memberFooter];
    if (currentIndex >= 1 && isMembership) {
      footerStyles.push(styles.footerText);
    }
    if (currentIndex === 0) {
      footerStyles.push(styles.absoluteFooter);
    }
    return (
      <Text style={footerStyles}>{translate('memberFooter')}</Text>
    );
  }

  render() {
    const { isLoading } = this.props;
    const { contentScroll } = this.state;
    const { showPrivilegeModal, currentIndex } = this.state;
    const isDeluxe = currentIndex === 2;
    const viewStyle = [styles.content];
    if (isDeluxe) viewStyle.push(styles.containerYellowView);
    const containerView = isDeluxe ? styles.containerYellowView : styles.containerWhiteView;

    return (
      <Container>
        <AppHeader title="member" />

        <Content
          contentContainerStyle={styles.content}
          style={[{ flex: 1 }, containerView]}
          scrollEnabled={this.showAreaPrivilege && contentScroll}
        >
          { this.renderMemberCard() }
          { isDeluxe && this.renderRibbonImage() }
          { this.renderMemberPrivilege() }
          { this.showAreaPrivilege && this.renderFooter() }
        </Content>
        { this.renderPaymentButton() }

        { isLoading && <Loader />}
        { this.renderPrivilegeModal() }
        { showPrivilegeModal && <Mask />}
      </Container>
    );
  }
}

MemberScene.defaultProps = {
  userCoupons: null,
  specialActivity: [],
};

MemberScene.propTypes = {
  authUserMembership: PropTypes.object.isRequired,
  // area: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  membershipPrice: PropTypes.array.isRequired,
  userCoupons: PropTypes.object,
  specialActivity: PropTypes.array,
};

const mapStateToProps = createPropsSelector({
  authUserMembership: selectAuthUserMembership,
  // area: selectArea,
  isLoading: selectLoading,
  membershipPrice: selectCalculatedMemberShipPrice,
  userCoupons: selectUserCouponsStatus,
  specialActivity: selectSpecialActivity,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'memberScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MemberScene);
