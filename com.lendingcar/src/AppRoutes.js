/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// react && redux module
import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Router,
  Scene,
} from 'react-native-router-flux';

import EntryScene from 'containers/EntryScene';
import LoginScene from 'containers/LoginScene';
import SignUpScene from 'containers/SignUpScene';
import ForgetPasswordScene from 'containers/ForgetPasswordScene';
import ChangePasswordScene from 'containers/ChangePasswordScene';
import HomeScene from 'containers/HomeScene';
import SettingScene from 'containers/SettingScene';
import FaqScene from 'containers/FaqScene';
import InventoryScene from 'containers/InventoryScene';
import InventoryCarScene from 'containers/InventoryCarScene';
import BookingDetailsScene from 'containers/BookingDetailsScene';
import DriverScene from 'containers/DriverScene';
import ProfileScene from 'containers/ProfileScene';
import TripDetailScene from 'containers/TripDetailScene';
import TripScene from 'containers/TripScene';
import MyNewsScene from 'containers/MyNewsScene';

import AgentScene from 'containers/AgentScene';
import BalanceScene from 'containers/BalanceScene';
import WithdrawalScene from 'containers/WithdrawalScene';
import WithdrawalDetailsScene from 'containers/WithdrawalDetailsScene';
import IncomeDetailsScene from 'containers/IncomeDetailsScene';

import MemberScene from 'containers/MemberScene';
import MemberPaymentScene from 'containers/MemberPaymentScene';
import PaymentResultScene from 'containers/PaymentResultScene';
import MemberBenefitScene from 'containers/MemberBenefitScene';

import CardPackageScene from 'containers/CardPackageScene';
import CardDetailScene from 'containers/CardDetailScene';
import CardChargeScene from 'containers/CardChargeScene';
import CardCouponsScene from 'containers/CardCouponsScene';

import CalendarModal from 'containers/InventoryCarScene/components/CalendarModal';
import SettingSceneFeedBack from 'containers/SettingScene/components/SettingSceneFeedBack';
import ModalScene from 'components/ModalScene';
import PaymentMethodScene from 'containers/PaymentMethodScene';
import FavouriteCarScene from 'containers/FavouriteCarScene';

import VersionScene from 'containers/VersionScene';
import WebViewScene from 'containers/WebViewScene';
import AppointmentScene from 'containers/AppointmentScene';
import FreeCarScene from 'containers/FreeCarScene';
import AppointmentSuccessScene from 'containers/AppointmentSuccessScene';
import BookingReviewScene from 'containers/BookingReviewScene';
import ApplyLoanScene from 'containers/ApplyLoanScene';

import ChangeLanguageScene from 'containers/ChangeLanguageScene';
import UserInfoScene from 'containers/UserInfoScene';
import CustomerDetailScene from 'containers/CustomerDetailScene';

export default function AppRoutes(props) {
  const { initialKey } = props;
  const prefix = 'lendingCar';
  return (
    <Router uriPrefix={prefix}>
      <Stack key="root" hideNavBar>
        <Scene key="entry" path="entry" component={EntryScene} initial={initialKey === 'entry'} />
        <Scene key="login" component={LoginScene} />
        <Scene key="signUp" component={SignUpScene} />
        <Scene key="forgetPassword" component={ForgetPasswordScene} />
        <Scene key="changePassword" component={ChangePasswordScene} />

        <Scene key="home" component={HomeScene} initial={initialKey === 'home'} />
        <Scene key="setting" component={SettingScene} />
        <Scene key="faq" component={FaqScene} />
        <Scene key="inventory" component={InventoryScene} />
        <Scene key="inventoryCar" path="inventoryCar/:carId" component={InventoryCarScene} />
        <Scene key="bookingDetails" component={BookingDetailsScene} panHandlers={null} />

        <Scene key="profile" component={ProfileScene} />
        <Scene key="trip" component={TripScene} />
        <Scene key="tripDetail" path="tripDetail/:id" component={TripDetailScene} />
        <Scene key="driver" component={DriverScene} />
        <Scene key="myNews" path="/myNews" component={MyNewsScene} />

        <Scene key="agent" component={AgentScene} />
        <Scene key="balance" component={BalanceScene} />
        <Scene key="withdrawal" component={WithdrawalScene} />
        <Scene key="withdrawalDetails" component={WithdrawalDetailsScene} />
        <Scene key="incomeDetails" component={IncomeDetailsScene} />

        <Scene key="member" component={MemberScene} />
        <Scene key="memberPayment" component={MemberPaymentScene} />
        <Scene key="paymentResult" component={PaymentResultScene} panHandlers={null} />

        <Scene key="carCalendarModal" component={CalendarModal} panHandlers={null} />
        <Scene key="settingSceneFeedBack" component={SettingSceneFeedBack} panHandlers={null} />
        <Scene key="modal" path="modal" component={ModalScene} panHandlers={null} />

        <Scene key="cardPackage" component={CardPackageScene} />
        {/* <Scene key="cardHome" component={CardHomeScene} /> */}
        <Scene key="cardDetail" component={CardDetailScene} />
        <Scene key="cardCharge" component={CardChargeScene} />
        <Scene key="cardCoupons" component={CardCouponsScene} panHandlers={null} />

        <Scene key="paymentMethod" component={PaymentMethodScene} />
        <Scene key="favouriteCar" component={FavouriteCarScene} />
        <Scene key="version" component={VersionScene} />
        <Scene key="memberBenefit" component={MemberBenefitScene} />
        <Scene key="webView" component={WebViewScene} />
        <Scene key="appointment" component={AppointmentScene} panHandlers={null} />
        <Scene key="freeCar" component={FreeCarScene} />
        <Scene key="appointmentSuccess" component={AppointmentSuccessScene} />
        <Scene key="bookingReview" component={BookingReviewScene} panHandlers={null} />
        <Scene key="applyLoan" component={ApplyLoanScene} />

        <Scene key="changeLanguage" component={ChangeLanguageScene} />
        <Scene key="userInfo" component={UserInfoScene} />
        <Scene key="customerDetail" component={CustomerDetailScene} />
      </Stack>
    </Router>
  );
}

AppRoutes.propTypes = {
  initialKey: PropTypes.string.isRequired,
};
