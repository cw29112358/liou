/**
*
* FormScene Component
*
*/

/* global window translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  Button,
  Text,
} from 'native-base';

import { omitObjBykeyObj, executeFunction } from 'utils/helpers';

import FullScreenScene from 'components/FullScreenScene';

import styles from './styles';

const defaultProps = {
  isLoading: false,
  validBack: true,
  title: '',
  rightButton: null,
  scrollEnabled: true,
  alertTitle: '',
  alertMessage: '',
  component: null,
  children: null,
};
const propTypes = {
  isLoading: PropTypes.bool,
  validBack: PropTypes.bool,
  title: PropTypes.string,
  rightButton: PropTypes.node,
  scrollEnabled: PropTypes.bool,
  alertTitle: PropTypes.string,
  alertMessage: PropTypes.string,
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
    const { alertTitle, alertMessage } = this.props;
    window.alert(
      alertTitle,
      alertMessage,
      [
        {
          text: 'cancel',
          onPress: onCalcel,
        },
        {
          text: 'save',
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

  getSaveButton() {
    return (
      <Button
        style={styles.rightButton}
        onPress={this.onPressSave}
      >
        <Text style={styles.rightText}>{translate('save')}</Text>
      </Button>
    );
  }
  getHeaderProps() {
    const { validBack, rightButton } = this.props;

    return {
      leftPress: validBack ? this.onPressBack : undefined,
      rightButton: rightButton || this.getSaveButton(),
      hiddenBorder: false,
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
  renderComponent() {
    const {
      validBack, rightButton,
      component: Component,
    } = this.props;
    if (!Component) return null;

    const { pressBackNum, pressSaveNum } = this.state;
    const otherProps = omitObjBykeyObj(this.props, propTypes);

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
      noHeader, title, children,
    } = this.props;

    return (
      <FullScreenScene
        isLoading={isLoading}
        scrollEnabled={scrollEnabled}
        noHeader={noHeader}
        headerTitle={title}
        headerStyle={styles.headerContainer}
        headerProps={noHeader ? {} : this.getHeaderProps()}
        contentProps={this.getContentProps()}
      >
        { this.renderComponent() }
        { children && children }
      </FullScreenScene>
    );
  }
}

FormScene.defaultProps = defaultProps;
FormScene.propTypes = propTypes;

export default FormScene;
