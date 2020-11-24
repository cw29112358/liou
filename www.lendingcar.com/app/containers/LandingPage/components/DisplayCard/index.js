/*
 *
 * LandingPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Row, Card } from 'antd';

import TranslatedMessage from 'components/TranslatedMessage';

import './style.scss';
import messages from '../../messages';
import { CARDS } from '../../constants';
import default1 from '../../assets/card-one.png';
import default2 from '../../assets/card-two.png';
import default3 from '../../assets/card-three.png';

const { Meta } = Card;

const cardImages = [default1, default2, default3];

export class DisplayCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Row
        type="flex" justify="space-between" style={{ paddingBottom: 30 }} className="displayCard"
      >
        {CARDS.map((card, index) =>
          <Card
            bordered="bordered" key={index} style={{
              borderRadius: 4,
              overflow: 'hidden',
            }}
            cover={<img alt="example" className="card-img" src={cardImages[index]} />}
          >
            <Meta
              title={
                <TranslatedMessage messages={messages} messageId={card.title} />
                }
              description={
                <TranslatedMessage messages={messages} messageId={card.message} />
                }
            />
          </Card>
          )}
      </Row>
    );
  }
}

DisplayCard.propTypes = {
};

export default DisplayCard;
