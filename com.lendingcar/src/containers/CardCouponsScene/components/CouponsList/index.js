/**
*
* CouponsList Stateless Component
*
*/

/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { connect } from 'react-redux';
import {
  ListView,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {
  List,
} from 'native-base';

import {
  loadCouponsAction,
} from 'containers/CardPackageScene/actions';
import {
  selectIsLoading,
} from 'containers/CardPackageScene/selectors';

import EmptyList from 'components/EmptyList';

import CouponItem from '../CouponItem';
import styles from './styles';

export class CouponsList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  onRefresh = () => {
    const { loadCoupons } = this.props;
    loadCoupons({ forceReload: true });
  }

  handleUseCoupons = (item) => {
    const { updateCoupons } = this.props;
    updateCoupons({ couponId: item.id });
  }
  onUseCoupons = (item) => {
    window.alert(
      '',
      'promptCoupons',
      [
        {
          text: 'cancel',
          style: 'cancel',
        },
        {
          text: 'confirmUse',
          onPress: () => this.handleUseCoupons(item),
        },
      ]
    );
  }

  renderRow=(item, rowId, rowMap) => {
    const { business } = this.props;
    return (
      <CouponItem
        coupon={item}
        business={business}
        rowMap={rowMap}
        onUseCoupons={this.onUseCoupons}
      />
    );
  }
  renderEmptyList = (isRefresh, isLoading) => (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={!isLoading && isRefresh}
          onRefresh={this.onRefresh}
        />
      )}
    >
      <EmptyList label="noCoupons" />
    </ScrollView>
  )
  render() {
    const { listData, isRefresh, isLoading } = this.props;
    if (listData.length <= 0) {
      return this.renderEmptyList(isRefresh, isLoading);
    }
    return (
      <List
        style={styles.list}
        disableRightSwipe
        disableLeftSwipe
        dataSource={this.ds.cloneWithRows(listData)}
        renderRow={this.renderRow}
        renderLeftHiddenRow={() => null}
        refreshControl={(
          <RefreshControl
            refreshing={!isLoading && isRefresh}
            onRefresh={this.onRefresh}
          />
        )}
      />
    );
  }
}

CouponsList.defaultProps = {
  listData: [],
  isRefresh: false,
  isLoading: false,
  loadCoupons: () => null,
  updateCoupons: () => null,
  business: null,
};

CouponsList.propTypes = {
  listData: PropTypes.array,
  isRefresh: PropTypes.bool,
  isLoading: PropTypes.bool,
  business: PropTypes.object,
  loadCoupons: PropTypes.func,
  updateCoupons: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  isRefresh: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadCoupons: (params) => dispatch(loadCouponsAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponsList);
