/**
*
* RadioInput
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, Radio, ControlLabel } from 'react-bootstrap';
import styled from 'styled-components';
import TranslatedMessage from 'components/TranslatedMessage';

const Unit = styled.span`
  margin-left: 10px;
  color: #28d89d;
  font-weight: bold;
`;

function RadioInput(props) { // eslint-disable-line react/prefer-stateless-function
  const { isRequired, customOptions, displayedOption, input, hasLabel = true, messages, className, meta: { dirty, touched, error }, hasLabelOverflow = true, isFieldArray = false } = props;
  const isError = !!((dirty || touched) && error);
  let errorMessage = null;
  if (!isFieldArray) {
    errorMessage = (dirty || touched) && error &&
    <div className="text-danger error">
      <TranslatedMessage messages={messages} messageId={error} tagName="span" />
    </div>;
  }
  const divClassName = classNames({
    [className]: true,
    'has-error': isError,
  });
  const labelClassName = classNames({
    textOverflow: hasLabelOverflow,
  });
  const errStyle = isError ? { paddingBottom: '18px' } : {};

  return (
    <div className={divClassName} style={errStyle}>
      {hasLabel &&
        <ControlLabel className={labelClassName}>
          {isRequired && '*'}
          <TranslatedMessage messages={messages} messageId={input.name} />
        </ControlLabel>
      }
      <FormGroup {...input}>
        {customOptions.map((option, i) => {
          if (typeof option === 'object') {
            const checked = input.value === option.value;
            return (
              <div key={i} style={{ position: 'relative' }}>
                <Radio name={input.name} value={option.value} checked={checked} onChange={input.onChange} >
                  <TranslatedMessage messages={messages} messageId={option[displayedOption]} />
                </Radio>
                { option.description &&
                  <span style={{ fontSize: '12px' }}>
                    <TranslatedMessage messages={messages} messageId={option.description} />
                  </span> }
                { option.valueUnit &&
                  <Unit className="unit-style">
                    ${option.value}<TranslatedMessage messages={messages} messageId={option.valueUnit} />
                  </Unit> }
              </div>
            );
          }
          return (
            <Radio key={i} inline name={input.name} value={option} checked={input.value === option} onChange={input.onChange}>
              <TranslatedMessage messages={messages} messageId={option} />
            </Radio>
          );
        })}
      </FormGroup>
      {!isFieldArray && errorMessage}
    </div>
  );
}

RadioInput.propTypes = {
  isRequired: PropTypes.bool,
  input: PropTypes.object,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  className: PropTypes.string,
  meta: PropTypes.object,
  hasLabelOverflow: PropTypes.bool,
  isFieldArray: PropTypes.bool,
  customOptions: PropTypes.array,
  displayedOption: PropTypes.string,
};

export default RadioInput;
