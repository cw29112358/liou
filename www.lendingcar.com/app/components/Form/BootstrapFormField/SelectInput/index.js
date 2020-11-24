/**
*
* Select
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import { intlShape } from 'react-intl';
import _ from 'lodash';
import classNames from 'classnames';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  height: 10px;
  text-align: left;
`;

function SelectInput(props) {
  const { isRequired, customOptions, input, placeholder, messages, className, intl, defaultOption, hasDefaultOption } = props;
  const { hasLabel = true, hasLabelOverflow = true } = props;
  const { dirty, touched, error } = props.meta;
  let errorMessage = null;
  const hasError = (dirty || touched) && error;
  if (hasError) {
    errorMessage = (<ErrorMessage className="text-danger error">
      <TranslatedMessage messages={messages} messageId={error} tagName="span" />
    </ErrorMessage>);
  } else {
    errorMessage = (<ErrorMessage></ErrorMessage>);
  }
  const divClassName = classNames({
    [className]: true,
  });
  const labelClassName = classNames({
    textOverflow: hasLabelOverflow,
  });
  const FormControlClassName = classNames({
    error: hasError,
  });
  const camelCaseDefaultOption = _.camelCase(defaultOption) || (hasDefaultOption ? _.camelCase('select an option') : '');
  const messageDefaultOption = messages[camelCaseDefaultOption];
  const displayedDefaultOption = messageDefaultOption ? intl.formatMessage(messageDefaultOption) : _.startCase(camelCaseDefaultOption);
  return (
    <div className={divClassName}>
      {
        hasLabel &&
        <ControlLabel className={labelClassName} style={{ width: '100%', textAlign: 'left' }}>
          {isRequired && '*'}
          <TranslatedMessage messages={messages} messageId={input.name} />
        </ControlLabel>
      }
      <FormControl componentClass="select" placeholder={placeholder} {...input} className={FormControlClassName} autoComplete="true">
        {
          camelCaseDefaultOption &&
            <option value="" key="defaultOption">{displayedDefaultOption}</option>
        }
        {
          customOptions.map((val) => {
            const camelCaseVal = _.camelCase(val);
            const message = messages[camelCaseVal];
            const displayedValue = message ? intl.formatMessage(message) : _.startCase(camelCaseVal);
            return (
              <option value={camelCaseVal} key={camelCaseVal}>{displayedValue}</option>
            );
          })
        }
      </FormControl>
      {errorMessage}
    </div>
  );
}

SelectInput.propTypes = {
  isRequired: PropTypes.bool,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  customOptions: PropTypes.array,
  hasLabelOverflow: PropTypes.bool,
  intl: intlShape,
  defaultOption: PropTypes.string,
  hasDefaultOption: PropTypes.bool,
};

export default SelectInput;
