/**
*
* StoreList Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ListItem,
  Text,
} from 'native-base';
import TranslateText from 'components/TranslateText';

import styles from './styles';

const StoreList = (props) => {
  const { list, onPress } = props;

  return (
    <View>
      <TranslateText label="stores" style={styles.title} />
      {
        list.map((item, index) => {
          const key = `store_${index}`;
          const hoursArray = item.hours ? item.hours.split(',') : [];
          return (
            <ListItem key={key} style={styles.item} onPress={() => onPress(item, index)}>
              <Text style={styles.nameText}>{item.name}</Text>
              {hoursArray.map((hour) => (
                <Text style={styles.text} key={hour}>
                  {hour.trim()}
                </Text>
              ))}
              <Text style={styles.text} numberOfLines={2}>{item.address}</Text>
            </ListItem>
          );
        })
      }
    </View>
  );
};

StoreList.defaultProps = {
  list: [],
  onPress: () => null,
};

StoreList.propTypes = {
  list: PropTypes.array,
  onPress: PropTypes.func,
};

export default StoreList;
