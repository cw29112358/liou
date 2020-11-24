/**
*
* StepsForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import pick from 'lodash/pick';
import * as FormField from 'components/Form/BootstrapFormField';

// import TranslatedMessage from 'components/TranslatedMessage';
// import messages from './messages';

const formFieldsObject = {
  stepInformation: {
    type: 'step',
    title: 'Dealer Information',
    isFieldArray: true,
  },
};

function StepsForm(props) {
  const { handleSubmit, ...otherProps } = props;
  const groupSteps = pick(formFieldsObject, 'stepInformation');
  return (
    <form onSubmit={handleSubmit}>
      <FormField.Group fieldsObject={groupSteps} {...otherProps} />
    </form>
  );
}

StepsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'StepsForm',
  // destroyOnUnmount: false,
  // enableReinitialize: true,
})(StepsForm);
