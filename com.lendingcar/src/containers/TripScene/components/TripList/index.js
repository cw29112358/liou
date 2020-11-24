/**
*
* TripList Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
} from 'native-base';
import {
  nullFunction,
} from 'utils/helpers';

import EmptyList from 'components/EmptyList';

import TripCard from '../TripCard';

import styles from './styles';

export class TripList extends React.Component { // eslint-disable-line
  renderListItem = (item, s1, index) => {
    if (!item) return null;

    const { list, onPress } = this.props;
    const itemStyle = list.length - 1 === Number(index) ? styles.lastItem : {};
    return (
      <TripCard
        item={item}
        itemStyle={itemStyle}
        onPress={onPress}
      />
    );
  }
  renderList() {
    const {
      list, scrollEnabled,
    } = this.props;
    return (
      <List
        directionalLockEnabled
        scrollEnabled={list.length > 0 && scrollEnabled}
        contentContainerStyle={styles.listContainer}
        style={styles.list}
        dataArray={list.length ? list : ['']}
        renderRow={list.length ? this.renderListItem : this.renderEmptyList}
      />
    );
  }
  renderEmptyList() {
    return (
      <EmptyList type="content" label="noTrip" />
    );
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) return null;

    return this.renderList();
  }
}

TripList.defaultProps = {
  list: [],
  onPress: nullFunction,
  isLoading: false,
  scrollEnabled: true,
};

TripList.propTypes = {
  list: PropTypes.array,
  onPress: PropTypes.func,
  isLoading: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
};

export default TripList;
