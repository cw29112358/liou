/**
*
* VerificationCodeTimer Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import {
  selectVerificationCodeInfos,
} from 'containers/AppRouter/selectors';
import {
  deleteVerificationCodeInfoAction,
} from 'containers/AppRouter/actions';

import { LINEAR_PROPS } from 'utils/constants';
import Button from 'components/Button';

import styles from './styles';

class VerificationCodeTimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitailState(props);
    this.judgeIsStart();
  }
  componentDidMount() {
    this.node = true;
  }
  componentWillReceiveProps(nextProps) {
    const { codeInfos } = this.props;
    if (Object.keys(codeInfos) !== Object.keys(nextProps.codeInfos)) {
      const state = this.getInitailState(nextProps);
      this.setState(state);
      this.judgeIsStart(state.isStart);
    }
  }
  componentWillUnmount() {
    this.node = false;
    this.onClearTimer();
  }

  onSuccess = () => {
    this.setState({ isStart: true });
    this.judgeIsStart(true);
  }
  onPress = () => {
    const { isStart } = this.state;
    if (isStart) return;

    const { onPress } = this.props;
    onPress(this.onSuccess);
  }
  onDelete(startScene) {
    const { deleteVerificationCodeInfo } = this.props;
    deleteVerificationCodeInfo(startScene);
  }
  onClearTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  getDiffTime(startTime, seconds) {
    return Math.floor(seconds + (startTime - new Date().getTime()) / 1000);
  }
  getInitailState(props) {
    const { codeInfos } = props;
    const { currentScene } = Actions;
    if (!codeInfos[currentScene]) {
      return {
        isStart: false,
      };
    }
    const { startScene, startTime, seconds } = codeInfos[currentScene];
    const diffTime = this.getDiffTime(startTime, seconds);
    const isStart = diffTime > 0;
    return {
      isStart,
      currentScene,
      startScene,
      startTime,
      seconds,
      diffTime,
    };
  }
  judgeTargetTime = () => {
    const { startScene, startTime, seconds } = this.state;
    const diffTime = this.getDiffTime(startTime, seconds);
    if (diffTime > 0) {
      if (this.node) this.setState({ diffTime });
    } else {
      this.onDelete(startScene);
      this.onClearTimer();
      if (this.node) this.setState({ isStart: false });
    }
  }
  judgeIsStart(forceExec) {
    const { startScene, isStart } = this.state;
    if (isStart || forceExec) {
      this.onClearTimer();
      this.timer = setInterval(this.judgeTargetTime, 1000);
    } else {
      this.onDelete(startScene);
    }
  }

  render() {
    const {
      label,
      buttonStyle, textStyle, disableButtonStyle,
    } = this.props;
    const { isStart, diffTime } = this.state;
    const newButtonStyle = isStart
      ? [styles.button, styles.disableButton, disableButtonStyle]
      : [styles.button, buttonStyle];
    const isTranslate = !isStart;

    return (
      <Button
        transparent
        {...LINEAR_PROPS}
        linearStyle={{
          ...LINEAR_PROPS.linearStyle,
          ...styles.linearView,
        }}
        style={newButtonStyle}
        onPress={this.onPress}
        textLabel={isTranslate ? label : `${diffTime}s`}
        textStyle={[styles.buttonText, textStyle]}
        isTranslate={isTranslate}
      />
    );
  }
}

VerificationCodeTimer.defaultProps = {
  label: '',
  onPress: null,
  buttonStyle: {},
  textStyle: {},
  disableButtonStyle: {},
};

VerificationCodeTimer.propTypes = {
  codeInfos: PropTypes.object.isRequired,
  label: PropTypes.string,
  onPress: PropTypes.func,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  disableButtonStyle: PropTypes.object,
  deleteVerificationCodeInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  codeInfos: selectVerificationCodeInfos,
});

const mapDispatchToProps = (dispatch) => ({
  deleteVerificationCodeInfo: (startScene) => dispatch(deleteVerificationCodeInfoAction(startScene)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(VerificationCodeTimer);
