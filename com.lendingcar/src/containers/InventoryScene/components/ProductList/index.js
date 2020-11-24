/**
*
* ProductList Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  RefreshControl,
} from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';

import { nullFunction } from 'utils/helpers';

import EmptyList from 'components/EmptyList';
import SeperatorText from 'components/SeperatorText';

import ProductListItem from '../ProductListItem';
import styles from './styles';

const {
  topPartHeight,
  filterBarHeight,
  deviceWidth,
  deviceHeight,
} = styles;
const ViewTypes = {
  FIRST: 0,
  OTHER: 1,
};

export class ProductList extends React.Component {
  dataProvider = new DataProvider((r1, r2) => r1 !== r2);
  layoutProvider = new LayoutProvider(
    (index) => {
      if (index === 0) {
        return ViewTypes.FIRST;
      }
      return ViewTypes.OTHER;
    },
    (type, dimOriginal) => {
      const dim = dimOriginal;
      switch (type) {
        case ViewTypes.FIRST:
          dim.width = deviceWidth - 8;
          dim.height = styles.isPad ? 346 : 230.5;
          break;
        case ViewTypes.OTHER:
          dim.width = deviceWidth - 8;
          dim.height = styles.isPad ? 316 : 210.5;
          break;
        case ViewTypes.FOOTER:
          dim.width = deviceWidth - 8;
          dim.height = styles.isPad ? 103 : 68.5;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  constructor(props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(topPartHeight),
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { showSearchHeader } = this.props;

    if (showSearchHeader && !nextProps.showSearchHeader) { // 隐藏
      this.onAinatedScoll(filterBarHeight);
    } else if (!showSearchHeader && nextProps.showSearchHeader) { // 显示
      this.onAinatedScoll(topPartHeight);
    }
  }

  onAinatedScoll(targetValue) {
    const { translateY } = this.state;
    Animated.timing(translateY, {
      toValue: targetValue + 3,
      duration: 500,
      easing: Easing.linear(),
    }).start();
  }
  onEndReached = () => {
    this.endReach = true;
  }

  renderEmptyList() {
    return (
      <EmptyList type="car" label="noCar" />
    );
  }
  renderListItem = (type, item) => {
    const { onPress } = this.props;
    return (
      <ProductListItem
        item={item}
        type={type}
        onPress={onPress}
      />
    );
  }
  renderFooter(length, endReach) {
    if (!length) return this.renderEmptyList();

    const label = endReach ? 'noMoreCar' : 'loadingCar';
    const showSeperate = endReach;
    return <SeperatorText label={label} showSeperate={showSeperate} />;
  }

  render() {
    const {
      refreshing, list, isFirstLoading, onRefresh,
      onTouchBegin, onTouchMove, onTouchEnd,
    } = this.props;

    const { translateY } = this.state;
    const listLength = list.length;
    const listHeight = listLength * (styles.isPad ? 316 : 210.5) + 20 + 68.5;
    const listViewHeight = deviceHeight - topPartHeight;

    return (
      <Animated.View
        style={[
          styles.listView,
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            paddingTop: translateY,
          },
        ]}
      >
        <RecyclerListView
          renderAheadOffset={(styles.isPad ? 316 : 210.5) * 15}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing && !isFirstLoading}
              onRefresh={onRefresh}
              title={translate('loading')}
            />
          )}
          layoutProvider={this.layoutProvider}
          dataProvider={this.dataProvider.cloneWithRows(list)}
          rowRenderer={this.renderListItem}
          renderFooter={() => this.renderFooter(listLength, this.endReach)}
          scrollEnabled={listLength > 0}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
          onTouchStart={(e) => {
            onTouchBegin(e, listHeight, listViewHeight);
          }}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </Animated.View>
    );
  }
}

ProductList.defaultProps = {
  list: [],
  isFirstLoading: true,
  onRefresh: nullFunction,
  onPress: nullFunction,
  onTouchBegin: nullFunction,
  onTouchMove: nullFunction,
  onTouchEnd: nullFunction,
  refreshing: false,
  showSearchHeader: false,
};

ProductList.propTypes = {
  list: PropTypes.array,
  isFirstLoading: PropTypes.bool,
  onRefresh: PropTypes.func,
  onPress: PropTypes.func,
  onTouchBegin: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
  refreshing: PropTypes.bool,
  showSearchHeader: PropTypes.bool,
};

export default ProductList;
