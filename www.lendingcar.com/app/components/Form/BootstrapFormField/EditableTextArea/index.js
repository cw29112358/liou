/**
*
* EditableTextArea
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import _ from 'lodash';
import { fromJS } from 'immutable';

function EditableTextArea(props) {
  const { input, disabled, handleSubmit, onSubmit, className } = props;
  const onChange = _.debounce((event) => {
    input.onChange(event);
    handleSubmit(() => {
      const savedValues = fromJS({
        [input.name]: event.target.value,
      });
      onSubmit(savedValues, null, props);
    })();
  }, 1000, {
    leading: true,
    trailing: false,
  });
  return (
    <ContentEditable className={className} html={input.value} disabled={disabled} {...input} onChange={onChange} />
  );
}

EditableTextArea.propTypes = {
  input: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default EditableTextArea;
