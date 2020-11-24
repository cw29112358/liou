import React from 'react';
import PropTypes from 'prop-types';
// import { FormControl } from 'react-bootstrap';
// import TranslatedMessage from 'components/TranslatedMessage';
import Avatar from 'components/Avatar';
import { getImageBlobMD5 } from 'utils/helpers';
import '../style.scss';

const fileTypes = {
  image: 'image/*',
  jpg: '.jpg',
};

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    // console.log('onChange');
    const fileBlob = new Blob((e.target.files), { type: this.getFileTypeCode() });
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileMD5 = getImageBlobMD5(reader.result);
      const fileName = `${this.props.fileDirectory}/${fileMD5}.${fileExt}`;
      this.props.onUpload(fileName, fileBlob, this.props.input.name, this.props);
      this.props.input.onChange(fileName);
    };
  }

  getFileTypeCode() {
    const { fileType } = this.props;
    return fileTypes[fileType];
  }

  render() {
    const { input, width, height } = this.props;
    const fileTypeCode = this.getFileTypeCode();// data-provides="fileinput"
    const inputHeight = height + 20;
    return (
      <div className="fileinput fileinput-new" >
        {/* <FormControl {...input} value="" type="hidden" /> */}
        <div className="btn btn-default btn-file">
          <input className="btn btn-default btn-file" style={{ height: inputHeight }} type="file" accept={fileTypeCode} onChange={this.onChange} />
          <Avatar url={input.value} width={width} height={height} />
        </div>
        {/* <span className="fileinput-filename"></span> */}
      </div>
    );
  }
}

FileInput.propTypes = {
  input: PropTypes.object,
  onUpload: PropTypes.func,
  fileType: PropTypes.string,
  fileDirectory: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default FileInput;
