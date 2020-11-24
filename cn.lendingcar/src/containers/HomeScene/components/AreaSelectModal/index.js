/**
*
* AreaSelectModal Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ListItem,
  Text,
  Icon,
} from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native';

import styles from './styles';

const AreaSelectModal = (props) => {
  const {
    changeSelectModal, area, changeArea, currentArea,
  } = props;

  const renderItem = (item) => {
    const isSelected = currentArea
      ? item === currentArea
      : item === area[0];

    return (
      <ListItem
        key={item}
        style={styles.listItem}
        onPress={() => changeArea(item)}
      >
        <Text style={styles.itemText}>{translate(item)}</Text>
        {isSelected
          && <Icon name="checkmark" style={styles.markIcon} />
        }
      </ListItem>
    );
  };
  const renderAreaList = () => (
    <ScrollView
      style={styles.listStyle}
      contentContainerStyle={styles.scrollContent}
    >
      {area && area.map((item) => renderItem(item))}
    </ScrollView>
  );
  return (
    <View style={styles.modalMask}>
      <View style={styles.modalContent}>
        <View style={styles.triangle} />
        <TouchableOpacity style={styles.shadowPress} onPress={changeSelectModal} />
        { renderAreaList() }
      </View>
    </View>
  );
};

AreaSelectModal.defaultProps = {
  area: [],
  currentArea: '',
  changeSelectModal: () => null,
  changeArea: () => null,
};

AreaSelectModal.propTypes = {
  area: PropTypes.array,
  currentArea: PropTypes.string,
  changeSelectModal: PropTypes.func,
  changeArea: PropTypes.func,
};

export default AreaSelectModal;
