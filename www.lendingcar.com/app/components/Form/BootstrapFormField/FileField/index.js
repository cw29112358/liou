/**
*
* FileField
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import TranslatedMessage from 'components/TranslatedMessage';
import classNames from 'classnames';
import FileInput from './FileInput';

function FileField(props) {
  const { isRequired, input: { value, name }, messages, showPDFModal, hasLabelOverflow = true } = props;
  const shouldButtonShown = !!value;
  const onShowClick = showPDFModal.bind(this, value);
  const divClassName = classNames({
    'col-xs-7': true,
    'text-right': true,
    'font-bold': true,
    textOverflow: hasLabelOverflow,
  });
  return (
    <div>
      <div className={divClassName}>
        {isRequired && '*'}
        <TranslatedMessage messages={messages} messageId={name} />
      </div>
      <div className="col-xs-5">
        <FileInput name={name} {...props} />
        {shouldButtonShown && <span role="button" onClick={onShowClick}>&nbsp;&nbsp;&nbsp;&nbsp;{'✔'}</span>}
      </div>
    </div>
  );
}

FileField.propTypes = {
  isRequired: PropTypes.bool,
  input: PropTypes.object,
  messages: PropTypes.object,
  showPDFModal: PropTypes.func,
  hasLabelOverflow: PropTypes.bool,
};

export default FileField;
