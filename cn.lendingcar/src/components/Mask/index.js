/**
*
* Mask Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';
import {
  Modal,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

const Mask = (props) => {
  const {
    isFixed, onRequestClose, modalProps,
    children, onPress,
    style, childrenStyle,
  } = props;

  const child = (
    <View style={[styles.mask, style]}>
      <View style={[styles.children, childrenStyle]}>
        { children }
      </View>
      { onPress && <TouchableOpacity style={styles.rest} onPress={onPress} /> }
    </View>
  );
  if (!isFixed) return child;

  return (
    <Modal transparent onRequestClose={onRequestClose} {...modalProps}>
      {child}
    </Modal>
  );
};

Mask.defaultProps = {
  isFixed: false,
  modalProps: {},
  onRequestClose: () => {},
  children: null,
  onPress: null,
  style: {},
  childrenStyle: {},
};

Mask.propTypes = {
  isFixed: PropTypes.bool,
  modalProps: PropTypes.object,
  onRequestClose: PropTypes.func,
  children: PropTypes.any,
  onPress: PropTypes.func,
  style: PropTypes.object,
  childrenStyle: PropTypes.object,
};

export default Mask;
