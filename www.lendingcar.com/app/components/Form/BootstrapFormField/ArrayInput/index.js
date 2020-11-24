/**
*
* ArrayInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Field } from 'redux-form/immutable';
import TextInput from 'components/Form/BootstrapFormField/TextInput';
import Select from 'components/Form/BootstrapFormField//Select';
import TranslatedMessage from 'components/TranslatedMessage';

const allFields = {
  text: TextInput,
  number: TextInput,
  select: Select,
};

function ArrayInput(props) {
  const { fields, messages, rowFields } = props;
  if (!fields) return null;
  return (
    <div>
      <Button onClick={() => fields.push({})}><TranslatedMessage messages={messages} messageId="addPlan" tagName="span" /></Button>
      {fields.map(renderPlan.bind(this, fields, rowFields, messages))}
    </div>
  );
}

const renderPlan = (fields, rowFields, messages, plan, key) => {
  if (!fields) return null;
  const onRemove = () => fields.remove(key);
  return (
    <div className="row" key={key}>
      {
        rowFields.map(({ name, type, ...otherProps }, i) => (
          <Field key={i} name={`${plan}.${name}`} type={type} {...otherProps} messages={messages} component={allFields[type]} />
        ))
      }
      <Button onClick={onRemove} bsStyle="danger"><i className="fa fa-trash" aria-hidden="true"></i></Button>
    </div>
  );
};

ArrayInput.propTypes = {
  fields: PropTypes.object,
  rowFields: PropTypes.array,
  messages: PropTypes.object,
};

export default ArrayInput;
