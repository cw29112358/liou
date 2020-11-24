/**
*
* FeedBackForm
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { reduxForm } from 'redux-form/immutable';
import {
  Form,
} from 'native-base';

import formValidators from 'utils/formValidators';

import Button from 'components/Button';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const {
  isRequired,
} = formValidators;

const FeedBackForm = (props) => {
  const { handleSubmit, ...otherProps } = props;
  const formFieldsObject = {
    message: {
      type: 'textareaInput',
      validate: [isRequired],
      itemStyle: styles.textAreaItem,
      inputStyle: styles.textArea,
    },
  };

  const formFields = [
    pick(formFieldsObject, 'message'),
  ];

  return (
    <Form style={styles.form}>
      {formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...otherProps}
        />
      ))}

      <Button
        shadowStyle={styles.rowR}
        primary
        style={[styles.brandShadow, styles.buttonCircle]}
        onPress={handleSubmit}
        textLabel="submit"
        textStyle={styles.buttonText}
      />
    </Form>
  );
};

FeedBackForm.defaultProps = {
  userInfo: {},
};

FeedBackForm.propTypes = {
  userInfo: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={FeedBackForm} />;

const form = reduxForm({
  form: 'feedBackForm',
  destroyOnUnmount: true,
})(FormWithError);

export default form;
