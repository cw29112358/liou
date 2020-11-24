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

class PrivilegeModal extends React.Component { // eslint-disable-line
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //
  //  };
  // }

  // onClick = () => {
  // }

  render() {
    const { closeModal, modalVisible, clilePrivilege } = this.props;
    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{translate(clilePrivilege.text)}</Text>
          </View>
          <View style={styles.content}>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
            >
              <Text style={styles.text}>{translate(clilePrivilege.modalText)}</Text>
            </ScrollView>
            <Button transparent style={styles.button} onPress={closeModal}>
              <Text style={styles.confirmText}>{translate('confirm')}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

PrivilegeModal.defaultProps = {
  closeModal: () => null,
  modalVisible: false,
  clilePrivilege: {},
};

PrivilegeModal.propTypes = {
  closeModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  clilePrivilege: PropTypes.object,
};

export default PrivilegeModal;
