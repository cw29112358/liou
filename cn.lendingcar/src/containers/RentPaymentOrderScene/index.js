/**
 *
 * MemberPaymentScene Container
 *
 */

/* global translate */

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
  View,
  Icon,
} from 'native-base';
import { Image } from 'react-native';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import AppHeader from 'components/AppHeader';
import RentPaymentOrderCardComponent from './component/RentPaymentOrderCardComponent';

import alipayImage from './assets/alipay.png';
import checkImage from './assets/check.png';
import { selectIsDone } from './selectors';
import { RentPaymentAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class RentPaymentOrderScene extends React.Component { // eslint-disable-line
  state = {
    paymentMethod: 'alipay',
  }

  onRentPaymentOrder = () => {
    const { RentPaymentOrderCardInfo, RentPaymentOrder } = this.props;
    const { paymentMethod } = this.state;
    const { bookingObj } = RentPaymentOrderCardInfo;

    const formObj = {
      paymentMethod,
      ...bookingObj,
    };
    const onSuccess = (totalAmount) => {
      Actions.reset('paymentResult', {
        checkImage,
        textLabel: 'RentPaymentOrderSuccess',
        textStyle: styles.resultText,
        price: totalAmount,
        bottomLineStyle: styles.resultBottomLine,
        options: [
          {
            rounded: true,
            label: 'backToHome',
            onPress: this.onLinkToHome,
          },
        ],
      });
    };
    RentPaymentOrder(formObj, onSuccess);
  }
  onLinkToHome = () => {
    Actions.reset('rent');
  }

  renderPaymentWays = () => (
    <View style={styles.paymentBox}>
      <View style={styles.paymentView}>
        <View style={styles.paymentTextView}>
          <Image style={styles.alipayImage} source={alipayImage} />
          <Text style={styles.paymentText}>{translate('alipay')}</Text>
        </View>
        <Icon name="md-checkmark-circle" style={styles.paymentIcon} />
      </View>
      <Text style={styles.paymentTip}>{translate('paymentWayTip')}</Text>
    </View>
  )
  renderPaymentContent = (RentPaymentOrderCardInfo) => (
    <Content
      contentContainerStyle={styles.contentContainer}
      style={styles.content}
      scrollEnabled={false}
    >
      {/* 需要修改会员与否的颜色 */}
      <RentPaymentOrderCardComponent {...RentPaymentOrderCardInfo} />
      { this.renderPaymentWays() }
      <Button
        rounded
        style={styles.button}
        onPress={this.onRentPaymentOrder}
      >
        <Text style={styles.buttonText}>{translate('confirmPayment')}</Text>
      </Button>
    </Content>
  )

  render() {
    const { RentPaymentOrderCardInfo } = this.props;
    return (
      <Container>
        <AppHeader title="orderPayment" />
        { this.renderPaymentContent(RentPaymentOrderCardInfo)}
      </Container>
    );
  }
}

RentPaymentOrderScene.defaultProps = {
  RentPaymentOrderCardInfo: {},
};

RentPaymentOrderScene.propTypes = {
  RentPaymentOrderCardInfo: PropTypes.object,
  isDone: PropTypes.bool.isRequired,
  RentPaymentOrder: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isDone: selectIsDone,
});

const mapDispatchToProps = (dispatch) => ({
  RentPaymentOrder: (formObj, onSuccess) => dispatch(RentPaymentAction(formObj, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'RentPaymentOrderScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(RentPaymentOrderScene);
