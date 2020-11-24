/**
 *
 * CardCouponsScene Container
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
  Tabs,
  Tab,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import FullScreenScene from 'components/FullScreenScene';
import Loader from 'components/Loader';

import {
  selectCardCouponsGroup,
} from 'containers/CardDetailScene/selectors';

import CouponsList from './components/CouponsList';
import {
  updateCouponsAction,
} from './actions';
import {
  selectIsLoading,
} from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class CardCouponsScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    const { unusedCoupons = [], otherCoupons = [] } = props.cardCouponsGroup;
    this.state = {
      tabs: [
        unusedCoupons,
        otherCoupons,
      ],
    };
  }
  componentWillReceiveProps(nextProps) {
    const { cardCouponsGroup } = this.props;
    if (cardCouponsGroup !== nextProps.cardCouponsGroup) {
      const newTabs = [
        nextProps.cardCouponsGroup.unusedCoupons,
        nextProps.cardCouponsGroup.otherCoupons,
      ];
      this.setState({
        tabs: newTabs,
      });
    }
  }

  renderList = (tab) => {
    const {
      business, updateCoupons, isLoading,
    } = this.props;
    return (
      <CouponsList
        updateCoupons={updateCoupons}
        isLoading={isLoading}
        listData={tab}
        business={business}
      />
    );
  }
  renderTab = (tab, index) => {
    const tabTitle = [translate('available'), translate('used')];
    return (
      <Tab
        heading={tabTitle[index]}
        key={tabTitle[index]}
        textStyle={styles.tabTextStyle}
        activeTextStyle={styles.tabActiveTextStyle}
      >
        { this.renderList(tab) }
      </Tab>
    );
  }
  renderTabs = () => {
    const {
      cardCouponsGroup,
    } = this.props;
    const { tabs } = this.state;
    if (!cardCouponsGroup) return null;
    return (
      <Tabs
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        initialPage={0}
        locked
      >
        { tabs.map((tab, index) => this.renderTab(tab, index))}
      </Tabs>
    );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <FullScreenScene
        headerTitle="cardCoupons"
        headerProps={{
          leftPress: () => Actions.popTo('cardDetail'),
        }}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
        renderOutsideContent={() => isLoading && <Loader />}
      >
        { this.renderTabs() }
      </FullScreenScene>
    );
  }
}

CardCouponsScene.defaultProps = {
  isLoading: false,
  cardCouponsGroup: null,
  business: null,
  updateCoupons: () => null,
};

CardCouponsScene.propTypes = {
  isLoading: PropTypes.bool,
  cardCouponsGroup: PropTypes.object,
  business: PropTypes.object,
  updateCoupons: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  cardCouponsGroup: selectCardCouponsGroup,
  isLoading: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  updateCoupons: (params) => dispatch(updateCouponsAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cardCouponsScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(CardCouponsScene);
