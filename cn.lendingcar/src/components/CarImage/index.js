/**
*
* CarImage Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { getInventoryResizedImageUrl } from 'utils/helpers';

import LazyImage from 'components/LazyImage';

import defaultCarImage from './assets/car.png';
import styles from './styles';

function CarImage(props) {
  const {
    isLocal, hideWatermark, url,
    style, containerStyle,
  } = props;

  const caculateUrl = (url && typeof url === 'string')
    ? getInventoryResizedImageUrl(url) : url;

  const viewStyle = [styles.viewStyle];
  if (containerStyle) viewStyle.push(containerStyle);

  const imageStyle = [styles.image];
  if (hideWatermark) imageStyle.push(styles.imageUrl);
  if (style) imageStyle.push(style);

  return (
    <LazyImage
      isLazyLoad
      defaultSource={defaultCarImage}
      isLocal={isLocal}
      url={caculateUrl}
      style={imageStyle}
      viewStyle={viewStyle}
    />
  );
}

CarImage.defaultProps = {
  isLocal: false,
  hideWatermark: true,
  url: '',
  style: {},
  containerStyle: {},
};

CarImage.propTypes = {
  isLocal: PropTypes.bool,
  hideWatermark: PropTypes.bool,
  url: PropTypes.any,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
};

export default CarImage;
