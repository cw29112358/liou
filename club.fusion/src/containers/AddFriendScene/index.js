/**
 *
 * AddFriendScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Text,
  View,
} from 'native-base';

import { NBTextarea } from 'utils/inputSupportLanguage';
import { LINEAR_PROPS } from 'utils/constants';
import { getImmutableData } from 'utils/helpers';

import { updateFormAction } from 'containers/AppRouter/actions';

import FullScreenScene from 'components/FullScreenScene';
import Button from 'components/Button';

import styles from './styles';

export class AddFriendScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      message: translate('defaultRequestText'),
    };
  }

  onChangeText = (value) => {
    this.setState({ message: value });
  }
  getAPIPath = () => 'api/invitations'

  onSuccess = () => {
    Actions.pop();
  }
  onSubmit = () => {
    const { userId, updateForm } = this.props;
    const { message } = this.state;
    const dataObj = getImmutableData({
      to: userId,
      message,
    });
    updateForm(dataObj, this.getAPIPath(), null, true, this.onSuccess);
  }
  renderChildren = () => {
    const { message } = this.state;
    return (
      <View style={styles.childrenContent}>
        <Text style={styles.label}>{translate('messageLabel')}</Text>
        <NBTextarea
          style={styles.textArea}
          rowSpan={5}
          bordered
          defaultValue={message}
          onChangeText={this.onChangeText}
        />
        <Button
          onPress={this.onSubmit}
          style={styles.button}
          linearStyle={styles.linear}
          {...LINEAR_PROPS}
          textLabel="send"
          textStyle={styles.buttonText}
          textTranslate
        />
      </View>
    );
  }

  render() {
    return (
      <FullScreenScene
        headerTitle="addFriendTitle"
        contentStyle={styles.content}
        renderOutsideContent={this.renderFooter}
      >
        { this.renderChildren() }
      </FullScreenScene>
    );
  }
}

AddFriendScene.defaultProps = {
};

AddFriendScene.propTypes = {
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = createPropsSelector({
});

const mapDispatchToProps = (dispatch) => ({
  updateForm: (formMap, _dispatch, endPoint, isCreate, onBack) => dispatch(updateFormAction(formMap, _dispatch, endPoint, isCreate, onBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendScene);
