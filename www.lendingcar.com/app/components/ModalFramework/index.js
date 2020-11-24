/**
*
* ModalFramework Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import './style.scss';

class ModalFramework extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { visible, onClose, children, width, wrapClassName, maskClosable } = this.props;
    return (
      <div className="modal-framework">
        <Modal
          title="Modal"
          visible={visible}
          onCancel={onClose}
          destroyOnClose
          width={width}
          wrapClassName={wrapClassName}
          maskClosable={maskClosable}
        >
          { children }
        </Modal>
      </div>
    );
  }
}

ModalFramework.defaultProps = {
  wrapClassName: '',
  visible: true,
  onClose: () => null,
  maskClosable: false,
};

ModalFramework.propTypes = {
  wrapClassName: PropTypes.string,
  width: PropTypes.any,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any,
  maskClosable: PropTypes.bool,
};

export default ModalFramework;
