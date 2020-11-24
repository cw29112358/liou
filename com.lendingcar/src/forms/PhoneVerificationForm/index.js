/**
*
* PhoneVerificationForm
*
*/

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import {
  Form,
  View,
  Button,
  Text,
  Icon,
} from 'native-base';

import formValidators from 'utils/formValidators';
import { getImmutableData } from 'utils/helpers';

import VerificationCodeTimer from 'components/VerificationCodeTimer';

import Group from 'forms/formFields';
import CompositeField from 'forms/formFields/CompositeField';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const {
  isRequired,
} = formValidators;

function PhoneVerificationForm(props) {
  const {
    title, onSendVerificationCode,
    handleSubmit, formSyncErrors, promptKeyErrorBeforeEvent,
    countryCode, phoneNumber,
    ...otherProps
  } = props;

  const formFieldsObject = {
    verificationCode: {
      type: 'numberInput',
      placeholder: 'placeholderVerificationCode',
      itemSettings: {
        rounded: true,
      },
      itemstyle: styles.itemstyle,
      validate: [isRequired],
      rightChildren: (
        <VerificationCodeTimer
          label="sendVerificationCode"
          onPress={(onSuccess) => {
            const callback = () => onSendVerificationCode(countryCode, phoneNumber, 60, onSuccess);
            promptKeyErrorBeforeEvent('phoneNumber', callback);
          }}
          buttonStyle={styles.brandShadow}
        />
      ),
    },
  };
  const formFields = [
    pick(formFieldsObject, 'verificationCode'),
  ];
  return (
    <Form style={styles.form}>
      <Text style={styles.title}>{translate(title)}</Text>
      <CompositeField {...props} />
      {
        formFields.map((formField) => (
          <Group
            fieldsObject={formField}
            key={formField}
            {...otherProps}
          />
        ))
      }

      <View style={styles.rowR}>
        <Button
          primary
          style={[styles.brandShadow, styles.buttonCircle]}
          onPress={handleSubmit}
        >
          <Icon name="arrow-forward" style={styles.iconNext} />
        </Button>
      </View>
    </Form>
  );
}

PhoneVerificationForm.defaultProps = {
  title: '',
  phoneNumber: null,
  countryCode: 1,
};

PhoneVerificationForm.propTypes = {
  title: PropTypes.string,
  onSendVerificationCode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formSyncErrors: PropTypes.object.isRequired,
  promptKeyErrorBeforeEvent: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string,
  countryCode: PropTypes.number,
};

const FormWithError = (props) => <ValidForm {...props} component={PhoneVerificationForm} />;

const form = reduxForm({
  form: 'phoneVerificationForm',
  destroyOnUnmount: true,
})(FormWithError);

const selector = formValueSelector('phoneVerificationForm');

const mapStateToProps = (state) => ({
  initialValues: getImmutableData({
    countryCode: 1,
  }),
  phoneNumber: selector(state, 'phoneNumber'),
  countryCode: selector(state, 'countryCode'),
});

export default connect(mapStateToProps, null)(form);
