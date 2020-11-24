/**
*
* SelectModal Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
} from 'native-base';
import {
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from 'react-native';

import { LINEAR_PROPS } from 'utils/constants';

import styles from './styles';

const SelectModal = (props) => {
  const {
    closeSelectModal, options, onChange, currentSelect, type,
    leftPlaceHolderPress, rightPlaceHolderPress,
  } = props;
  const listStyles = [styles.listStyle];
  if (type !== 'area') {
    listStyles.push(styles.rightList);
  } else {
    listStyles.push(styles.leftList);
  }

  const renderItem = (item) => {
    const isSelected = currentSelect
      ? item === currentSelect
      : item === options[0];
    const itemStyles = [styles.listItem];
    const itemTextStyles = [styles.itemText];
    let colors = [];
    if (isSelected) {
      itemStyles.push(styles.activeListItem);
      colors = LINEAR_PROPS.linearColors;
      itemTextStyles.push(styles.activeText);
    } else {
      colors = styles.colorsArray;
    }
    return (
      <LinearGradient
        key={item}
        start={LINEAR_PROPS.linearStart}
        end={LINEAR_PROPS.linearEnd}
        colors={colors}
      >
        <TouchableWithoutFeedback onPress={() => onChange(type, item)}>
          <View style={itemStyles}>
            <Text style={itemTextStyles}>{translate(item)}</Text>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    );
  };
  const renderPlaceHolderButton = () => (
    <View style={styles.buttonGroupView}>
      <Text
        style={styles.placeholderButton}
        onPress={() => leftPlaceHolderPress(type)}
      />
      <Text
        style={styles.placeholderButton}
        onPress={() => rightPlaceHolderPress(type)}
      />
    </View>
  );
  const renderChildren = () => (
    <ScrollView
      style={listStyles}
      contentContainerStyle={styles.scrollContent}
    >
      {options && options.map((item) => renderItem(item))}
    </ScrollView>
  );
  return (
    <Modal
      transparent
      onRequestClose={closeSelectModal}
    >
      <TouchableWithoutFeedback onPress={closeSelectModal}>
        <View style={styles.mask}>
          <View style={styles.maskChildren}>
            { renderChildren() }
          </View>
          { renderPlaceHolderButton() }
          <TouchableOpacity style={styles.rest} onPress={closeSelectModal} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

SelectModal.defaultProps = {
  options: [],
  currentSelect: '',
  type: '',
  leftPlaceHolderPress: () => null,
  rightPlaceHolderPress: () => null,
  closeSelectModal: () => null,
  onChange: () => null,
};

SelectModal.propTypes = {
  options: PropTypes.array,
  currentSelect: PropTypes.string,
  type: PropTypes.string,
  leftPlaceHolderPress: PropTypes.func,
  rightPlaceHolderPress: PropTypes.func,
  closeSelectModal: PropTypes.func,
  onChange: PropTypes.func,
};

export default SelectModal;
