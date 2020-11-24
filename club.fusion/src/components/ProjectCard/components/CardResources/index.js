/**
*
* CardResources Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import ImageResources from '../ImageResources';
import VideoResources from '../VideoResources';

const CardResources = (props) => {
  const {
    images, isShowSmall, isVideo, goToProjectDetail, edit,
  } = props;
  if (isVideo) {
    return <VideoResources videoSource={images[0]} edit={edit} />;
  }
  return (
    <ImageResources
      images={images}
      edit={edit}
      isShowSmall={isShowSmall}
      goToProjectDetail={goToProjectDetail}
    />
  );
};

CardResources.defaultProps = {
  isShowSmall: false,
  isVideo: false,
  edit: false,
  goToProjectDetail: () => null,
};

CardResources.propTypes = {
  images: PropTypes.array.isRequired,
  isShowSmall: PropTypes.bool,
  isVideo: PropTypes.bool,
  edit: PropTypes.bool,
  goToProjectDetail: PropTypes.func,
};

export default CardResources;
