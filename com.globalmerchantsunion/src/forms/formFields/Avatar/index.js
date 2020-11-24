/**
*
* Avatar
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Label,
  Icon,
} from 'native-base';
import PhotoUpload from 'react-native-photo-upload';
import {
  Image,
} from 'react-native';

import {
  PHOTO_UPLOAD_CONFIG,
} from 'utils/constants';
import { getUserLogoUrl } from 'utils/helpers';

import MyAvatar from 'components/Avatar';
import Button from 'components/Button';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

import deleteImage from './assets/delete.png';

function getImageFormat(fileType) {
  switch (fileType) {
    case 'jpg':
      return 'JPEG';
    case 'jpeg':
      return 'JPEG';
    case 'png':
      return 'PNG';
    default:
      return 'JPEG';
  }
}

class Avatar extends React.Component {
  onResponse = (response) => {
    this.file = {
      uri: response.uri,
      name: response.fileName,
      type: response.type,
    };
  }
  onResizedImageUri = (resizedImageUri) => {
    const { input, onUpload } = this.props;
    this.file.uri = resizedImageUri.uri;
    this.file.name = resizedImageUri.name;
    onUpload(input.name, this.file, this.props);
  }
  onPressDelete = () => {
    const { input } = this.props;
    input.onChange(null);
  }

  renderPhotoUpload(fileType, children) {
    return (
      <PhotoUpload
        containerStyle={{ flex: 0 }}
        onResponse={this.onResponse}
        onResizedImageUri={this.onResizedImageUri}
        maxWidth={400}
        maxHeight={400}
        quality={80}
        format={getImageFormat(fileType)}
        {...(PHOTO_UPLOAD_CONFIG[this.props.appLanguage] || {})}//eslint-disable-line
      >
        { children }
      </PhotoUpload>
    );
  }
  renderAvatar = (url, editable) => {
    const { avatarProps, avatarStyle } = this.props;
    return (
      <MyAvatar
        url={url}
        avatarProps={avatarProps}
        avatarStyle={avatarStyle}
        onPress={editable ? undefined : () => {}}
        activeOpacity={1}
      />
    );
  }
  renderDeleteButton = () => (
    <Button
      transparent
      style={styles.avatarDeleteButton}
      onPress={this.onPressDelete}
    >
      <Image source={deleteImage} style={styles.avatarDeleteImage} />
    </Button>
  )

  render() {
    const {
      layout, itemSettings, editable, hasDeleteIcon, renderUploadChildren,
      input, hasLabel, label, fileType,
      itemstyle, labelStyle,
    } = this.props;

    const itemLayout = [];
    const labelVertical = [];
    if (layout === 'vertical') {
      itemLayout.push(styles.fieldVertical);
      labelVertical.push(styles.labelVertical);
    }
    if (itemstyle) itemLayout.push(itemstyle);
    if (labelStyle) labelVertical.push(labelStyle);

    const labelText = label || input.name;
    const url = getUserLogoUrl(input.value);
    const uploadChildren = renderUploadChildren ? renderUploadChildren(url, editable) : this.renderAvatar(url, editable);

    return (
      <LayoutItem
        name={input.name}
        {...itemSettings}
        style={itemLayout}
      >
        { hasLabel && <Label style={labelVertical}>{translate(labelText)}</Label>}
        <View style={styles.row}>
          { this.renderPhotoUpload(fileType, uploadChildren) }
          { editable && !renderUploadChildren && <Icon style={styles.rightArrow} name="ios-arrow-forward" />}
        </View>
        { (!!url && hasDeleteIcon) && this.renderDeleteButton() }
      </LayoutItem>
    );
  }
}

Avatar.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  layout: '',
  itemSettings: {},
  editable: true,
  hasLabel: false,
  label: '',
  onUpload: () => null,
  fileType: 'jpeg',
  avatarProps: {},
  itemstyle: {},
  labelStyle: {},
  avatarStyle: {},
};

Avatar.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  layout: PropTypes.string,
  itemSettings: PropTypes.object,
  editable: PropTypes.bool,
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  onUpload: PropTypes.func,
  fileType: PropTypes.string,
  avatarProps: PropTypes.object,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  avatarStyle: PropTypes.object,
};

export default Avatar;
