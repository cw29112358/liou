/*
 *
 * LandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import { FAQ_LINK, OTHER_LINK } from 'utils/constants';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import './style.scss';

// const { Meta } = Card;

// const cardImages = [default1, default2, default3];

export class FAQ extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // const CARDS = [
    //   {
    //     title: 'firstCardTitle',
    //     message: 'firstCardDescribe',
    //   },
    //   {
    //     title: 'secondCardTitle',
    //     message: 'secondCardDescribe',
    //   },
    //   {
    //     title: 'thirdCardTitle',
    //     message: 'thirdCardDescribe',
    //   },
    //   {
    //     title: 'fourthCardTitle',
    //     message: 'fourthCardDescribe',
    //   },
    // ];

    // const translatedFirstCardTitle = formatMessage(this.props.intl, messages, 'firstCardTitle');

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }} className="card-page">
        <h3 className="title"><TranslatedMessage messages={messages} messageId="cardTitle" />:</h3>
        <p className="description"><TranslatedMessage messages={messages} messageId="cardDescribe" />.
        </p>
        <Row
          type="flex" justify="center" style={{ paddingBottom: 30 }} className="card-display"
        >

          {/* {CARDS.map((card, index) =>
                <Col span={6} key={index}>
                  <Card title={<TranslatedMessage messages={messages} messageId={card.title} />}>
                    <TranslatedMessage messages={messages} messageId={card.message} />
                  </Card>
            </Col>)}*/}
          <Col xs={10} sm={6}>
            <Card className="card-description" >
              <h3 className="card-title"><TranslatedMessage messages={messages} messageId="firstCardTitle" /></h3>
              <p><TranslatedMessage messages={messages} messageId="firstCardDescribe" /></p>
            </Card>
          </Col>
          <Col xs={10} sm={6}>
            <Card className="card-description">
              <h3 className="card-title"><TranslatedMessage messages={messages} messageId="secondCardTitle" /></h3>
              <p><TranslatedMessage messages={messages} messageId="secondCardDescribe" /></p>
            </Card>
          </Col>
          <Col xs={10} sm={6}>
            <Card className="card-description">
              <h3 className="card-title"><TranslatedMessage messages={messages} messageId="thirdCardTitle" /></h3>
              <p><TranslatedMessage messages={messages} messageId="thirdCardDescribe" /></p>
              <p><a href={OTHER_LINK.insurance} target="_blank"><TranslatedMessage messages={messages} messageId="clickHere" /></a> <TranslatedMessage messages={messages} messageId="toGetAQuote" />.</p>
            </Card>
          </Col>
          <Col xs={10} sm={6}>
            <Card className="card-description">
              <h3 className="card-title"><TranslatedMessage messages={messages} messageId="fourthCardTitle" /></h3>
              <p><TranslatedMessage messages={messages} messageId="fourthCardDescribe" /></p>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={32} style={{ float: 'right' }}>
            <a href={FAQ_LINK.en} target="_blank"><TranslatedMessage messages={messages} messageId="cardFooter" />&nbsp;&gt;</a>
          </Col>
        </Row>
      </div>
    );
  }
}

FAQ.propTypes = {
  intl: PropTypes.object,
};

export default FAQ;
