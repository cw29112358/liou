/**
*
* ContractModel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
// import { isMobile } from 'react-device-detect';

import { printByDomId } from 'utils/helpers';
import BookingContract from 'components/BookingContract';
import './style.scss';

const onPrintClick = () => printByDomId('booking-contract');

function ContractModal(props) {
  const { show, onHide, contractInfo } = props;
  return (
    <Modal show={show} onHide={onHide} bsSize="lg" className="contract-modal">
      <Modal.Header closeButton className="modal-title">
      </Modal.Header>
      <Modal.Body>
        <BookingContract
          {...props}
          titleId="tripInformation"
          iconType="printer"
          buttonId="print"
          isShow
          onEdit={onPrintClick}
          bookingData={contractInfo}
        />
      </Modal.Body>
    </Modal>
  );
}

ContractModal.defaultProps = {
  show: false,
};

ContractModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  contractInfo: PropTypes.object,
};

export default ContractModal;
