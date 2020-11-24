import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';

const fileTypes = {
  image: 'image/*',
  jpg: '.jpg',
  pdf: 'application/pdf',
};

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const fileName = this.props.input.name;
    const fileBlob = new Blob((e.target.files), { type: this.getFileTypeCode() });
    this.props.onUpload(fileName, fileBlob);
  }

  getFileTypeCode() {
    const { fileType } = this.props;
    return fileTypes[fileType];
  }

  render() {
    const { input, meta: { error }, messages } = this.props;
    const fileTypeCode = this.getFileTypeCode();
    // TODO: understand controled vs uncontroled input better instead of using value=""
    return (
      <div className="fileinput fileinput-new" data-provides="fileinput">
        <FormControl {...input} value="" type="hidden" />
        {error && <span>{error}</span>}
        <span className="btn btn-default btn-file">
          <span className="fileinput-new"><TranslatedMessage messages={messages} messageId="upload" /></span>
          <input type="file" accept={fileTypeCode} onChange={this.onChange} />
        </span>
        <span className="fileinput-filename"></span>
      </div>
    );
  }
}

FileInput.propTypes = {
  messages: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  onUpload: PropTypes.func,
  fileType: PropTypes.string,
};

export default FileInput;
