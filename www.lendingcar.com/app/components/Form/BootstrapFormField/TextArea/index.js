/**
*
* TextArea
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import classNames from 'classnames';
import '../style.scss';

function TextArea(props) {
  // eslint-disable-line react/prefer-stateless-function
  const { isRequired, input, hasLabel = true, messages, placeholder, className, isFieldArray = false, hasLabelOverflow = true } = props;
  const { dirty, touched, error } = props.meta;

  let errorMessage = null;
  if (!isFieldArray) {
    errorMessage = (dirty || touched) && error &&
      <div className="text-danger error"><TranslatedMessage messages={messages} messageId={error} tagName="span" /></div>;
  }
  const divClassName = classNames({
    [className]: true,
    'has-error': !!((dirty || touched) && error),
  });
  const labelClassName = classNames({
    textOverflow: hasLabelOverflow,
  });
  const errStyle = ((dirty || touched) && error) ? { paddingBottom: '18px' } : {};

  return (
    <div className={divClassName} style={errStyle}>
      {hasLabel && <ControlLabel className={labelClassName}>
        {isRequired && '*'}
        <TranslatedMessage messages={messages} messageId={input.name} />
      </ControlLabel>}
      <FormControl placeholder={placeholder} {...input} componentClass="textarea" />
      {!isFieldArray && errorMessage}
    </div>
  );
}

TextArea.propTypes = {
  isRequired: PropTypes.bool,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  isFieldArray: PropTypes.bool,
  hasLabelOverflow: PropTypes.bool,
};

export default TextArea;
