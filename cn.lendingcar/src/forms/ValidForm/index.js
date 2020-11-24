/**
*
* ValidForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormSyncErrors } from 'redux-form/immutable';
import {
  View,
} from 'native-base';
import {
  Keyboard,
} from 'react-native';

import {
  getIsFormCorrect,
  getFirstErrorFieldKey,
  getErrorKeys,
  getFormHandleSubmit,
  promptFormErrorByFieldKey,
} from './helpers';

class ValidForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.getHandleSubmit(props);
    this.state = {
      firstErrorFieldKey: '',
      errorKeys: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    const { validBack, hasSaveButton } = this.props;
    this.handleSubmit = this.getHandleSubmit(nextProps);

    if (validBack) this.onValidBack(nextProps);
    if (hasSaveButton) this.onPressSaveButton(nextProps);
  }

  // valic back and press save button
  onValidBack(nextProps) {
    const { pressBackNum, onValidBack, dirty } = this.props;
    if (pressBackNum !== nextProps.pressBackNum) {
      onValidBack(dirty, this.handleSubmit);
    }
  }
  onPressSaveButton(nextProps) {
    const { pressSaveNum } = this.props;
    if (pressSaveNum !== nextProps.pressSaveNum) {
      this.handleSubmit();
    }
  }

  // firstErrorFieldKey
  onSetFirstErrorFieldKey = () => {
    const { formSyncErrors } = this.props;
    Keyboard.dismiss();
    this.setState({
      firstErrorFieldKey: getFirstErrorFieldKey(formSyncErrors),
      errorKeys: getErrorKeys(formSyncErrors),
    }, this.onScrollToFirstErrorFieldKey);
  }
  onClearFirstErrorFieldKey = (name) => {
    const { firstErrorFieldKey, errorKeys } = this.state;
    const newErrorKeys = { ...errorKeys };
    delete newErrorKeys[name];

    const newState = { errorKeys: newErrorKeys };
    if (name === firstErrorFieldKey) newState.firstErrorFieldKey = '';
    this.setState(newState);
  }

  // scroll to error key
  onFormLayout = (e) => {
    this.formLayout = e.nativeEvent.layout;
  }
  onSetFirstErrorFieldKeLayout = (layout) => {
    this.errorLayout = layout;
  }
  onScrollToFirstErrorFieldKey = () => {
    const { contentRef, contentLayout } = this.props;
    if (!this.errorLayout || !contentRef || !contentLayout) return;

    const { y, height } = this.errorLayout;
    const { height: scrollHeight } = contentLayout;
    const { height: formHeight } = this.formLayout;

    if (contentRef.scrollToPosition) {
      if (y + height < scrollHeight) {
        contentRef.scrollToPosition(0, 0);
      } else if (formHeight - y < scrollHeight) {
        contentRef.scrollToPosition(0, formHeight - scrollHeight);
      } else {
        contentRef.scrollToPosition(0, y);
      }
    }
  }

  // event
  getHandleSubmit({ formSyncErrors, handleSubmit }) {
    return getFormHandleSubmit(
      formSyncErrors,
      handleSubmit,
      this.onSetFirstErrorFieldKey
    );
  }
  promptKeyErrorBeforeEvent = (key, event) => {
    const { formSyncErrors } = this.props;
    if (formSyncErrors[key]) {
      this.onSetFirstErrorFieldKey();
      promptFormErrorByFieldKey(formSyncErrors, key);
    } else {
      event();
    }
  };

  render() {
    const {
      component: Component, showAllError, formSyncErrors, handleSubmit, ...otherProps
    } = this.props;
    const { firstErrorFieldKey, errorKeys } = this.state;

    return (
      <View onLayout={this.onFormLayout}>
        <Component
          {...otherProps}
          handleSubmit={this.handleSubmit}
          formSyncErrors={formSyncErrors}
          getIsFormCorrect={getIsFormCorrect}
          promptKeyErrorBeforeEvent={this.promptKeyErrorBeforeEvent}
          onClearFirstErrorFieldKey={this.onClearFirstErrorFieldKey}
          onSetFirstErrorFieldKeLayout={this.onSetFirstErrorFieldKeLayout}
          firstErrorFieldKey={firstErrorFieldKey}
          errorKeys={errorKeys}
          showAllError={showAllError}
        />
      </View>
    );
  }
}

ValidForm.defaultProps = {
  validBack: false,
  hasSaveButton: false,
  pressBackNum: undefined,
  onValidBack: undefined,
  pressSaveNum: undefined,
  contentRef: undefined,
  contentLayout: undefined,
};

ValidForm.propTypes = {
  validBack: PropTypes.bool,
  hasSaveButton: PropTypes.bool,
  pressBackNum: PropTypes.number,
  onValidBack: PropTypes.func,
  pressSaveNum: PropTypes.number,
  contentRef: PropTypes.any,
  contentLayout: PropTypes.object,
  dirty: PropTypes.bool.isRequired,
  formSyncErrors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  component: PropTypes.any.isRequired,
};

const mapStateToProps = (state, props) => {
  const { form } = props;
  return {
    formSyncErrors: getFormSyncErrors(form)(state),
  };
};

const connectForm = connect(mapStateToProps, null)(ValidForm);

export default connectForm;
