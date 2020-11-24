/**
*
* CarTypeList Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import FilterTitle from 'components/PriceFilter/FilterTitle';

import tagImage from './assets/tag.png';
import styles from './styles';

const CarTypeList = (props) => {
  const { typeOfInventory, onFilterCarTypeChange } = props;

  const tagText = (item) => (
    <View style={styles.tagText}>
      <Text style={styles.typeText}>{translate(item.type)}</Text>
      <View style={styles.horizontalLine} />
      <FilterTitle
        translateLeft={false}
        leftLabel={item.size.toString()}
        rightLabel="cars"
        titleViewStyle={styles.titleViewStyle}
        leftLabelStyle={styles.leftLabelStyle}
        rightLabelStyle={styles.rightLabelStyle}
      />
    </View>
  );
  const itemTag = (item) => (
    <View style={styles.tagView}>
      <Image source={tagImage} style={styles.tagImage} />
      { tagText(item) }
    </View>
  );
  const listItem = (item) => (
    <TouchableWithoutFeedback key={item.type} onPress={() => onFilterCarTypeChange(item.type)}>
      <View style={styles.listItem}>
        <Image source={item.image} style={styles.image} />
        { itemTag(item) }
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <ScrollView
      style={styles.listContainer}
      contentContainerStyle={styles.listContent}
    >
      {typeOfInventory.map((item) => listItem(item))}
    </ScrollView>
  );
};

CarTypeList.defaultProps = {
  typeOfInventory: [],
  onFilterCarTypeChange: () => null,
};

CarTypeList.propTypes = {
  typeOfInventory: PropTypes.array,
  onFilterCarTypeChange: PropTypes.func,
};

export default CarTypeList;
