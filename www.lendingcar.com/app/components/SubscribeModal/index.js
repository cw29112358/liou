/**
*
* SubscribeModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
// import { FormattedMessage } from 'react-intl';
import TranslatedMessage from 'components/TranslatedMessage';
import styled from 'styled-components';
import SignUpForm from 'forms/SignUpForm';

import messages from './messages';
const Span = styled.span`
  font-size: 12px;
  float: left;
  width: 100%;
  line-height: 15px;
  text-align: left;
`;

const SubscribeModal = ({ show, onHide, isLimited, ...formProps }) => (
  <Modal show={show} bsSize="sm" onHide={!isLimited ? onHide : undefined}>
    <Modal.Header closeButton={!isLimited}>
      <Span><TranslatedMessage messages={messages} messageId="description" tagName="span" /></Span>
    </Modal.Header>
    <Modal.Body>
      <SignUpForm {...formProps} />
    </Modal.Body>
  </Modal>
  );

SubscribeModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  isLimited: PropTypes.bool,
};

export default SubscribeModal;
