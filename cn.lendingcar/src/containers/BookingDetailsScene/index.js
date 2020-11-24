/**
 *
 * BookingDetailsScene Container
 *
 */
/* global translate window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  PanResponder,
  Animated,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Icon,
  Switch,
  View,
  Text,
} from 'native-base';
import moment from 'moment';

import { brand } from 'commonColor';

import { openURLByLinking } from 'utils/helpers';
import {
  DATE_FORMAT,
  SERVICE_TEL_SPLIT,
  SERVICE_TEL,
} from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import auth from 'utils/auth';

import { selectGetCarInfo } from 'containers/InventoryCarScene/selectors';
import { selectAuthUserMembership, selectAuthUserInfo } from 'containers/AppRouter/selectors';
import {
  withReducer as tripSceneReducer,
  withSagas as tripSceneWithSagas,
} from 'containers/TripScene';

import AppHeader from 'components/AppHeader';
import CarInfo from 'components/CarInfo';
import InfoList from 'components/InfoList';
import DivisionLine from 'components/DivisionLine';
import EmptyList from 'components/EmptyList';
import BookingFooter from 'components/BookingFooter';
import Loader from 'components/Loader';
import DetailsModal from 'components/DetailsModal';

import {
  selectBookingData,
  selectIsDone,
} from './selectors';
import { makeBookingAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';
import checkImage from './assets/check.png';

export class BookingDetailsScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      needInsurance: true,
      acceptManual: true,
      headerOpacity: new Animated.Value(0),
    };
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const currentOffset = new Animated.ValueXY();
        currentOffset.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const X = gestureState.dx;
        const createX = gestureState.x0;
        if (createX < 20 && X > 50) {
          Actions.popTo('inventoryCar');
        }
      },
      onPanResponderTerminate: () => null,
      onShouldBlockNativeResponder: () => false,
      onStartShouldSetResponderCapture: () => true,
    });
    this.getLeaseType();
  }
  //  从storage获取leaseType
  async getLeaseType() {
    const result = await auth.getLeaseType();
    this.setState({ leaseType: result });
  }
  onScroll = (event) => {
    const { headerOpacity } = this.state;
    const scrollY = event.nativeEvent.contentOffset.y;

    Animated.timing(headerOpacity, {
      toValue: scrollY,
      duration: 50,
    }).start();
  }
  onToggleInsurance = (needInsurance) => {
    this.setState({ needInsurance });
  }
  toggleAcceptManual = (acceptManual) => {
    this.setState({ acceptManual });
  }
  // 询问是否确定预定支付弹窗
  onPayment = (price) => {
    window.alert(
      'confirmBooking',
      'confirmBookingText',
      [
        {
          text: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => this.onBooking(price),
        },
      ],
    );
  }
  // 预定事件
  onBooking = (price) => {
    const {
      pickDate,
      bookingData,
      makeBooking,
      rentInfo,
      rentCarInfo,
      authUserMembership,
      selectedDealerental,
    } = this.props;
    const { needInsurance, acceptManual, leaseType } = this.state;
    const { pickupTime, returnTime } = rentInfo;
    const { id } = rentCarInfo;
    const { isMembership } = authUserMembership; // 该用户是否为会员
    const returnDate = moment(new Date(returnTime)).add(12, 'months').format(DATE_FORMAT);
    const formObj = {
      isMembership,
      originalPrice: (price.originalPrice * 7.19).toFixed(2),
      bookingFee: (price.rentPrice * 7.19).toFixed(2), // 美元换人民币汇率按 7.19 计算 use in prod
      // bookingFee: 0.01, // use in test
    };
    let bookingObj; // 传入booking接口的参数
    if (leaseType === 'lease') {
      bookingObj = {
        ...bookingData,
        pickupDate: pickDate,
        returnDate,
        needInsurance,
        leaseType,
      };
    } else {
      bookingObj = {
        vehicleId: id,
        originalPrice: price.originalPrice * 7.19,
        bookingFee: price.rentPrice * 7.19, // 美元换人民币汇率按 7.19 计算 use in prod
        // bookingFee: 0.01, // use in test
        pickupDate: pickupTime,
        returnDate: returnTime,
        needInsurance,
        acceptManual,
        leaseType,
        deposit: selectedDealerental.deposit,
        paymentMethod: 'alipay',
      };
    }
    // 预定
    makeBooking(bookingObj, leaseType === 'lease' ? this.onBookingSuccess : () => this.onRentBookingSuccess(formObj));
  }
  onRentBookingSuccess = (bookingObj) => {
    Actions.push('rentPaymentOrder', {
      RentPaymentOrderCardInfo: {
        bookingObj,
      },
    });
  };
  onBookingSuccess = () => {
    Actions.reset('paymentResult', {
      checkImage,
      textLabel: 'bookingSuccess',
      textStyle: styles.paymentResultText,
      title: 'bookingResults',
      price: 0,
      options: [
        {
          rounded: true,
          label: 'checkBooking',
          onPress: () => this.resetTo('trip'),
        },
        {
          rounded: true,
          label: 'home',
          transparent: true,
          onPress: () => this.resetTo('home'),
        },
      ],
    });
  }
  linkToDriver = () => {
    Actions.push('driver');
  }
  linkToDatailsModal = (headTitle, contentText) => {
    Actions.modal({
      children: <DetailsModal
        headTitle={headTitle}
        contentText={contentText}
      />,
    });
  }
  resetTo = (link) => {
    Actions.replace(link, { backToHome: true });
  }

  getHeaderStyles = () => {
    const { headerOpacity } = this.state;
    const shadowOpacity = headerOpacity.interpolate({
      inputRange: [0, 50, 51],
      outputRange: [0, 0, 1],
    });
    const elevation = headerOpacity.interpolate({
      inputRange: [0, 50, 10000],
      outputRange: [0, 3, 3],
    });
    return {
      shadowOpacity,
      elevation,
    };
  }

  renderPickupList(pickDate, bookingData) {
    const { acceptManual, leaseType } = this.state;
    let list;
    if (leaseType === 'rent') {
      const { rentInfo, selectedDealerental } = this.props;
      const {
        dealer: {
          address1, address2, city, state, zip,
        },
      } = selectedDealerental;
      const {
        pickupTime, returnTime,
      } = rentInfo;
      list = [
        {
          keyLabel: 'rentPickupDate',
          valueText: pickupTime,
        },
        {
          keyLabel: 'rentReturnDate',
          valueText: returnTime,
        },
        {
          keyLabel: 'day',
          valueText: Math.ceil(moment(new Date(returnTime)).diff(moment(new Date(pickupTime)), 'day', true)),
        },
        {
          keyLabel: 'rentPickupAddress',
          rightChildren: (<Text style={styles.addressText}>{`${address1} ${address2}, ${city}, ${state} ${zip}`}</Text>),
        },
        {
          keyLabel: 'rentReturnAddress',
          rightChildren: (<Text style={styles.addressText}>{`${address1} ${address2}, ${city}, ${state} ${zip}`}</Text>),
        },
        {
          keyLabel: 'isAcceptManual',
          rightChildren: (
            <Switch
              onTintColor={brand}
              value={acceptManual}
              style={styles.switchButton}
              onValueChange={this.toggleAcceptManual}
            />
          ),
        },
      ];
    } else {
      list = [
        {
          keyLabel: 'selectPickupDate',
          hasRightArrow: true,
          valueText: moment(new Date(pickDate)).format('YYYY-MM-DD'),
          onPress: () => Actions.pop(),
        },
        {
          keyLabel: 'months',
          valueText: bookingData.term,
        },
      ];
    }

    // 是否是送货上门
    const isDelivery = bookingData.pickupMode === 'delivery';
    let addArr;
    if (isDelivery) {
      addArr = [
        {
          keyLabel: 'region',
          valueText: translate(bookingData.area),
        },
        {
          keyLabel: 'detailConsult',
          rightChildren: (
            <Text
              style={styles.telText}
              onPress={() => openURLByLinking(`tel:${SERVICE_TEL}`, 'notSupportPhoneUrl')}
            >
              {SERVICE_TEL_SPLIT}
            </Text>
          ),
        },
      ];
    } else {
      addArr = [
        {
          keyLabel: 'adress',
          valueText: bookingData.pickupAddress1,
        },
        {
          keyLabel: 'city',
          valueText: `${bookingData.pickupCity}, ${bookingData.pickupState}`,
        },
      ];
    }
    if (leaseType === 'lease') {
      list = list.concat(addArr);
    }

    return (
      <InfoList
        titleLabel="pickUpAndReturnTitle"
        list={list}
      />
    );
  }
  renderPriceList(bookingData) {
    const { needInsurance, leaseType } = this.state;
    const { rentInfo, selectedDealerental, authUserMembership } = this.props;
    const { isMembership } = authUserMembership;
    const { membershipRate, deposit, rate } = selectedDealerental;
    const { pickupTime, returnTime } = rentInfo;
    let list;
    if (leaseType === 'rent') {
      list = [
        {
          keyLabel: 'monovalent',
          valueText: `$${isMembership ? Math.round(membershipRate) : rate}/${translate('day')}`,
        },
        {
          keyLabel: 'depositTips',
          valueText: deposit ? `$${deposit}` : translate('offlineStore'),
        },
        {
          keyLabel: 'allPaidMoney',
          valueText: `$${isMembership ? membershipRate * Math.ceil(moment(new Date(returnTime)).diff(moment(new Date(pickupTime)), 'day', true)) : rate * Math.ceil(moment(new Date(returnTime)).diff(moment(new Date(pickupTime)), 'day', true))}`,
        },
        {
          children: <DivisionLine />,
          itemStyle: styles.divisionLineItem,
        },
        {
          keyLabel: 'needInsurance',
          leftIcon: <Icon
            style={styles.questionIcon}
            name="question"
            type="SimpleLineIcons"
            onPress={() => this.linkToDatailsModal('insuranceTitle', 'insuranceText')}
          />,
          rightChildren: (
            <Switch
              style={styles.switchButton}
              onTintColor={brand}
              value={needInsurance}
              onValueChange={this.onToggleInsurance}
            />
          ),
        },
      ];
    } else {
      list = [
        {
          keyLabel: 'downPayment',
          rightChildren: translate(0, 'dollar', {
            priceText: styles.priceText,
            dollarUnit: styles.priceText,
          }),
        },
        {
          keyLabel: 'monthlyPayment',
          rightChildren: translate(0, 'dollar', {
            priceText: styles.priceText,
            dollarUnit: styles.priceText,
          }),
        },
        {
          keyLabel: 'deposit',
          rightChildren: translate(bookingData.deposit, 'dollar', {
            priceText: styles.priceText,
            dollarUnit: styles.priceText,
          }),
        },
        {
          children: <DivisionLine />,
          itemStyle: styles.divisionLineItem,
        },
        {
          keyLabel: 'feeDue',
          leftIcon: <Icon
            style={styles.questionIcon}
            name="question"
            type="SimpleLineIcons"
            onPress={() => this.linkToDatailsModal('holdFeeTitle', 'holdFeeText')}
          />,
          rightChildren: translate(bookingData.bookingFee, 'dollar', {
            priceText: styles.orangeText,
            dollarUnit: styles.orangeText,
          }),
        },
        {
          children: <DivisionLine />,
          itemStyle: styles.divisionLineItem,
        },
        {
          keyLabel: 'needInsurance',
          leftIcon: <Icon
            style={styles.questionIcon}
            name="question"
            type="SimpleLineIcons"
            onPress={() => this.linkToDatailsModal('insuranceTitle', 'insuranceText')}
          />,
          rightChildren: (
            <Switch
              style={styles.switchButton}
              onTintColor={brand}
              value={needInsurance}
              onValueChange={this.onToggleInsurance}
            />
          ),
        },
      ];
    }


    return (
      <InfoList
        titleLabel="priceTitle"
        list={list}
        hasShadow
      />
    );
  }
  renderDriverList(driverForm) {
    const list = driverForm
      ? [
        {
          keyLabel: 'driverName',
          valueText: `${driverForm.firstName} ${driverForm.lastName}`,
        },
        {
          keyLabel: 'license',
          valueText: `${driverForm.driverLicenseNum}`,
        },
        {
          keyLabel: 'phone',
          valueText: `${driverForm.phoneNumber}`,
        },
      ]
      : [
        {
          children: <EmptyList
            label="addDriver"
            imageViewStyle={styles.imageViewStyle}
            activeOpacity={0.5}
            onPressFunc={this.linkToDriver}
          />,
        },
      ];

    return (
      <InfoList
        titleLabel="driverTitle"
        titleIcon="pencil-square-o"
        iconType="FontAwesome"
        openTitleModal={this.linkToDriver}
        list={list}
      />
    );
  }
  renderContractList() {
    const children = (
      <View style={styles.contractContent}>
        <View style={styles.outCircle}>
          <View style={styles.innerCircle} />
        </View>
        <Text style={styles.contractText}>
          {translate('contractText')}
          <Text style={styles.viewMore}>{translate('viewMore')}</Text>
        </Text>
      </View>
    );
    const list = [
      {
        children,
      },
    ];
    return (
      <InfoList
        titleLabel="contractTitle"
        list={list}
      />
    );
  }
  renderContent() {
    const { leaseType } = this.state;
    const {
      carInfo, pickDate, bookingData, rentCarInfo,
      authUser: { drivers: [driverForm] },
    } = this.props;
    let car;
    if (leaseType === 'lease') {
      car = carInfo;
    } else {
      car = rentCarInfo;
    }

    return (
      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.content}
        scrollEventThrottle={1}
        onScroll={this.onScroll}
        bounces={false}
      >
        <CarInfo carInfo={car}>
          {this.renderPickupList(pickDate, bookingData)}
          {this.renderPriceList(bookingData)}
          {this.renderDriverList(driverForm)}
          {/* { this.renderContractList() } */}
        </CarInfo>
      </Animated.ScrollView>
    );
  }

  renderHeader = () => {
    const headerStyle = [
      styles.header,
      this.getHeaderStyles(),
    ];
    return (
      <Animated.View style={headerStyle}>
        <AppHeader
          hiddenBoreder
          hasShadow={false}
          title="bookingDetailsHeader"
          hasRight={false}
        // leftPress={() => Actions.popTo('inventoryCar')}
        />
      </Animated.View>
    );
  }
  renderFooter = () => {
    const {
      authUser: { drivers: [driverForm] }, rentInfo, selectedDealerental, authUserMembership, bookingData,
    } = this.props;
    const { isMembership } = authUserMembership; // 该用户是否为会员
    const disabled = !driverForm || !driverForm.id;
    const { leaseType } = this.state; // 短租 or 长租
    const { membershipRate, rate } = selectedDealerental; // 会员价和非会员价
    const { pickupTime, returnTime } = rentInfo;
    // 预定天数
    const bookingDays = Math.ceil(moment(new Date(returnTime)).diff(moment(new Date(pickupTime)), 'day', true));
    // 短租会员价格
    const rentPrice = isMembership
      ? Math.round(membershipRate) * bookingDays
      : rate * bookingDays;
    // 短租非会员价格
    const originalPrice = rate * bookingDays;
    const price = { rentPrice, originalPrice };
    // 长租价格
    const leasePrice = bookingData.rate;
    // 预定订单数据
    return (
      <BookingFooter
        bookingPrice={leaseType === 'rent' ? rentPrice : leasePrice}
        buttonPress={() => this.onPayment(price)}
        buttonLabel="payment"
        disabled={disabled}
      />
    );
  }

  render() {
    const { isDone } = this.props;
    return (
      <Container>
        {!isDone && <Loader />}
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </Container>
    );
  }
}

BookingDetailsScene.defaultProps = {
  rentCarInfo: {},
  rentInfo: {},
  authUserMembership: {},
  selectedDealerental: {},
};

BookingDetailsScene.propTypes = {
  pickDate: PropTypes.string.isRequired,
  authUser: PropTypes.object.isRequired,
  isDone: PropTypes.bool.isRequired,
  carInfo: PropTypes.object.isRequired,
  bookingData: PropTypes.object.isRequired,
  makeBooking: PropTypes.func.isRequired,
  rentCarInfo: PropTypes.object,
  rentInfo: PropTypes.object,
  authUserMembership: PropTypes.object,
  selectedDealerental: PropTypes.object,
  // loadInventory: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  isDone: selectIsDone,
  carInfo: selectGetCarInfo,
  bookingData: selectBookingData,
  authUserMembership: selectAuthUserMembership,
});

const mapDispatchToProps = (dispatch) => ({
  makeBooking: (bookingObj, onSuccess) => dispatch(makeBookingAction(bookingObj, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bookingDetailsScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  tripSceneReducer,
  ...tripSceneWithSagas,
  ...withSagas,
  withConnect,
)(BookingDetailsScene);
