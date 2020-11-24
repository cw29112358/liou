/**
*
* RefIdForm
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Form,
  Button,
  View,
  Text,
} from 'native-base';

import formValidators from 'utils/formValidators';

import { selectAuthUserId } from 'containers/AppRouter/selectors';
import { updateFormAction } from 'containers/AppRouter/actions';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const { isRequired } = formValidators;
const getAPIPath = (props) => `api/profile/${props.authUserId}`; // eslint-disable-line
const getReduxEndPoint = (props) => ['appRouter', 'users', props.authUserId, 'profile']; // eslint-disable-line

const RefIdForm = (props) => {
  const { handleSubmit } = props;
  const formFieldsObject = {
    refId: {
      type: 'textInput',
      validate: [isRequired],
      placeholder: 'placeholderRefId',
      itemSettings: {
        rounded: true,
      },
      itemstyle: styles.itemstyle,
      inputStyle: styles.inputStyle,
    },
  };
  const formFields = [
    pick(formFieldsObject, 'refId'),
  ];

  return (
    <Form style={styles.form}>
      {formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...props}
        />
      ))}

      <View style={styles.rowR}>
        <Button
          primary
          style={[styles.brandShadow, styles.buttonCircle]}
          onPress={handleSubmit}
        >
          <Text>{translate('confirmAdd')}</Text>
        </Button>
      </View>
    </Form>
  );
};

RefIdForm.defaultProps = {

};

RefIdForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={RefIdForm} />;

const form = reduxForm({
  form: 'refIdForm',
})(FormWithError);

const connectedForm = connect((state, props) => ({
  initialValues: state.getIn(getReduxEndPoint(props)),
}))(form);

const mapStateToProps = createPropsSelector({
  authUserId: selectAuthUserId,
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (formMap, _dispatch, props) => {
      const { onFormSuccess } = props;
      dispatch(updateFormAction(formMap, getAPIPath(props), getReduxEndPoint(props), false, onFormSuccess));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
