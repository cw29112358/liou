/**
 *
 * MemberPaymentScene Container
 *
 */
/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Image } from 'react-native';
import {
  View,
  CheckBox,
  Text,
  Button,
  // Radio,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import MemberCardComponent from 'components/MemberCard';
import FullScreenScene from 'components/FullScreenScene';

import {
  loadMembershipPriceAction,
} from './actions';
import {
  selectLoading,
  selectMemberShipPrice,
} from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import { PAYMENT_METHODS } from './constants';
import styles from './styles';

export class MemberPaymentScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      activeCheckBox: 0,
      // isAgree: false,
    };
  }
  componentWillMount() {
    const { loadMembershipPrice } = this.props;
    loadMembershipPrice();
  }

  // changeIsAgree = () => {
  //   const { isAgree } = this.state;
  //   this.setState({ isAgree: !isAgree });
  // }
  changeCheckoutBox = (index) => {
    this.setState({
      activeCheckBox: index,
    });
  }
  nextPage = () => {
    const { activeCheckBox } = this.state;
    Actions.push('paymentMethod', {
      paymentMethod: activeCheckBox,
    });
  }

  renderListItemRight = (isSupport, index) => {
    const { activeCheckBox } = this.state;
    if (isSupport) {
      return (
        <CheckBox
          checked={activeCheckBox === index}
          onPress={() => this.changeCheckoutBox(index)}
        />
      );
    }
    return <Text style={styles.noteText}>{translate('comingSoon')}</Text>;
  }
  renderMethodsList = () => PAYMENT_METHODS.map((item, index) => (
    <View key={item.describe} style={styles.listItem}>
      <View style={styles.leftView}>
        <Image source={item.icon} style={item.style} />
        <Text style={styles.describe}>
          {translate(item.describe)}
        </Text>
      </View>
      { this.renderListItemRight(item.isSupport, index)}
    </View>
  ))
  // renderAgreement = () => {
  //   // TODO: coming soon
  //   const { isAgree } = this.state;
  //   return (
  //     <View style={styles.membershipAgreementRow}>
  //       <Radio selected={isAgree} standardStyle onPress={this.changeIsAgree} />
  //       <Text style={styles.agreementText} onPress={() => notificationLink(DOCUMENT_URL.membership)}>
  //         {translate('membershipAgreement')}
  //       </Text>
  //     </View>
  //   );
  // }
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
      {/* { this.renderAgreement() } */}
      { this.renderButton() }
    </View>
  )
  render() {
    const { isLoading, membershipPrice } = this.props;
    let purchasePrice = 0;
    if (membershipPrice.plans) {
      purchasePrice = membershipPrice.plans.basic;
    }

    return (
      <FullScreenScene
        headerTitle="orderPayment"
        contentContainerStyle={styles.contentContainer}
        contentStyle={styles.content}
        scrollEnabled={false}
        isLoading={isLoading}
      >
        <MemberCardComponent membershipPrice={purchasePrice} />
        { this.renderPaymentMethods() }
      </FullScreenScene>
    );
  }
}

MemberPaymentScene.defaultProps = {
  isLoading: true,
  loadMembershipPrice: () => null,
};

MemberPaymentScene.propTypes = {
  membershipPrice: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  loadMembershipPrice: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectLoading,
  membershipPrice: selectMemberShipPrice,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  loadMembershipPrice: (params) => dispatch(loadMembershipPriceAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'memberPaymentScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MemberPaymentScene);
