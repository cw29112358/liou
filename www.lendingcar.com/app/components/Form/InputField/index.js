import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';

const BootstrapFormField = ({ input, type, placeholder, meta: { error } }) => (
  <FormGroup bsSize="large">
    <FormControl type={type} placeholder={placeholder} {...input} />
    {error && <span className="text-danger">{error}</span>}
  </FormGroup>
);

BootstrapFormField.propTypes = {
  input: PropTypes.any,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.any,
};

export default BootstrapFormField;
