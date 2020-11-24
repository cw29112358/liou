/**
*
* SelectHorizontal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import { intlShape } from 'react-intl';
import _ from 'lodash';
import classNames from 'classnames';

function SelectHorizontal(props) {
  const { isRequired, defaultOption, customOptions, customObjectsArray, displayedOption, input, placeholder, hasLabel = true, messages, className, isFieldArray = false, hasLabelOverflow = true, intl } = props;
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

  return (
    <div className={divClassName}>
      <div className="col-sm-3">
        {hasLabel && <ControlLabel className={labelClassName}>
          {isRequired && '*'}
          <TranslatedMessage messages={messages} messageId={input.name} /></ControlLabel>}
      </div>
      <div className="col-sm-3">
        <FormControl componentClass="select" placeholder={placeholder} {...input}>
          {defaultOption && <option value={null} key="defaultOption">{defaultOption}</option>}
          {customOptions && customOptions.map((val) => {
            const displayedValue = messages[val] ? intl.formatMessage(messages[val]) : val;
            return (
              <option value={_.camelCase(val)} key={_.camelCase(val)}>{displayedValue}</option>
            );
          })}
          {customObjectsArray && customObjectsArray.map((valObject) => {
            const displayedValue = messages[valObject[displayedOption]] ? intl.formatMessage(messages[valObject[displayedOption]]) : valObject[displayedOption];
            return (
              <option value={JSON.stringify(valObject)} key={_.camelCase(valObject[displayedOption])}>{displayedValue}</option>
            );
          })}
        </FormControl>
        {!isFieldArray && errorMessage}
      </div>
    </div>
  );
}

SelectHorizontal.propTypes = {
  isRequired: PropTypes.bool,
  defaultOption: PropTypes.string,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  customOptions: PropTypes.array,
  customObjectsArray: PropTypes.array,
  isFieldArray: PropTypes.bool,
  hasLabelOverflow: PropTypes.bool,
  intl: intlShape,
  displayedOption: PropTypes.string,
};

export default SelectHorizontal;
