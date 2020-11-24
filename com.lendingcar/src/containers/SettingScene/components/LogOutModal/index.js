/**
*
* LogoOutModal Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  Button,
} from 'native-base';

import styles from './styles';

const LogOutModal = (props) => {
  const {
    modalVisible, closeModal, logOut,
  } = props;

  const renderButton = (textStyle, label, onPress) => (
    <Button
      style={styles.button}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {translate(label)}
      </Text>
    </Button>
  );

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <TouchableOpacity style={styles.mask} onPress={closeModal} />
      <View style={styles.content}>
        { renderButton(styles.logOutText, 'logOut', logOut) }
        { renderButton(styles.cancelText, 'cancel', closeModal) }
      </View>
    </Modal>
  );
};

LogOutModal.defaultProps = {
  modalVisible: false,
  closeModal: () => null,
  logOut: () => null,
};

LogOutModal.propTypes = {
  modalVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  logOut: PropTypes.func,
};

export default LogOutModal;
