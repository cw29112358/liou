/**
 *
 * CardPackageScene Container
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
  TouchableWithoutFeedback,
  Image,
  RefreshControl,
} from 'react-native';
import {
  Text,
  View,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import FullScreenScene from 'components/FullScreenScene';
import Loader from 'components/Loader';
import EmptyList from 'components/EmptyList';

import {
  selectCardsWithCoupons,
  selectIsLoading,
} from './selectors';
import {
  loadCardsAction,
  loadCouponsAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class CardPackageScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefresh: false,
    };
  }
  componentWillMount() {
    const { loadCards, loadCoupons } = this.props;
    loadCards();
    loadCoupons();
  }

  setHeaderProps = () => ({
    title: 'card',
  })

  onCardPress = (card) => {
    Actions.push('cardDetail', { cardId: card.id });
  }
  onRefresh = () => {
    const { loadCards } = this.props;
    this.setState({ isRefresh: true });
    loadCards({ forceReload: true });
  }

  renderCardItem = (card) => (
    <TouchableWithoutFeedback
      key={card.id}
      onPress={() => this.onCardPress(card)}
    >
      <View style={styles.cardItem}>
        <Image source={card.business.image} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardMessage}>
          <Image source={card.business.logo} style={styles.logoImage} />
          <View style={styles.businessMessage}>
            <Text style={styles.cardTitle}>{card.business.name}</Text>
            <Text style={styles.cardNote}>{card.business.cardName}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
  renderCards = () => {
    const { cards } = this.props;
    if (cards.length <= 0) return <EmptyList label="noCards" />;
    return (
      <View style={styles.list}>
        {cards.map((card, index) => this.renderCardItem(card, index))}
      </View>
    );
  }

  render() {
    const { isLoading } = this.props;
    const { isRefresh } = this.state;
    return (
      <FullScreenScene
        headerProps={this.setHeaderProps()}
        contentStyle={styles.content}
        contentProps={{
          refreshControl: <RefreshControl
            refreshing={isLoading && isRefresh}
            onRefresh={this.onRefresh}
          />,
        }}
        renderOutsideContent={() => (isLoading && !isRefresh) && <Loader />}
      >
        { (!isLoading || isRefresh) && this.renderCards() }
      </FullScreenScene>
    );
  }
}

CardPackageScene.defaultProps = {
  isLoading: true,
  cards: [],
  loadCards: () => null,
  loadCoupons: () => null,
};

CardPackageScene.propTypes = {
  isLoading: PropTypes.bool,
  cards: PropTypes.array,
  loadCards: PropTypes.func,
  loadCoupons: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  cards: selectCardsWithCoupons,
  isLoading: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadCards: (params) => dispatch(loadCardsAction(params)),
  loadCoupons: (params) => dispatch(loadCouponsAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cardPackageScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(CardPackageScene);
