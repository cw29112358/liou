/**
*
* TextInput
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import classNames from 'classnames';
import '../style.scss';

function TextInput(props) { // eslint-disable-line react/prefer-stateless-function
  const { isRequired, input, type, hasLabel = true, messages, placeholder, className, meta: { dirty, touched, error }, isFieldArray = false, hasLabelOverflow = true } = props;
  const isError = !!((dirty || touched) && error);
  let errorMessage = null;
  if (!isFieldArray) {
    errorMessage = isError &&
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
  const errStyle = isError ? { paddingBottom: '10px' } : {};

  return (
    <div className={divClassName} style={errStyle}>
      {
        hasLabel &&
        <ControlLabel className={labelClassName}>
          { isRequired && '*' }
          <TranslatedMessage messages={messages} messageId={input.name} />
        </ControlLabel>
      }
      <FormControl type={type} placeholder={placeholder} {...input} autoComplete="true" />
      { !isFieldArray && errorMessage }
    </div>
  );
}

TextInput.propTypes = {
  isRequired: PropTypes.bool,
  input: PropTypes.object,
  type: PropTypes.string,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  meta: PropTypes.object,
  hasLabelOverflow: PropTypes.bool,
  isFieldArray: PropTypes.bool,
};

export default TextInput;
