/**
*
* AlertModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

import TranslatedMessage from 'components/TranslatedMessage';
// import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';

const Span = styled.span`
  font-size: 18px;
  width: 100%;
  line-height: 15px;
  text-align: left;
`;

const SpanBody = styled.span`
  padding: 20px;
  display: inline-block;
`;

function AlertModal(props) {
  const { show, onHide, message } = props;
  let displayMessage = message;
  if (typeof message === 'object') {
    displayMessage = message.message;
  }
  return (
    <Modal show={show} onHide={onHide} bsSize="sm">
      <Modal.Header closeButton className="btn-primary alert-modal-header">
        <Span><i className="fa fa-exclamation-circle" ></i>&nbsp;<TranslatedMessage messages={messages} messageId="header" tagName="span" /></Span>
      </Modal.Header>
      <Modal.Body>
        <SpanBody><TranslatedMessage messages={messages} messageId={displayMessage} tagName="span" /></SpanBody>
      </Modal.Body>
    </Modal>
  );
}

AlertModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default AlertModal;
