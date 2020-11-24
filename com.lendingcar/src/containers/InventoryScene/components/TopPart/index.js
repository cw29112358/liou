/**
*
* TopPart Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
} from 'native-base';
import {
  Animated,
  Easing,
} from 'react-native';

import styles from './styles';

class TopPart extends React.Component { // eslint-disable-line
state = {
  translateY: new Animated.Value(0),
}
componentWillReceiveProps = (nextProps) => {
  const { showSearchHeader } = this.props;

  if (showSearchHeader && !nextProps.showSearchHeader) { // 隐藏
    this.onAinatedScoll(-styles.headerOccupyHeight);
  } else if (!showSearchHeader && nextProps.showSearchHeader) { // 显示
    this.onAinatedScoll(0);
  }
}

onAinatedScoll(targetValue) {
  const { translateY } = this.state;
  Animated.timing(translateY, {
    toValue: targetValue,
    duration: 800,
    easing: Easing.linear(),
  }).start();
}

getTranslateYInterpolate(original, outputRange) {
  return original.interpolate({
    inputRange: [-styles.headerOccupyHeight, 0],
    outputRange,
  });
}

render() {
  const { renderSearchHeader, renderFilterBar } = this.props;
  const { translateY } = this.state;

  const headerOpacity = this.getTranslateYInterpolate(translateY, [0, 1]);
  const whiteHeight = this.getTranslateYInterpolate(translateY, [styles.headerMarginTop, 0]);

  return (
    <Animated.View
      style={[
        styles.topPart,
        { transform: [{ translateY }] },
      ]}
    >
      <Animated.View style={{ opacity: headerOpacity }}>
        { renderSearchHeader() }
      </Animated.View>

      <Animated.View
        style={{
          width: '100%',
          height: whiteHeight,
        }}
      />

      { renderFilterBar() }
    </Animated.View>
  );
}
}

TopPart.defaultProps = {
  showSearchHeader: true,
  renderSearchHeader: () => null,
  renderFilterBar: () => null,
};

TopPart.propTypes = {
  showSearchHeader: PropTypes.bool,
  renderSearchHeader: PropTypes.func,
  renderFilterBar: PropTypes.func,
};

export default TopPart;
