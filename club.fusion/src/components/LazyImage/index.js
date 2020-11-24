/**
*
* LazyImage Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';
import {
  Image,
} from 'react-native';

import styles from './styles';

class LazyImage extends React.Component {
  state={
    isLoading: true,
  };
  componentWillReceiveProps(nextProps) {
    const isChange = this.getIsSourceChange(nextProps);
    if (isChange) this.setState({ isLoading: true });
  }

  getIsSourceChange(nextProps) {
    const { url } = this.props;
    const { url: nextUrl } = nextProps;
    const typeSource = typeof url;
    const typeNextSource = typeof nextUrl;
    if (nextUrl && typeSource !== typeNextSource) return true;

    if (['number', 'string'].includes(typeSource) && url !== nextUrl) return true;
    if (typeSource === 'string' && url !== nextUrl) return true;
    if (typeSource === 'object' && url.url !== nextUrl.url) return true;

    return false;
  }

  onLoad = () => {
    this.setState({ isLoading: false });
  }
  onError = () => {
    const { url } = this.props;
    console.warn('load image fail:', url);
  }

  render() {
    const {
      isLazyLoad, defaultSource,
      isLocal, url, imageProps,
      style, viewStyle,
    } = this.props;
    const { isLoading } = this.state;

    let source;
    if (!url) {
      if (defaultSource) source = defaultSource;
    } else if (isLocal || typeof url === 'object') {
      source = url;
    } else if (typeof url === 'string') {
      source = { uri: url };
    }

    const newViewStyle = [styles.viewStyle];
    if (viewStyle) newViewStyle.push(viewStyle);

    const imageStyle = [];
    if (style) imageStyle.push(style);

    const actualIsLoading = isLoading && isLazyLoad;
    const actualImageStyle = actualIsLoading
      ? [...imageStyle, styles.imageLoading]
      : imageStyle;

    return (
      <View style={viewStyle}>
        <Image
          style={actualImageStyle}
          source={source}
          onLoad={isLazyLoad ? this.onLoad : undefined}
          onError={this.onError}
          {...imageProps}
        />
        { actualIsLoading && <Image style={imageStyle} source={defaultSource} /> }
      </View>
    );
  }
}

LazyImage.defaultProps = {
  isLazyLoad: true,
  defaultSource: undefined,
  isLocal: false,
  url: undefined,
  imageProps: {},
  style: undefined,
  viewStyle: undefined,
};

LazyImage.propTypes = {
  isLazyLoad: PropTypes.bool,
  defaultSource: PropTypes.any,
  isLocal: PropTypes.bool,
  url: PropTypes.any,
  imageProps: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  viewStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default LazyImage;
