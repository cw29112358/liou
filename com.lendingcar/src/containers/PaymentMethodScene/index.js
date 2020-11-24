/**
 *
 * PaymentMethodScene Container
 *
 */

/* global translate window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Image, Linking, Clipboard } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Button,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { updateMembershipAction } from 'containers/AppRouter/actions';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';
import SeperatorText from 'components/SeperatorText';


import PaymentForm from 'forms/PaymentForm';

import bitcoinsIcon from 'assets/bitcoins.png';
import ethereumIcon from 'assets/ethereum.png';

import { selectIsDone, selectPurchaseResult } from './selectors';
import { purchaseMembershipAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class PaymentMethodScene extends React.Component {
  componentWillMount() {
    this.initCoinbase();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  // creditCard
  onPurchaseMembership = (formMap) => {
    const { memberCardInfo, purchaseMembership } = this.props;
    const { level } = memberCardInfo;
    const formObj = formMap
      .set('level', level)
      .set('paymentMoneyText', 'creditCard')
      .toJS();
    purchaseMembership(formObj, this.onLinkToPaymentResult);
  }
  onLinkToHome = () => {
    Actions.reset('home');
  }
  onLinkToPaymentResult = (totalAmount) => {
    Actions.reset('paymentResult', {
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

    this.updateMembership();
  };

  // bitcoins + ethereum
  copyDownloadUrl = () => {
    Clipboard.setString(this.addresses);
    window.toast(translate('copySuccess'));
  }
  linkToDownloadUrl = () => {
    Linking.openURL(this.downloadUrl)
      .catch((err) => {
        console.log(err);
        window.toast('Crypto wallet not found.');
      });
  }
  updateMembershipSuccess = (membership) => {
    const { status } = membership;
    const pending = status === 'pending';
    const success = status === 'inactive';
    if (pending || success) {
      clearInterval(this.timer);
    }
    if (success) {
      this.onLinkToPaymentResult(this.localAmount);
    }
    if (pending) {
      this.onLinkToHome();
      window.toast(translate('orderProcessing'));
    }
  }
  updateMembership(onSuccess) {
    const { updateMembership } = this.props;
    updateMembership(onSuccess);
  }

  // init data
  initCoinbase() {
    const { paymentMethod, memberCardInfo, purchaseMembership } = this.props;
    if (paymentMethod === 0) return;

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.updateMembership(this.updateMembershipSuccess);
    }, 3000);

    const { level } = memberCardInfo;
    const formObj = {
      paymentMethod: 'coinbase',
      level,
    };
    purchaseMembership(formObj);
  }
  initDownloadUrl() {
    const { paymentMethod, purchaseResult } = this.props;
    const { addresses, pricing } = purchaseResult;
    if (!addresses) return;

    const keyMapping = {
      1: 'bitcoin',
      2: 'ethereum',
    };
    const key = keyMapping[paymentMethod];
    this.localAmount = pricing.local.amount;
    this.amount = pricing[key].amount;
    this.addresses = addresses[key];
    this.currency = pricing[key].currency;
    this.downloadUrl = `${key}:${addresses[key]}?amount=${this.amount}`;
  }

  renderChildren() {
    const { paymentMethod } = this.props;
    switch (paymentMethod) {
      case 0:
        return this.renderCreditCard();
      case 1:
      case 2:
        return this.renderOtherPayment();
      default:
        return null;
    }
  }
  renderCreditCard() {
    return (
      <PaymentForm onSubmit={this.onPurchaseMembership} />
    );
  }

  renderOtherPayment = () => {
    const { isDone, paymentMethod } = this.props;
    const imagesMapping = {
      1: bitcoinsIcon,
      2: ethereumIcon,
    };
    const image = imagesMapping[paymentMethod];
    if (isDone) this.initDownloadUrl();

    return (
      <View style={styles.wrapper}>
        <Image source={image} />
        {isDone && this.renderOtherPaymentContent()}
      </View>
    );
  }
  renderOtherPaymentContent = () => (
    <View>
      { this.renderPaymentMoney() }
      { this.renderCopyContent() }
      <SeperatorText
        label="maybe"
        showSeperate
        labelStyle={styles.labelStyle}
        seperatorStyle={styles.seperatorStyle}
      />
      { this.renderToPayButton() }
    </View>
  )
  renderPaymentMoney = () => (
    <View style={styles.paymentMoneyWrapper}>
      <Text style={styles.amountText}>{translate('amount')}</Text>
      <View style={styles.paymentMoney}>
        <Text style={[styles.amount, styles.paymentMoneyText]}>{this.amount}</Text>
        <Text style={[styles.paymentMoneyText]}>{this.currency}</Text>
        <Text style={styles.paymentMoneyText}>({translate(this.localAmount, 'dollar', styles.priceStyle, true)})</Text>
      </View>
    </View>
  )
  renderToPayButton() {
    return (
      <Button
        style={[styles.button, styles.payButton]}
        onPress={this.linkToDownloadUrl}
      >
        <Text style={styles.clickPay}>{translate('toPay')}</Text>
      </Button>
    );
  }
  renderCopyContent() {
    return (
      <View style={styles.copyContent}>
        <Text style={styles.toPayDescribe}>{translate(this.currency)}</Text>
        <Text style={styles.currencyAddress}>{this.currency} Address</Text>
        <View style={styles.copyButtonWrapper}>
          <Text
            style={styles.addresses}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {this.addresses}
          </Text>
          <Button
            transparent
            style={[styles.copyButton]}
            onPress={this.copyDownloadUrl}
          >
            <Text> {translate('copy')}</Text>
          </Button>
        </View>
      </View>
    );
  }

  render() {
    const { isDone, paymentMethod } = this.props;
    const titles = {
      0: 'creditCard',
      1: 'bitcoins',
      2: 'ethereum',
    };
    const headerTitle = titles[paymentMethod];

    return (
      <Container>
        <AppHeader title={headerTitle} />
        { !isDone && <Loader /> }

        <Content
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
          scrollEnabled={false}
        >
          { this.renderChildren() }
        </Content>
      </Container>
    );
  }
}

PaymentMethodScene.defaultProps = {
};

PaymentMethodScene.propTypes = {
  memberCardInfo: PropTypes.object.isRequired,
  paymentMethod: PropTypes.number.isRequired,
  isDone: PropTypes.bool.isRequired,
  purchaseResult: PropTypes.object.isRequired,
  updateMembership: PropTypes.func.isRequired,
  purchaseMembership: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isDone: selectIsDone,
  purchaseResult: selectPurchaseResult,
});

const mapDispatchToProps = (dispatch) => ({
  updateMembership: (onSuccess, onFail) => dispatch(updateMembershipAction(onSuccess, onFail)),
  purchaseMembership: (formObj, onSuccess) => dispatch(purchaseMembershipAction(formObj, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'paymentMethodScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(PaymentMethodScene);
