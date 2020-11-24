/**
*
* Steps Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

import styles from './styles';

class Steps extends React.Component {
  constructor(props) {
    super(props);

    const { current, length } = props;
    const unitWidth = styles.deviceWidth / length;
    this.state = {
      unitWidth,
      width: new Animated.Value((current - 1) * unitWidth),
      duration: 2000 / length,
    };
  }
  componentDidMount() {
    const { current } = this.props;
    const { width, unitWidth, duration } = this.state;
    Animated.timing(width, {
      toValue: current * unitWidth,
      duration,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    const { current } = this.props;
    const { width, unitWidth, duration } = this.state;

    if (current !== nextProps.current) {
      width.setOffset(current * unitWidth);
      Animated.timing(width, {
        toValue: nextProps.current * unitWidth,
        duration,
      }).start();
    }
  }

  render() {
    const { width } = this.state;

    return (
      <Animated.View style={[styles.step, { width }]} />
    );
  }
}

Steps.defaultProps = {
  current: 1,
  length: 3,
};

Steps.propTypes = {
  current: PropTypes.number,
  length: PropTypes.number,
};

export default Steps;
