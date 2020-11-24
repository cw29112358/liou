/**
 *
 * CardDetailScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  View,
  Text,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { selectLanguage } from 'containers/AppRouter/selectors';

import FullScreenScene from 'components/FullScreenScene';
import Button from 'components/Button';

import BusinessCard from './components/BusinessCard';
// import BusinessOption from './components/BusinessOption';
import CardMap from './components/CardMap';
import StoreList from './components/StoreList';
import {
  selectCard,
  selectStoreIndex,
} from './selectors';
import {
  setCardIdAction,
  setStoreIndexAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class CardDetailScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    if (props.card.id !== props.cardId) {
      props.setCardId(props.cardId);
    }
  }

  // onPressBusinessOption = (item) => {
  //   if (item.label === 'coupons') {
  //     Actions.push('cardCoupons');
  //   }
  // }
  onPressCoupons = () => {
    const { card } = this.props;
    Actions.push('cardCoupons', { business: card.business });
  }
  onPressCharge = () => {
    Actions.push('cardCharge');
  }
  onPressStore = (item, index) => {
    const { storeIndex, setStoreIndex } = this.props;
    if (index !== storeIndex) {
      setStoreIndex(index);
    }
  }

  /* render */
  // renderBusinessOption = (business) => (
  //   <BusinessOption
  //     business={business}
  //     coupons={business.balance}
  //     onSelect={this.onPressBusinessOption}
  //   />
  // )
  renderChargeButton = () => (
    <Button
      style={styles.chargeButton}
      onPress={this.onPressCharge}
      textLabel="charge"
      textStyle={styles.chargeButtonText}
    />
  )

  render() {
    const { card: { business, business: { stores } }, storeIndex, language } = this.props;
    const isShowChargeButton = business.plans && business.plans.length > 0;
    const buzDescription = language === 'en' || !business.descriptionCn ? business.description : business.descriptionCn;
    return (
      <FullScreenScene headerTitle="cardDetail" hasRight={false}>
        <View style={styles.topView}>
          <BusinessCard business={business} onCardPress={this.onPressCoupons} />
          {/* { this.renderBusinessOption(business) } */}
          {/* <Text style={styles.description}>{business.description}</Text> */}
          <Text style={styles.description}>{buzDescription}</Text>
          { isShowChargeButton && this.renderChargeButton() }
        </View>
        <CardMap pois={stores} poiIndex={storeIndex} />
        <StoreList list={stores} onPress={this.onPressStore} />
      </FullScreenScene>
    );
  }
}

CardDetailScene.defaultProps = {
  cardId: '',
  card: {},
  storeIndex: 0,
  language: 'en',
};

CardDetailScene.propTypes = {
  language: PropTypes.string,
  cardId: PropTypes.string,
  card: PropTypes.object,
  storeIndex: PropTypes.number,
  setCardId: PropTypes.func.isRequired,
  setStoreIndex: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  language: selectLanguage,
  card: selectCard,
  storeIndex: selectStoreIndex,
});

const mapDispatchToProps = (dispatch) => ({
  setCardId: (cardId) => dispatch(setCardIdAction(cardId)),
  setStoreIndex: (store) => dispatch(setStoreIndexAction(store)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cardDetailScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(CardDetailScene);
