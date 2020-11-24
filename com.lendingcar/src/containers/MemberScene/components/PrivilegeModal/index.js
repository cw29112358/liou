/**
*
* PrivilegeModal Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ScrollView } from 'react-native';
import {
  View,
  Button,
  Text,
} from 'native-base';

import styles from './styles';

const PrivilegeModal = (props) => {
  const { visible, onClose, privilege } = props;
  const { text, modalText } = privilege;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{translate(text)}</Text>
        </View>

        <View style={styles.content}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <Text style={styles.text}>{translate(modalText)}</Text>
          </ScrollView>
          <Button transparent style={styles.button} onPress={onClose}>
            <Text style={styles.confirmText}>{translate('confirm')}</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

PrivilegeModal.defaultProps = {
  visible: false,
  onClose: () => null,
  privilege: {},
};

PrivilegeModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  privilege: PropTypes.object,
};

export default PrivilegeModal;
