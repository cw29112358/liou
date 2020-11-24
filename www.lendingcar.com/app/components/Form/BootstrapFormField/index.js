import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form/immutable';
import { FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

import TranslatedMessage from 'components/TranslatedMessage';
import TextInput from './TextInput';
import CheckboxInput from './CheckboxInput';
import RadioInput from './RadioInput';
import NumberInput from './NumberInput';
import DateInput2 from './DateInput2';
import TableInput from './TableInput';
import ArrayInput from './ArrayInput';
import SelectInput from './SelectInput';
import Select from './Select';
import SelectHorizontal from './SelectHorizontal';
import TextArea from './TextArea';
import EditableTextArea from './EditableTextArea';
import FileField from './FileField';
import Static from './Static';
import Hidden from './Hidden';
import Step from './Step';
import EditableCard from './EditableCard';
import ProfileLogoFile from './ProfileLogoFile';
import SwitchButton from './SwitchButton';
import messages from './messages';
import './style.scss';

const allFields = {
  text: TextInput,
  email: TextInput,
  password: TextInput,
  checkbox: CheckboxInput,
  radioInput: RadioInput,
  number: NumberInput,
  numberNoSpin: NumberInput,
  date: DateInput2,
  table: TableInput,
  array: ArrayInput,
  selectInput: SelectInput,
  select: Select,
  selectHorizontal: SelectHorizontal,
  textArea: TextArea,
  editableTextArea: EditableTextArea,
  file: FileField,
  static: Static,
  hidden: Hidden,
  step: Step,
  editableCard: EditableCard,
  profileLogo: ProfileLogoFile,
  switchInput: SwitchButton,
};

export const Group = ({ fieldsObject, ...otherProps }) => {
  const renderFieldObject = (fieldObject, name) => {
    const isRequired = fieldObject.validate ? fieldObject.validate.some((d) => d.name === 'isRequired') : false;
    if (fieldObject.isFieldArray) {
      return (
        <FieldArray isRequired={isRequired} {...fieldObject} {...otherProps} component={allFields[fieldObject.type]} key={name} name={name} />
      );
    }
    return (
      <Field isRequired={isRequired} {...fieldObject} {...otherProps} component={allFields[fieldObject.type]} key={name} name={name} />
    );
  };

  return (
    <FormGroup className="row">
      {_.map(fieldsObject, renderFieldObject)}
    </FormGroup>
  );
};

Group.propTypes = {
  fieldsObject: PropTypes.object,
};

const BootstrapFormField = ({ input, type, placeholder, meta: { dirty, error } }) => { // only for SignUpForm
  const errMsg = messages[error] ? <TranslatedMessage messages={messages} messageId={error} tagName="span" /> : error;

  return (
    <FormGroup bsSize="large">
      <FormControl type={type} placeholder={placeholder} {...input} />
      {dirty && <div className="text-danger error">{errMsg}</div>}
    </FormGroup>
  );
};

BootstrapFormField.propTypes = {
  input: PropTypes.any,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.any,
};

export default BootstrapFormField;
