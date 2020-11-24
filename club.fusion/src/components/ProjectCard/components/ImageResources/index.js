/**
*
* ImageResources Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  View,
  Button,
  Text,
} from 'native-base';

import ImageViewerModal from 'components/ImageViewerModal';
import styles from './styles';

class ImageResources extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      isShowImageModal: false,
      defaultImageIndex: 0,
    };
  }

  showImageModal = (index) => {
    this.setState({
      isShowImageModal: true,
      defaultImageIndex: index,
    });
  }
  hiddenImageModal = () => {
    this.setState({
      isShowImageModal: false,
      defaultImageIndex: 0,
    });
  }

  renderImageModal = (images) => {
    const { isShowImageModal, defaultImageIndex } = this.state;

    return (
      <ImageViewerModal
        key={1}
        images={images}
        imageIndex={defaultImageIndex}
        modalVisible={isShowImageModal}
        onHideModal={this.hiddenImageModal}
      />
    );
  }
  renderTouchableImage = (image, index) => {
    const { edit } = this.props;
    const imageStyles = index ? styles.smallImage : styles.resourceImage;
    return (
      <TouchableWithoutFeedback
        key={index}
        disabled={edit}
        onPress={() => this.showImageModal(index || 0)}
      >
        <Image style={imageStyles} source={{ uri: image }} />
      </TouchableWithoutFeedback>
    );
  }
  renderSmallImages = (images) => (
    <View style={styles.imagesView} key={0}>
      {
        images.map((image, index) => this.renderTouchableImage(image.url, index + 1))
      }
      <View style={styles.emptyView} />
    </View>
  )
  renderImage = (images) => {
    const { goToProjectDetail } = this.props;
    const isShowEllipsis = images.length >= 2;

    return (
      <View key={0}>
        { this.renderTouchableImage(images[0].url) }
        {isShowEllipsis && (
          <Button transparent style={styles.resourceButton} onPress={goToProjectDetail}>
            <Text style={styles.resourceButtonText}>...</Text>
          </Button>
        )}
      </View>
    );
  }
  render() {
    const { images, isShowSmall } = this.props;
    const { isShowImageModal } = this.state;
    const imageRender = [];
    if (isShowSmall) {
      imageRender.push(this.renderSmallImages(images));
    } else {
      imageRender.push(this.renderImage(images));
    }
    if (isShowImageModal) {
      imageRender.push(this.renderImageModal(images));
    }
    return imageRender;
  }
}

ImageResources.defaultProps = {
  isShowSmall: false,
  edit: false,
  goToProjectDetail: () => null,
};

ImageResources.propTypes = {
  images: PropTypes.array.isRequired,
  isShowSmall: PropTypes.bool,
  edit: PropTypes.bool,
  goToProjectDetail: PropTypes.func,
};

export default ImageResources;
