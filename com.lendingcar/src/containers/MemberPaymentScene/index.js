/**
 *
 * MemberPaymentScene Container
 *
 */
/* global translate window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import {
  Container,
  Content,
  View,
  CheckBox,
  Text,
  Button,
  Radio,
} from 'native-base';

import { notificationLink } from 'utils/helpers';
import { DOCUMENT_URL } from 'utils/constants';

import AppHeader from 'components/AppHeader';
import MemberCardComponent from 'components/MemberCard';

import { PAYMENT_METHODS } from './constants';
import styles from './styles';

export class MemberPaymentScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      activeCheckBox: 0,
      isAgree: false,
    };
  }
  changeIsAgree = () => {
    const { isAgree } = this.state;
    this.setState({ isAgree: !isAgree });
  }
  changeCheckoutBox = (index) => {
    this.setState({
      activeCheckBox: index,
    });
  }
  nextPage = () => {
    const { memberCardInfo } = this.props;
    const { activeCheckBox, isAgree } = this.state;
    if (isAgree) {
      Actions.push('paymentMethod', {
        memberCardInfo,
        paymentMethod: activeCheckBox,
      });
    } else {
      window.toast(translate('agreePrompt'));
    }
  }
  renderMethodsList = () => {
    const { activeCheckBox } = this.state;
    return PAYMENT_METHODS.map((item, index) => (
      <View key={item.describe} style={styles.listItem}>
        <View style={styles.leftView}>
          <Image source={item.icon} style={item.style} />
          <Text style={styles.describe}>
            {translate(item.describe)}
          </Text>
        </View>
        <CheckBox
          checked={activeCheckBox === index}
          onPress={() => this.changeCheckoutBox(index)}
        />
      </View>
    ));
  }
  renderAgreement = () => {
    const { isAgree } = this.state;
    return (
      <View style={styles.membershipAgreementRow}>
        <Radio selected={isAgree} standardStyle onPress={this.changeIsAgree} />
        <Text style={styles.agreementText} onPress={() => notificationLink(DOCUMENT_URL.membership)}>
          {translate('membershipAgreement')}
        </Text>
      </View>
    );
  }
  renderButton = () => (
    <Button
      rounded
      style={styles.button}
      onPress={this.nextPage}
    >
      <Text style={styles.buttonText}>{translate('next')}</Text>
    </Button>
  )
  renderPaymentMethods = () => (
    <View style={styles.paymentMethodsWrapper}>
      { this.renderMethodsList() }
      { this.renderAgreement() }
      { this.renderButton() }
    </View>
  )
  render() {
    const { memberCardInfo } = this.props;

    return (
      <Container>
        <AppHeader title="orderPayment" />
        <Content
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
          scrollEnabled={false}
        >
          <MemberCardComponent {...memberCardInfo} />
          { this.renderPaymentMethods() }
        </Content>
      </Container>
    );
  }
}

MemberPaymentScene.defaultProps = {
};

MemberPaymentScene.propTypes = {
  memberCardInfo: PropTypes.object.isRequired,
};

export default MemberPaymentScene;
