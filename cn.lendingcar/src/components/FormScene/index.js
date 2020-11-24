/**
*
* FormScene Component
*
*/

/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import { omitObjBykeyObj, executeFunction } from 'utils/helpers';

import FullScreenScene from 'components/FullScreenScene';

import styles from './styles';

const defaultProps = {
  containerStyle: undefined,
  isLoading: false,
  noHeader: false,
  validBack: true,
  title: '',
  hasRight: true,
  rightButton: null,
  headerProps: {},
  scrollEnabled: true,
  alertTitle: '',
  alertMessage: '',
  saveLabel: 'save',
  component: null,
  children: null,
};
const propTypes = {
  containerStyle: PropTypes.object,
  isLoading: PropTypes.bool,
  noHeader: PropTypes.bool,
  validBack: PropTypes.bool,
  title: PropTypes.string,
  hasRight: PropTypes.bool,
  rightButton: PropTypes.node,
  headerProps: PropTypes.object,
  scrollEnabled: PropTypes.bool,
  alertTitle: PropTypes.string,
  alertMessage: PropTypes.string,
  saveLabel: PropTypes.string,
  component: PropTypes.any,
  children: PropTypes.node,
};
class FormScene extends React.Component {
  state = {
    pressBackNum: 0,
    pressSaveNum: 0,
  }

  // count press back and add button
  onPressBack = () => {
    this.onAddStateByKey('pressBackNum');
  }
  onPressSave = () => {
    this.onAddStateByKey('pressSaveNum');
  }
  onAddStateByKey(key) {
    const { [key]: value } = this.state;
    this.setState({ [key]: value + 1 });
  }

  // valid back
  onBack = () => {
    Actions.pop();
  }
  onSaveAlert = (handleSubmit, onCalcel = this.onBack) => {
    const { alertTitle, alertMessage, saveLabel } = this.props;
    window.alert(
      alertTitle,
      alertMessage,
      [
        {
          text: 'cancel',
          onPress: onCalcel,
        },
        {
          text: saveLabel,
          onPress: handleSubmit,
        },
      ],
    );
  }
  onValidBack = (dirty, handleSubmit) => {
    if (dirty) {
      this.onSaveAlert(handleSubmit);
    } else {
      this.onBack();
    }
  }

  // get Count layout info
  onLayout = (e) => {
    this.contentLayout = e.nativeEvent.layout;
  }
  getContentRef = (ref) => {
    const { contentRef } = this.props;
    if (ref) this.contentRef = ref._root; //eslint-disable-line
    executeFunction(contentRef, this.contentRef);
  }

  getHeaderProps() {
    const {
      hasRight, validBack, rightButton, headerProps,
    } = this.props;

    return {
      leftPress: validBack ? this.onPressBack : undefined,
      hasRight,
      rightLable: 'save',
      rightPress: this.onPressSave,
      rightButtonOtherProps: {
        textStyle: styles.rightText,
      },
      rightButton,
      ...headerProps,
    };
  }
  getContentProps() {
    const { contentProps } = this.props;
    return {
      keyboardDismissMode: styles.isIOS ? 'on-drag' : 'none',
      ref: this.getContentRef,
      onLayout: this.onLayout,
      enableOnAndroid: true,
      enableResetScrollToCoords: false,
      ...contentProps,
    };
  }

  // renderForm
  renderComponent(otherProps) {
    const {
      validBack, rightButton,
      component: Component,
    } = this.props;
    if (!Component) return null;

    const { pressBackNum, pressSaveNum } = this.state;

    return (
      <Component
        {...otherProps}
        contentRef={this.contentRef}
        contentLayout={this.contentLayout}
        validBack={validBack}
        hasSaveButton={!rightButton}
        onValidBack={this.onValidBack}
        onBack={this.onBack}
        onSaveAlert={this.onSaveAlert}
        pressBackNum={pressBackNum}
        pressSaveNum={pressSaveNum}
      />
    );
  }
  render() {
    const {
      containerStyle, isLoading, scrollEnabled,
      noHeader, title, children,
    } = this.props;
    const otherProps = omitObjBykeyObj(this.props, propTypes);

    return (
      <FullScreenScene
        containerStyle={containerStyle}
        isLoading={isLoading}
        scrollEnabled={scrollEnabled}
        noHeader={noHeader}
        headerTitle={title}
        headerStyle={styles.headerContainer}
        headerProps={noHeader ? {} : this.getHeaderProps()}
        contentProps={this.getContentProps()}
      >
        { this.renderComponent(otherProps) }
        { children && children }
      </FullScreenScene>
    );
  }
}

FormScene.defaultProps = defaultProps;
FormScene.propTypes = propTypes;

export default FormScene;
