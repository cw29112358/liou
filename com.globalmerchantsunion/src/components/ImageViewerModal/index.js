/**
*
* ImageViewerModal Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';

const ImageViewerModal = (props) => {
  const {
    images, imageIndex,
    modalVisible, onHideModal, modalProps,
    ...otherProps
  } = props;
  const newImages = images.map((image) => ({ url: image.url }));

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      onRequestClose={onHideModal}
      {...modalProps}
    >
      <ImageViewer
        imageUrls={newImages}
        index={imageIndex}
        onClick={onHideModal}
        {...otherProps}
      />
    </Modal>
  );
};

ImageViewerModal.defaultProps = {
  imageIndex: 0,
  modalVisible: false,
  onHideModal: () => null,
  modalProps: {},
};

ImageViewerModal.propTypes = {
  images: PropTypes.array.isRequired,
  imageIndex: PropTypes.number,
  modalVisible: PropTypes.bool,
  onHideModal: PropTypes.func,
  modalProps: PropTypes.object,
};

export default ImageViewerModal;
