/**
*
* WithdrawalForm
*
*/

/* global translate  toast */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { reduxForm } from 'redux-form/immutable';
import {
  View,
  Form,
  Button,
  Text,
} from 'native-base';

import formValidators from 'utils/formValidators';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import { updateFormAction } from 'containers/AppRouter/actions';
import { agentLoadAction } from 'containers/AgentScene/actions';

import styles from './styles';

const {
  isRequired,
} = formValidators;

function WithdrawalForm(props) {
  const {
    availableBalance, handleSubmit,
    getIsFormCorrect, formSyncErrors, onSaveAlert,
    ...otherProps
  } = props;

  const formFieldsObject = {
    bankAccountName: {
      type: 'textInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderBankAccountName',
      hasDeleteIcon: true,
      ...styles.horizontalItem,
    },
    bankAccountNumber: {
      type: 'numberInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderBankAccountNumber',
      interval: 4,
      ...styles.horizontalItem,
    },
    bankName: {
      type: 'textInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderBankName',
      hasDeleteIcon: true,
      ...styles.horizontalItem,
    },
    bankBranch: {
      type: 'textInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderBankBranch',
      hasDeleteIcon: true,
      ...styles.horizontalItem,
    },
    amount: {
      type: 'numberInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: `Maximum withdrawal $${availableBalance.toFixed(2)}`,
      placeholderTranslate: false,
      parseNumber: true,
      isPositive: true,
      noZero: true,
      maxLength: availableBalance.toString().length,
      maxValue: availableBalance,
      ...styles.horizontalItem,
    },
  };

  const formFields = [
    pick(formFieldsObject,
      'bankAccountName', 'bankAccountNumber', 'bankName', 'bankBranch',
      'amount'),
  ];

  return (
    <View style={styles.formView}>
      <Form style={styles.form}>
        {formFields.map((formField) => (
          <Group
            fieldsObject={formField}
            key={formField}
            {...otherProps}
          />
        ))}

        <Text style={styles.greyText}>
          {translate('withdrawTip')}
        </Text>
      </Form>

      <Button
        primary
        style={[styles.brandShadow, styles.buttonCircle]}
        onPress={() => {
          if (getIsFormCorrect(formSyncErrors)) {
            onSaveAlert(handleSubmit, () => null);
          } else {
            handleSubmit();
          }
        }}
      >
        <Text>{translate('submit')}</Text>
      </Button>
    </View>
  );
}

WithdrawalForm.defaultProps = {
};

WithdrawalForm.propTypes = {
  availableBalance: PropTypes.number.isRequired,
  getIsFormCorrect: PropTypes.func.isRequired,
  onSaveAlert: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formSyncErrors: PropTypes.object.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={WithdrawalForm} />;

const form = reduxForm({
  form: 'withdrawalForm',
})(FormWithError);

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (formMap, _dispatch, props) => {
    const { agentLoad } = props;
    const path = 'api/agentwithdrawal';
    const onSuccess = () => {
      agentLoad({ forceReload: true });
      Actions.popTo('agent');
      toast(translate('applySuccess'));
    };
    dispatch(updateFormAction(formMap, path, null, true, onSuccess));
  },
  agentLoad: (params) => dispatch(agentLoadAction(params)),
});

export default connect(null, mapDispatchToProps)(form);
