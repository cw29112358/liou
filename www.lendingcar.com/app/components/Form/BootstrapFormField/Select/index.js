/**
*
* Select
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import { intlShape } from 'react-intl';
import _ from 'lodash';
import classNames from 'classnames';

function Select(props) {
  const { isRequired, defaultOption, customOptions, input, placeholder, hasLabel = true, messages, className, isFieldArray = false, hasLabelOverflow = true, intl } = props;
  const { dirty, touched, error } = props.meta;
  let errorMessage = null;
  if (!isFieldArray) {
    errorMessage = (dirty || touched) && error && <div className="text-danger error"><TranslatedMessage messages={messages} messageId={error} tagName="span" /></div>;
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
        <TranslatedMessage messages={messages} messageId={input.name} /></ControlLabel>}
      <FormControl componentClass="select" placeholder={placeholder} {...input}>
        {defaultOption && <option value={null} key="defaultOption">{defaultOption}</option>}
        {customOptions.map((val) => {
          const displayedValue = messages[val] ? intl.formatMessage(messages[val]) : val;
          return (
            <option value={val} key={_.camelCase(val)}>{displayedValue}</option>
          );
        })}
      </FormControl>
      {!isFieldArray && errorMessage}
    </div>
  );
}

Select.propTypes = {
  isRequired: PropTypes.bool,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  customOptions: PropTypes.array,
  isFieldArray: PropTypes.bool,
  hasLabelOverflow: PropTypes.bool,
  intl: intlShape,
  defaultOption: PropTypes.string,
};

export default Select;
