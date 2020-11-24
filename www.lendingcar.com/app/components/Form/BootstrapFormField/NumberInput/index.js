/**
*
* TextInput
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
  // FormControl,
  ControlLabel,
} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import TranslatedMessage from 'components/TranslatedMessage';
import classNames from 'classnames';
import './style.scss';

let value;
// see doc in https://www.npmjs.com/package/react-number-format
function NumberInput(props) {
  const {
    isRequired, input, hasLabel = true, messages,
    placeholder, className, hasLabelOverflow = true, numberFormat = {} } = props;
  const { dirty, touched, error } = props.meta;
  const errorMessage = (dirty || touched) && error && <div className="text-danger error"><TranslatedMessage messages={messages} messageId={error} tagName="span" /></div>;
  const divClassName = classNames({
    [className]: true,
    'has-error': !!((dirty || touched) && error),
  });
  const labelClassName = classNames({
    textOverflow: hasLabelOverflow,
  });
  const errStyle = ((dirty || touched) && error) ? { paddingBottom: '18px' } : {};
  const { valueType, ...numberFormatProps } = numberFormat;
  const { onChange, ...inputProps } = input;
  const onValueChange = (valueObject) => {
    // console.log('onValueChange', valueObject);
    // supported valueType: floatValue, value, formattedValue
    value = valueObject[valueType || 'value'];
    onChange(value);
  };
  const onBlur = (event) => {
    // console.log(e.target, d);
    const target = event.target;
    target.value = value || target.value;
    inputProps.onBlur(event);
  };
  return (
    <div className={divClassName} style={errStyle}>
      {hasLabel && <ControlLabel className={labelClassName}>
        {isRequired && '*'}
        <TranslatedMessage messages={messages} messageId={input.name} /></ControlLabel>}
      <NumberFormat
        placeholder={placeholder}
        {...inputProps}
        onBlur={onBlur}
        {...numberFormatProps}
        className="form-control"
        onValueChange={onValueChange}
        autoComplete="true"
      />
      {/* <FormControl type="number" placeholder={placeholder} {...input} /> */}
      {errorMessage}
    </div>
  );
}

NumberInput.propTypes = {
  isRequired: PropTypes.bool,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  hasLabelOverflow: PropTypes.bool,
  numberFormat: PropTypes.object,
};

export default NumberInput;
