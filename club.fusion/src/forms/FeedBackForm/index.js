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
import TranslateText from 'components/TranslateText';

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
      textareaStyle: styles.textareaStyle,
      validate: [isRequired],
      layout: 'vertical',
    },
  };
  const formFields = [
    pick(formFieldsObject, 'message'),
  ];

  return (
    <Form style={styles.form}>
      <TranslateText label="feedBackText" style={styles.greyText} numberOfLines={3} />
      {formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...otherProps}
        />
      ))}
      <Button
        shadowStyle={[styles.linearButtonView, styles.brandShadow]}
        {...styles.linearProps}
        onPress={handleSubmit}
        style={styles.linearButton}
        textLabel="submit"
        textStyle={styles.linearButtonText}
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
