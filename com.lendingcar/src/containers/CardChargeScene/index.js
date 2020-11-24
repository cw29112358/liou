/**
 *
 * CardChargeScene Container
 *
 */

// /* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
  // Text,
  View,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  loadCouponsAction,
} from 'containers/CardPackageScene/actions';
import {
  selectIsLoading as selectCardPackageLoading,
} from 'containers/CardPackageScene/selectors';
import {
  selectCard,
} from 'containers/CardDetailScene/selectors';
import AppHeader from 'components/AppHeader';
import PaymentForm from 'forms/PaymentForm';
import Loader from 'components/Loader';

import CardCharge from './components/CardCharge';
import { chargeCardAction } from './actions';
import { selectIsLoading } from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class CardChargeScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      contentScroll: true,
      currentIndex: 0,
    };
  }

  changeContentScroll = (contentScroll) => {
    this.setState({ contentScroll });
  }
  changeCurrentIndex = (currentIndex) => {
    this.setState({ currentIndex });
  }

  onChargeMembership = (formMap) => {
    const { chargeCard, card } = this.props;
    const { currentIndex } = this.state;
    const chargePlans = card.business.plans[currentIndex];
    const formObj = formMap
      .set('amount', chargePlans.amount)
      .set('card', card.id)
      .set('note', chargePlans.description)
      .toJS();
    chargeCard(formObj, this.onSuccess);
  }
  onLinkToHome = () => {
    Actions.reset('home');
  }
  onSuccess = () => {
    const { loadCoupons, card } = this.props;
    loadCoupons({ forceReload: true });
    Actions.push('cardCoupons', { business: card.business });
  };

  renderMemberCard = () => {
    const { card } = this.props;
    const { currentIndex } = this.state;
    return (
      <CardCharge
        list={card.business.plans}
        currentIndex={currentIndex}
        setCurrentIndex={this.changeCurrentIndex}
        changeContentScroll={this.changeContentScroll}
      />
    );
  }
  renderPaymentForm = () => (
    <View style={styles.formContainer}>
      <PaymentForm onSubmit={this.onChargeMembership} />
    </View>
  )

  render() {
    const { isLoading, packageLoading } = this.props;
    const { contentScroll, currentIndex } = this.state;
    const isDeluxe = currentIndex === 2;
    const viewStyle = [styles.content];
    if (isDeluxe) viewStyle.push(styles.containerYellowView);
    const containerView = isDeluxe ? styles.containerYellowView : styles.containerWhiteView;

    return (
      <Container>
        <AppHeader title="charge" />

        <Content
          contentContainerStyle={styles.content}
          style={[{ flex: 1 }, containerView]}
          scrollEnabled={contentScroll}
        >
          { this.renderMemberCard() }
          { this.renderPaymentForm() }
        </Content>
        { (isLoading || (isLoading && packageLoading)) && <Loader /> }
      </Container>
    );
  }
}

CardChargeScene.defaultProps = {
  packageLoading: false,
  isLoading: false,
  chargeCard: () => null,
  loadCoupons: () => null,
};

CardChargeScene.propTypes = {
  card: PropTypes.object.isRequired,
  packageLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
  chargeCard: PropTypes.func,
  loadCoupons: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  card: selectCard,
  isLoading: selectIsLoading,
  packageLoading: selectCardPackageLoading,
});

const mapDispatchToProps = (dispatch) => ({
  chargeCard: (formObj, onSuccess) => dispatch(chargeCardAction(formObj, onSuccess)),
  loadCoupons: (params) => dispatch(loadCouponsAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cardChargeScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(CardChargeScene);
