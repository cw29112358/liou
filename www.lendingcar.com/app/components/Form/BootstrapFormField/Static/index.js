/**
*
* Static
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel } from 'react-bootstrap';
import classNames from 'classnames';
import TranslatedMessage from 'components/TranslatedMessage';


function Static(props) {
  const { isRequired, input, hasLabel = true, messages, className, hasLabelOverflow = true, prefix, suffix } = props;
  const labelClassName = classNames({
    textOverflow: hasLabelOverflow,
  });
  return (
    <div className={className}>
      {hasLabel && <ControlLabel className={labelClassName}>
        {isRequired && '*'}
        <TranslatedMessage messages={messages} messageId={input.name} />
      </ControlLabel>}
      <FormControl.Static>{prefix}{input.value}&nbsp;<TranslatedMessage messages={messages} messageId={suffix} /></FormControl.Static>
    </div>
  );
}

Static.propTypes = {
  isRequired: PropTypes.bool,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  className: PropTypes.string,
  input: PropTypes.object,
  hasLabelOverflow: PropTypes.bool,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

export default Static;
