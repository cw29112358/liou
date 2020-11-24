import React from 'react';
import htmlContent from './form.html';

function UploadForm() {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

export default UploadForm;
