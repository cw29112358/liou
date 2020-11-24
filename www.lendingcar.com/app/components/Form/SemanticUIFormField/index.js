import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import './style.scss';

const SemanticUIFormField = (props) => {
  const { meta: { error }, ...inputProps } = props;
  const { type } = props;
  // const error = props.meta.error;
  if (['email', 'text', 'password'].includes(type)) {
    return <Form.Input {...inputProps} error={!!error} />;
  } else if (type === 'select') {
    return <Form.Select {...inputProps} error={error} />;
  } else if (type === 'radio') {
    return <Form.Radio {...inputProps} error={error} />;
  }
  return <Form.Checkbox {...inputProps} error={error} />;
};

SemanticUIFormField.propTypes = {
  // input: PropTypes.any,
  type: PropTypes.string,
  // label: PropTypes.string,
  // placeholder: PropTypes.string,
  meta: PropTypes.any,
};

export default SemanticUIFormField;
