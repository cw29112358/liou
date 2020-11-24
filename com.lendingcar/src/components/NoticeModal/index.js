/**
*
* NoticeModal Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Button,
} from 'native-base';
import {
  Modal, Image,
} from 'react-native';

import { getImageUrl, notificationLink } from 'utils/helpers';

import styles from './styles';

const NoticeModal = (props) => {
  const { isShowNotice, onClose, notice } = props;
  const image = notice.promotionImages[0];
  const source = { uri: getImageUrl(image) };
  const detailsLink = () => {
    notificationLink(notice.promotionUrl);
    onClose();
  };
  const detailButtonStyles = [styles.detailButton];
  const detailButtonTextStyles = [styles.detailText];
  if (notice.promotionColourCode) {
    detailButtonStyles.push({
      backgroundColor: notice.promotionColourCode,
    });
    detailButtonTextStyles.push({
      color: styles.white,
    });
  }
  return (
    <Modal
      transparent
      animationType="slide"
      visible={isShowNotice}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={source}
            style={styles.image}
            resizeMode="contain"
          />
          <Button style={detailButtonStyles} onPress={detailsLink}>
            <Text style={detailButtonTextStyles}>{translate('noticeDetails')}</Text>
          </Button>
          <Button onPress={onClose} style={styles.closeButton}>
            <Text>X</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

NoticeModal.defaultProps = {
  isShowNotice: false,
  onClose: () => null,
  notice: null,
};

NoticeModal.propTypes = {
  isShowNotice: PropTypes.bool,
  notice: PropTypes.object,
  onClose: PropTypes.func,
};

export default NoticeModal;
