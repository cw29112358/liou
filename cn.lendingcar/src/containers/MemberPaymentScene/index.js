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
import MemberCardComponent from 'components/MemberCard';

import alipayImage from './assets/alipay.png';
import checkImage from './assets/check.png';
import { selectIsDone } from './selectors';
import { purchaseMembershipAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class MemberPaymentScene extends React.Component { // eslint-disable-line
  state = {
    paymenMethod: 'alipay',
  }

  onPurchaseMembership = () => {
    const { memberCardInfo, purchaseMembership } = this.props;
    const { paymenMethod } = this.state;
    const { level, paymentAmount } = memberCardInfo;

    const formObj = {
      level,
      paymentAmount,
      paymenMethod,
    };
    const onSuccess = (totalAmount) => {
      Actions.reset('paymentResult', {
        checkImage,
        textLabel: 'memberPaymentSuccess',
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
    purchaseMembership(formObj, onSuccess);
  }
  onLinkToHome = () => {
    Actions.reset('home');
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
  renderPaymentContent = (memberCardInfo) => (
    <Content
      contentContainerStyle={styles.contentContainer}
      style={styles.content}
      scrollEnabled={false}
    >
      <MemberCardComponent {...memberCardInfo} />
      { this.renderPaymentWays() }
      <Button
        rounded
        style={styles.button}
        onPress={this.onPurchaseMembership}
      >
        <Text style={styles.buttonText}>{translate('confirmPayment')}</Text>
      </Button>
    </Content>
  )

  render() {
    const { memberCardInfo } = this.props;
    return (
      <Container>
        <AppHeader title="orderPayment" />
        { this.renderPaymentContent(memberCardInfo)}
      </Container>
    );
  }
}

MemberPaymentScene.defaultProps = {
  memberCardInfo: {},
};

MemberPaymentScene.propTypes = {
  memberCardInfo: PropTypes.object,
  isDone: PropTypes.bool.isRequired,
  purchaseMembership: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isDone: selectIsDone,
});

const mapDispatchToProps = (dispatch) => ({
  purchaseMembership: (level, paymentAmount, onSuccess) => dispatch(purchaseMembershipAction(level, paymentAmount, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'MemberPaymentScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MemberPaymentScene);
