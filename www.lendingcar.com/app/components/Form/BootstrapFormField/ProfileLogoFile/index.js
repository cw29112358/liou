/**
*
* ProfileLogoFile
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import FileInput from 'components/Form/BootstrapFormField/ProfileLogoFile/FileInput';

function ProfileLogoFile(props) {
  const { isRequired, input: { name }, hasLabel = true, messages, className, width, height } = props;
  return (
    <div>
      <div className={className}>
        {hasLabel && <ControlLabel>
          {isRequired && '*'}
          <TranslatedMessage messages={messages} messageId={name} /></ControlLabel>}
        <FileInput name={name} width={width} height={height} {...props} />
      </div>
    </div>
  );
}

ProfileLogoFile.propTypes = {
  isRequired: PropTypes.bool,
  hasLabel: PropTypes.bool,
  input: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  messages: PropTypes.object,
  className: PropTypes.string,
};

export default ProfileLogoFile;
