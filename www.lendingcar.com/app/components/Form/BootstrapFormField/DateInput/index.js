/**
*
* TextInput
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';
import './react-datepicker.css';

function DateInput(props) {
  const { isRequired, input, hasLabel = true, label, messages, placeholder, className, hasLabelOverflow = true } = props;
  const { dirty, touched, error } = props.meta;

  const errorMessage = (dirty || touched) && error &&
  <div className="text-danger error"><TranslatedMessage messages={messages} messageId={error} tagName="span" /></div>;
  const divClassName = classNames({
    [className]: true,
    'has-error': !!((dirty || touched) && error),
  });
  const labelClassName = classNames({
    textOverflow: hasLabelOverflow,
  });

  return (
    <div className={divClassName}>
      {hasLabel && <ControlLabel className={labelClassName}>
        {isRequired && '*'}
        <TranslatedMessage messages={messages} messageId={input.name} messageName={label} /></ControlLabel>}
      <div >
        <DatePicker type="date" className="form-control" {...input} dateForm="MM/DD/YYYY" placeholderText={placeholder} selected={input.value ? moment(input.value, 'MM/DD/YYYY') : null} />
      </div>
      {errorMessage}
    </div>
  );
}

DateInput.propTypes = {
  isRequired: PropTypes.bool,
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  messages: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  hasLabelOverflow: PropTypes.bool,
};

export default DateInput;
