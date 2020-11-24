/**
*
* ShareInviteForm
*
*/

/* global translate window */

import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Clipboard,
} from 'react-native';
import {
  View,
  Text,
  Form,
  Icon,
} from 'native-base';

import formValidators from 'utils/formValidators';

import {
  selectAuthUserId,
} from 'containers/AppRouter/selectors';
import {
  updateFormAction,
  logInByJwtTokenAction,
} from 'containers/AppRouter/actions';

import Button from 'components/Button';
import TranslateText from 'components/TranslateText';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const {
  isRequired,
} = formValidators;
const getAPIPath = (props) => `api/profile/${props.authUserId}`;
const getReduxEndPoint = (props) => ['appRouter', 'users', props.authUserId, 'profile'];

const ShareInviteForm = (props) => {
  const {
    agentId, openModal, handleSubmit, ...otherProps
  } = props;

  const renderCopyLeftContent = () => {
    if (agentId) {
      return (
        <Text style={styles.recommendationCode}>{ agentId }</Text>
      );
    }

    const formFieldsObject = {
      firstName: {
        type: 'textInput',
        validate: [isRequired],
        noFocusPlaceholder: true,
        placeholder: 'placeholderShareFirstName',
        layout: 'vertical',
        itemstyle: styles.item100,
        inputStyle: styles.inputStyle,
      },
    };
    const formFields = [
      pick(formFieldsObject, 'firstName'),
    ];
    return (
      formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...otherProps}
        />
      ))
    );
  };
  const onPressCopy = () => {
    Clipboard.setString(agentId);
    window.toast(translate('copySuccess'));
  };

  return (
    <Form style={styles.form}>
      <View style={styles.wrapper}>
        <View style={styles.shareInviteCode}>
          <TranslateText
            label={agentId ? 'shareInviteCode' : 'createInviteCode'}
            style={styles.shareInviteCodeText}
          />
          <Icon
            style={styles.questionIcon}
            name="question"
            type="SimpleLineIcons"
            onPress={openModal}
          />
        </View>

        <View style={[styles.copyContent, { paddingTop: agentId ? 13.5 : 0 }]}>
          { renderCopyLeftContent() }
          <Button
            transparent
            style={styles.copyButton}
            onPress={agentId ? onPressCopy : handleSubmit}
            textLabel={agentId ? 'copy' : 'submit'}
            textStyle={styles.copyButtonText}
          />
        </View>
      </View>
    </Form>
  );
};

ShareInviteForm.defaultProps = {
  agentId: '',
  openModal: () => null,
};

ShareInviteForm.propTypes = {
  agentId: PropTypes.string,
  openModal: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={ShareInviteForm} />;

const form = reduxForm({
  form: 'shareInviteForm',
})(FormWithError);

const mapStateToProps = createPropsSelector({
  authUserId: selectAuthUserId,
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (formMap, _dispatch, props) => {
      const onSuccess = () => dispatch(logInByJwtTokenAction());
      dispatch(updateFormAction(formMap, getAPIPath(props), getReduxEndPoint(props), false, onSuccess));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(form);
