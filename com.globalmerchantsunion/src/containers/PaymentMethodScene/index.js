/**
 *
 * PaymentMethodScene Container
 *
 */

// /* global translate window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { updateMembershipAction } from 'containers/AppRouter/actions';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';

import PaymentForm from 'forms/PaymentForm';

import { selectIsDone, selectPurchaseResult } from './selectors';
import { purchaseMembershipAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class PaymentMethodScene extends React.Component {
  // creditCard
  onPurchaseMembership = (formMap) => {
    const { purchaseMembership } = this.props;
    const formObj = formMap
      .set('paymentMoneyText', 'creditCard')
      .toJS();
    purchaseMembership(formObj, this.onLinkToPaymentResult);
  }
  onLinkToHome = () => {
    Actions.reset('tabbar');
  }
  onLinkToPaymentResult = (actualAmount) => {
    Actions.reset('paymentResult', {
      textLabel: 'memberPaymentSuccess',
      textStyle: styles.resultText,
      price: actualAmount,
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
  updateMembership(onSuccess) {
    const { updateMembership } = this.props;
    updateMembership(onSuccess);
  }

  renderChildren = () => (
    <PaymentForm
      onSubmit={this.onPurchaseMembership}
      style={styles.formStyle}
    />
  )

  render() {
    const { isDone } = this.props;

    return (
      <Container>
        <AppHeader title="creditCard" />
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
  isDone: PropTypes.bool.isRequired,
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
