/**
*
* TestForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { Button } from 'react-bootstrap';
import pick from 'lodash/pick';
import { injectIntl, intlShape } from 'react-intl';
import * as FormField from 'components/Form/BootstrapFormField';
import { isRequired } from 'utils/validators';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';

const formFieldsObject = {
  // sampleRadioInputName: {
  //   type: 'radioInput',
  //   validate: [isRequired],
  //   // customOptions: [{ display: 'option1', value: 100 }, { display: 'option2', value: -2.9 }],
  //   // customOptions: ['international', 'foreign', 'unitedStates'],
  //   customOptions: [{
  //     display: 'Yes, I need collision protection',
  //     value: 'international',
  //     description: '*Covers car damage from collision, theft or vandalism',
  //     valueUnit: '/Month',
  //   }, {
  //     display: 'No, I will use my own insurance',
  //     value: 'unitedStates',
  //     description: '*Please bring your insurance for the leasing vehicle when you pick up at counter',
  //   }],
  //   className: 'col-sm-12',
  //   displayedOption: 'display',
  //   onChanged() {},
  // },
  // driverLicenseType: {
  //   type: 'select',
  //   validate: [isRequired],
  //   customOptions: ['international', 'foreign', 'unitedStates'],
  //   className: 'col-sm-4',
  // },
  // pickupDate: {
  //   type: 'text',
  //   validate: [isRequired],
  //   placeholder: 'MM/DD/YYYY',
  //   className: 'col-sm-4',
  // },
  // pickupTime: {
  //   type: 'text',
  //   validate: [isRequired, isValidEmail],
  //   placeholder: 'XX:XX PM',
  //   className: 'col-sm-4',
  // },
  insurance: {
    type: 'switchInput',
    validate: [isRequired],
    customOptions: [{
      label:
        <div style={{ float: 'left' }}>
          <div>I need collision protection.</div>
          <div style={{ color: 'rgb(40, 216, 157)' }}>$200/Month</div>
        </div>,
      value: '200',
    }, {
      label:
        <div style={{ float: 'left' }}>
          <div>No, I will use my own insurance.</div>
          <div style={{ color: 'grey' }}>$0/Month</div>
        </div>,
      value: '0',
    }],
    className: 'col-sm-12',
    style: { color: '#28d89d', float: 'right' },
  },
};

class TestForm extends React.Component {// eslint-disable-line react/prefer-stateless-function

  render() {
    const { handleSubmit, submitting, intl, ...otherProps } = this.props;
    const groups = [
      pick(formFieldsObject, 'insurance'),
    ];

    return (
      <form onSubmit={handleSubmit} className="m-t">
        {groups.map((group, i) =>
          <div key={i}>
            <FormField.Group fieldsObject={group} {...otherProps} intl={intl} messages={messages} />
          </div>
        )}

        <div className="col-md-12 text-center">
          <Button type="submit" className="btn-brand-selected" disabled={submitting}>
            <TranslatedMessage messageId="submit" tagName="span" {...otherProps} />
          </Button>
        </div>
      </form>
    );
  }
}

TestForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  intl: intlShape.isRequired,
  change: PropTypes.func,
};

export default injectIntl(reduxForm({
  form: 'TestForm',
  // destroyOnUnmount: false,
  // enableReinitialize: true,
})(TestForm));
