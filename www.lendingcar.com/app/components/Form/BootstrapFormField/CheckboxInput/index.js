/**
*
* CheckboxInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Checkbox, ControlLabel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
// import { intlShape } from 'react-intl';
// import _ from 'lodash';
import classNames from 'classnames';
import styled from 'styled-components';

function CheckboxInput(props) {
  const { isRequired, customOptions, displayedOption, input, hasLabel = true,
    messages, className, isFieldArray = false, hasLabelOverflow = true, onChecked, onUnChecked } = props;
  const { dirty, touched, error } = props.meta;

  let errorMessage = null;
  if (!isFieldArray) {
    errorMessage = (dirty || touched) && error &&
    <div className="text-danger error">
      <TranslatedMessage messages={messages} messageId={error} tagName="span" />
    </div>;
  }
  const divClassName = classNames({
    [className]: true,
    'has-error': !!((dirty || touched) && error),
  });
  const labelClassName = classNames({
    textOverflow: hasLabelOverflow,
  });
  const onChange = (event) => {
    const checkBoxObject = JSON.parse(event.target.value);
    checkBoxObject.checked = !checkBoxObject.checked;
    if (checkBoxObject.checked) {
      onChecked(checkBoxObject);
    } else {
      onUnChecked(checkBoxObject);
    }
  };

  const Unit = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    color: #28d89d;
    font-weight: bold;
  `;

  return (
    <div className={divClassName}>
      {hasLabel && <ControlLabel className={labelClassName}>
        {isRequired && '*'}
        <TranslatedMessage messages={messages} messageId={input.name} />
      </ControlLabel>}
      <FormGroup>
        {customOptions.map((option, i) => {
          if (typeof option === 'object') {
            return (<div key={i} style={{ position: 'relative' }}>
              <Checkbox checked={option.checked} value={JSON.stringify(option)} key={i} onChange={onChange}><TranslatedMessage messageId={option[displayedOption]} tagName="span" messages={messages} /></Checkbox>
              {option.description && <span style={{ fontSize: '12px' }}><TranslatedMessage messageId={option.description} tagName="span" messages={messages} /></span>}
              {option.valueUnit && <Unit>${parseFloat(option.value).toFixed(2)}{option.valueUnit}</Unit>}
            </div>);
          }
          return (
            <Checkbox value={option} key={option} onChange={onChange}>{option}</Checkbox>
          );
        })}
      </FormGroup>
      {!isFieldArray && errorMessage}
    </div>
  );
}

CheckboxInput.propTypes = {
  isRequired: PropTypes.bool,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  className: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  displayedOption: PropTypes.string,
  customOptions: PropTypes.array,
  isFieldArray: PropTypes.bool,
  hasLabelOverflow: PropTypes.bool,
  onChecked: PropTypes.func,
  onUnChecked: PropTypes.func,
};

export default CheckboxInput;
