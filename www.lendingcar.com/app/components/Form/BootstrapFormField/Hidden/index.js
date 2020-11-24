/**
*
* Hidden
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

function Hidden(props) {
  const { input } = props;
  return (
    <FormControl {...input} type="hidden" />
  );
}

Hidden.propTypes = {
  input: PropTypes.object,
};

export default Hidden;
