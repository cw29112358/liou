/**
*
* CompareModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Row, Col } from 'antd';

import TranslatedMessage from 'components/TranslatedMessage';
import { COMPARE_CONTENT } from '../../constants';
import messages from './messages';
import './style.scss';

function CompareModal(props) {
  const { show, onHide } = props;
  const renderItem = (item) => (
    <Col>
      <div className="item-title font-medium">
        <TranslatedMessage messages={messages} messageId={item.title} tagName="span" />
      </div>
      <div className="item-text">
        <TranslatedMessage messages={messages} messageId={item.feture} tagName="span" />
      </div>
    </Col>
  );
  return (
    <div >
      <Modal show={show} onHide={onHide} bsSize="large" className="landing-compare">
        <Modal.Header closeButton>
          <div className="el-center compare-title">
            <span className="el-center small-circle small-circle-left" />
            <TranslatedMessage messages={messages} messageId="title" tagName="span" />
            <span className="el-center small-circle small-circle-right" />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Row justify="center" type="flex">
            <Row justify="center" type="flex" className="compare-head font-medium" >
              <div className="compare-head-title compare-head-left">
                <TranslatedMessage messages={messages} messageId="lending" tagName="span" />
              </div>
              <div className="el-center compare-vs">VS</div>
              <div className="compare-head-title compare-head-right">
                <TranslatedMessage messages={messages} messageId="general" tagName="span" />
              </div>
            </Row>
          </Row>
          {
            COMPARE_CONTENT && COMPARE_CONTENT.map((item, index) =>
              <Row justify="space-between" type="flex" key={index} className="compare-item">
                <Col lg={{ span: 8, push: 3 }} xs={{ span: 11 }} className="compare-item-left">
                  { renderItem(item.lendingCar) }
                </Col>
                <Col lg={{ span: 7, pull: 3 }} xs={{ span: 11 }}className="compare-item-right">
                  { renderItem(item.general) }
                </Col>
              </Row>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

CompareModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default CompareModal;
