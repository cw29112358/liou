/**
*
* Media
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import {
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {
  View,
  Text,
  Icon,
  ActionSheet,
} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

import {
  selectIsUploadSuccess,
} from 'containers/AppRouter/selectors';
import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

import closeIcon from './assets/close.png';


class Media extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      mediaSource: [],
      mediaType: 'images',
      destructiveButtonIndex: 9,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { isUploadSuccess } = this.props;
    if (!isUploadSuccess && nextProps.isUploadSuccess) {
      this.setState({
        mediaSource: [],
        destructiveButtonIndex: 9,
      });
    }
  }
  openPicker = () => {
    const { mediaType } = this.props;
    if (mediaType === 'any') {
      this.pickMedia();
    } else if (mediaType === 'photo') {
      this.pickPhotos();
    } else if (mediaType === 'video') {
      this.pickVideo();
    }
  }
  pickMedia = () => {
    const BUTTONS = [translate('selectPhoto'), translate('selectVideo'), translate('cancel')];
    const CANCEL_INDEX = 2;
    const { destructiveButtonIndex } = this.state;
    ActionSheet.show(
      {
        options: BUTTONS,
        destructiveButtonIndex,
        cancelButtonIndex: CANCEL_INDEX,
        title: translate('selectMedia'),
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.pickPhotos();
        } else if (buttonIndex === 1) {
          this.pickVideo(destructiveButtonIndex);
        }
      }
    );
  }
  pickPhotos = () => {
    const options = {
      mediaType: 'photo',
      multiple: true,
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.8,
    };
    const limited = 9;
    this.setState({
      destructiveButtonIndex: 1,
    });
    this.selectMediaTapped(options, limited);
  }
  pickVideo = (destructiveButtonIndex) => {
    if (destructiveButtonIndex === 1) {
      return;
    }
    const options = {
      mediaType: 'video',
    };
    this.selectMediaTapped(options);
  }
  selectMediaTapped = (options, limited) => {
    const { input, onUpload } = this.props;
    const { mediaSource } = this.state;
    ImagePicker.openPicker(options)
      .then((media) => {
        if (Array.isArray(media)) {
          const source = media.map((image) => {
            const ary = image.path.split('/');
            return ({
              uri: image.path,
              name: ary[ary.length - 1],
              type: image.mime,
            });
          });
          const mergeSource = [...mediaSource, ...source].splice(0, limited);
          this.setState({
            mediaSource: mergeSource,
            mediaType: 'images',
          });
          onUpload(input.name, mergeSource, this.props);
        } else {
          const { path, mime } = media;
          const ary = media.path.split('/');
          const mergeSource = [
            {
              uri: path,
              name: ary[ary.length - 1],
              type: mime,
            },
          ];
          this.setState({
            mediaSource: mergeSource,
            mediaType: 'video',
          });
          onUpload(input.name, mergeSource, this.props);
        }
      });
  }
  deletePicker = (uri) => {
    const { input, onUpload } = this.props;
    const { mediaSource } = this.state;
    const deletedAvatarSource = mediaSource.filter((item) => item.uri !== uri);
    this.setState({
      mediaSource: deletedAvatarSource,
    });
    onUpload(input.name, deletedAvatarSource, this.props);
  }
  openModal = (path, mime) => {
    Actions.modal({
      children: this.renderModal(path, mime),
      isWithPadding: false,
    });
  }
  renderImage = (source, index) => {
    const imageStyle = [styles.imageBgc];
    if (index % 4 === 3) {
      imageStyle.push(styles.fourthImageBgc);
    }
    const { uri } = source;
    return (
      <ImageBackground
        style={imageStyle}
        imageStyle={styles.avatar}
        source={source}
        key={uri}
      >
        <TouchableOpacity onPress={() => this.deletePicker(uri)}>
          <Image source={closeIcon} style={styles.closeImage} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
  renderVideo = (source) => {
    const { uri, type } = source;
    if (uri) {
      return (
        <TouchableOpacity
          onPress={() => this.openModal(uri, type)}
          key={uri}
        >
          <View style={styles.videoWrapper}>
            <Video
              source={source}
              style={styles.videoStyle}
              rate={1}
              paused
              muted
              resizeMode="cover"
              onError={(e) => console.log(e)}
            />
            <Icon type="EvilIcons" name="play" style={styles.playIcon} />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }
  renderMedia = (inputVertical) => {
    const { mediaSource, mediaType } = this.state;
    const isReturnImages = mediaType === 'images' ? 1 : 0;
    return (
      <View style={[styles.mediaWrapper, inputVertical]}>
        {
          mediaSource.map((source, index) => {
            if (isReturnImages) {
              return this.renderImage(source, index);
            }
            return this.renderVideo(source);
          })
        }
        {
          (isReturnImages && mediaSource.length < 9)
          && (
            <TouchableOpacity onPress={this.openPicker}>
              <View style={styles.addImage}>
                <Icon type="MaterialIcons" name="add" style={styles.addIcon} />
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
  renderModal = (path, mime) => (
    <View style={styles.modalWrapper}>
      <Video
        source={{ uri: path, type: mime }}
        style={styles.videoStyle}
        rate={1}
        volume={1}
        paused={false}
        muted={false}
        resizeMode="center"
        onError={(e) => console.log(e)}
        repeat
        fullscreen
      />
    </View>
  )
  render() {
    const {
      input, label, hasLabel,
      itemstyle, labelStyle, inputStyle, itemSettings,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout, layout,
      showAllError, errorKeys,
    } = this.props;
    const itemLayout = [];
    const labelVertical = [];
    const inputVertical = [];
    if (layout === 'vertical') {
      itemLayout.push(styles.fieldVertical);
    }
    if (itemstyle) itemLayout.push(itemstyle);
    if (labelStyle) labelVertical.push(labelStyle);
    if (inputStyle) inputVertical.push(inputStyle);
    const isError = firstErrorFieldKey === input.name
      || (showAllError && errorKeys[input.name]);
    if (isError) {
      itemLayout.push(styles.fieldError);
      inputVertical.push(styles.fieldError);
    }

    const labelText = label || input.name;

    return (
      <LayoutItem
        name={input.name}
        firstErrorFieldKey={firstErrorFieldKey}
        onSetFirstErrorFieldKeLayout={onSetFirstErrorFieldKeLayout}
        {...itemSettings}
        style={itemLayout}
      >
        {
          hasLabel
          && (<Text style={[labelVertical, styles.mediaTextStyle]}>{translate(labelText)}</Text>)
        }
        { this.renderMedia(inputVertical) }
      </LayoutItem>
    );
  }
}

Media.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  onUpload: () => null,
  itemSettings: {},
  layout: '',
  label: '',
  itemstyle: {},
  labelStyle: {},
  inputStyle: {},
  hasLabel: false,
  firstErrorFieldKey: null,
  mediaType: 'any',
  isUploadSuccess: true,
};

Media.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  onUpload: PropTypes.func,
  itemSettings: PropTypes.object,
  layout: PropTypes.string,
  label: PropTypes.string,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  firstErrorFieldKey: PropTypes.string,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
  mediaType: PropTypes.string,
  isUploadSuccess: PropTypes.bool,
};
const mapStateToProps = createPropsSelector({
  isUploadSuccess: selectIsUploadSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,
)(Media);
