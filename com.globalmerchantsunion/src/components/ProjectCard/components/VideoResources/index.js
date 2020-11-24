/**
*
* VideoResources Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { Modal } from 'react-native';

import styles from './styles';

class VideoResources extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      isShowFullModal: false,
    };
  }
  onEnterFullscreen = () => {
    this.setState({ isShowFullModal: true });
  }
  onExitFullscreen = () => {
    this.setState({ isShowFullModal: false });
  }
  render() {
    const { videoSource } = this.props;
    const { isShowFullModal } = this.state;
    if (styles.isIOS) {
      return (
        <Video
          source={{ uri: videoSource.url, type: videoSource.mime }}
          style={styles.videoStyle}
          controls
          paused
          hideShutterView
        />
      );
    }
    const child = (
      <VideoPlayer
        key={0}
        source={{ uri: videoSource.url, type: videoSource.mime }}
        style={isShowFullModal ? styles.videoContainer : styles.videoStyle}
        disableBack
        disableVolume
        paused
        resizeMode={isShowFullModal ? 'cover' : 'contain'}
        toggleResizeModeOnFullscreen={false}
        onEnterFullscreen={this.onEnterFullscreen}
        onExitFullscreen={this.onExitFullscreen}
      />
    );
    if (isShowFullModal) {
      return (
        <Modal
          key={1}
          visible={isShowFullModal}
          onRequestClose={this.onExitFullscreen}
        >
          {child}
        </Modal>
      );
    }
    return child;
  }
}

VideoResources.defaultProps = {
};

VideoResources.propTypes = {
  videoSource: PropTypes.object.isRequired,
};

export default VideoResources;
