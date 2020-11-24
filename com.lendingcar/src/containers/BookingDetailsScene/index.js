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

import { momentFormat, openURLByLinking } from 'utils/helpers';
import {
  CALCULATE_DATE_FORMAT,
  SERVICE_TEL_SPLIT,
  SERVICE_TEL,
} from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { selectGetCarInfo } from 'containers/InventoryCarScene/selectors';
import { selectAuthUserInfo } from 'containers/AppRouter/selectors';
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

export class BookingDetailsScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      needInsurance: true,
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
      onShouldBlockNativeResponder: () => true,
    });
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
  onPayment = () => {
    window.alert(
      'confirmBooking',
      'confirmBookingText',
      [
        {
          text: 'cancel',
        },
        {
          text: 'confirm',
          onPress: this.onBooking,
        },
      ],
    );
  }
  onBooking = () => {
    const {
      pickDate, bookingData, makeBooking,
      // depositFinance,
    } = this.props;
    const { needInsurance } = this.state;

    const returnDate = moment(pickDate).add(12, 'months').format(CALCULATE_DATE_FORMAT);
    const bookingObj = {
      ...bookingData,
      // depositFinance,
      pickupDate: pickDate,
      returnDate,
      needInsurance,
    };
    makeBooking(bookingObj, this.onBookingSuccess);
  }
  onBookingSuccess = () => {
    Actions.reset('paymentResult', {
      title: 'bookingResults',
      textLabel: 'bookingSuccess',
      price: 0,
      options: [
        {
          rounded: true,
          label: 'trip',
          onPress: () => this.resetTo('trip'),
        },
        {
          rounded: true,
          label: 'home',
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
    const animatedCarStyles = {
      shadowOpacity,
      elevation,
    };
    return animatedCarStyles;
  }

  renderPickupList(pickDate, bookingData) {
    let list = [
      {
        keyLabel: 'selectPickupDate',
        hasRightArrow: true,
        valueText: momentFormat(pickDate),
        onPress: () => Actions.pop(),
      },
      {
        keyLabel: 'months',
        valueText: bookingData.term,
      },
    ];

    // 是否是送货上门
    const isDelivery = !bookingData.pickupZip;
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
              { SERVICE_TEL_SPLIT }
            </Text>
          ),
        },
      ];
    } else {
      addArr = [
        {
          keyLabel: 'address',
          valueText: bookingData.pickupAddress1,
        },
        {
          keyLabel: 'city',
          valueText: `${bookingData.pickupCity}, ${bookingData.pickupState}`,
        },
      ];
    }
    list = list.concat(addArr);

    return (
      <InfoList
        titleLabel="pickUpAndReturnTitle"
        list={list}
      />
    );
  }
  renderPriceList(bookingData) {
    const { needInsurance } = this.state;
    const list = [
      {
        keyLabel: 'downPayment',
        rightChildren: translate(0, 'dollar'),
      },
      {
        keyLabel: 'monthlyPayment',
        rightChildren: translate(0, 'dollar'),
      },
      {
        keyLabel: 'deposit',
        rightChildren: translate(bookingData.deposit, 'dollar'),
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
          <View style={styles.innerCircle}></View>
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
    const {
      carInfo, pickDate, bookingData,
      authUser: { drivers: [driverForm] },
    } = this.props;

    return (
      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.content}
        scrollEventThrottle={1}
        onScroll={this.onScroll}
        bounces={false}
      >
        <CarInfo carInfo={carInfo}>
          { this.renderPickupList(pickDate, bookingData) }
          { this.renderPriceList(bookingData) }
          { this.renderDriverList(driverForm) }
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
          leftPress={() => Actions.popTo('inventoryCar')}
        />
      </Animated.View>);
  }
  renderFooter = () => {
    const { authUser: { drivers: [driverForm] } } = this.props;
    const disabled = !driverForm || !driverForm.id;

    return (
      <BookingFooter
        buttonPress={this.onPayment}
        buttonLabel="payment"
        disabled={disabled}
      />
    );
  }

  render() {
    const { isDone } = this.props;
    return (
      <Container>
        { !isDone && <Loader /> }
        { this.renderHeader() }
        { this.renderContent()}
        { this.renderFooter() }
      </Container>
    );
  }
}

BookingDetailsScene.defaultProps = {
};

BookingDetailsScene.propTypes = {
  pickDate: PropTypes.string.isRequired,
  authUser: PropTypes.object.isRequired,
  isDone: PropTypes.bool.isRequired,
  carInfo: PropTypes.object.isRequired,
  bookingData: PropTypes.object.isRequired,
  // depositFinance: PropTypes.object.isRequired,
  makeBooking: PropTypes.func.isRequired,
  // loadInventory: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  isDone: selectIsDone,
  carInfo: selectGetCarInfo,
  bookingData: selectBookingData,
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
