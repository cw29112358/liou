/**
*
* FormScene Component
*
*/

/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import {
  omitObjBykeyObj,
  executeFunction,
} from 'utils/helpers';
import variables from 'platform';

import FullScreenScene from 'components/FullScreenScene';

const {
  isIOS,
} = variables;

const defaultProps = {
  isLoading: false,
  noHeader: false,
  validBack: true,
  title: '',
  hasRight: false,
  rightButton: undefined,
  contentRef: undefined,
  scrollEnabled: true,
  contentProps: {},
  alertTitle: '',
  alertMessage: '',
  component: undefined,
  topChildren: undefined,
  children: undefined,
};
const propTypes = {
  isLoading: PropTypes.bool,
  noHeader: PropTypes.bool,
  validBack: PropTypes.bool,
  title: PropTypes.string,
  hasRight: PropTypes.bool,
  rightButton: PropTypes.node,
  contentRef: PropTypes.func,
  scrollEnabled: PropTypes.bool,
  contentProps: PropTypes.object,
  alertTitle: PropTypes.string,
  alertMessage: PropTypes.string,
  component: PropTypes.any,
  topChildren: PropTypes.node,
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
  onSaveAlert = (handleSubmit, onCancel = this.onBack) => {
    const { alertTitle, alertMessage } = this.props;
    window.alert(
      alertTitle,
      alertMessage,
      {
        text: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'save',
        onPress: handleSubmit,
      },
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
    const { hasRight, validBack, rightButton } = this.props;

    return {
      hasRight,
      leftPress: validBack ? this.onPressBack : undefined,
      rightLable: 'save',
      rightPress: this.onPressSave,
      rightButton,
    };
  }
  getContentProps() {
    const { contentProps } = this.props;
    return {
      keyboardDismissMode: isIOS ? 'on-drag' : 'none',
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
      isLoading, scrollEnabled,
      noHeader, title, topChildren, children,
    } = this.props;
    const otherProps = omitObjBykeyObj(this.props, propTypes);

    return (
      <FullScreenScene
        isLoading={isLoading}
        scrollEnabled={scrollEnabled}
        noHeader={noHeader}
        headerTitle={title}
        headerProps={noHeader ? {} : this.getHeaderProps()}
        contentProps={this.getContentProps()}
        {...otherProps}
      >
        { topChildren }
        { this.renderComponent(otherProps) }
        { children && children }
      </FullScreenScene>
    );
  }
}

FormScene.defaultProps = defaultProps;
FormScene.propTypes = propTypes;

export default FormScene;
