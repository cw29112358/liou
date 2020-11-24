/**
*
* CompareModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import TranslatedMessage from 'components/TranslatedMessage';
import { Modal } from 'antd';
import messages from './messages';
import './style.scss';

function InsuranceModal(props) {
  const { show, onHide } = props;
  return (
    <Modal
      title={<TranslatedMessage messages={messages} messageId="insurancePolicyTitle" tagName="span" />}
      visible={show}
      onOk={onHide}
      onCancel={onHide}
      okText={<TranslatedMessage messages={messages} messageId="insurancePolicyOKButton" tagName="span" />}
      cancelText={<TranslatedMessage messages={messages} messageId="insurancePolicyCancelButton" tagName="span" />}
      wrapClassName="insurance-modal"
    >
      <TranslatedMessage messages={messages} messageId="insurancePolicy">
        { (txt) => (
          <div>
            { txt.split('\r\n').map((line, i) => <div key={i} className="policy-line">{line}</div>) }
          </div>
        ) }
      </TranslatedMessage>
    </Modal>
  );
}

InsuranceModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default InsuranceModal;
