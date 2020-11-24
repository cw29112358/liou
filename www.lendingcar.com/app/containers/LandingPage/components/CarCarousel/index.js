/*
 *
 * LandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from 'containers/LandingPage/messages';
import './style.scss';

export class CarCarousel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedIndex) {
    this.setState({
      index: selectedIndex,
    });
  }

  gotoDetailPage = () => {
    const carInfo = this.props.cars[this.state.index];
    const id = carInfo.id;
    const redirectUrl = `/c/${id}`;
    if (id) this.props.linkTo(redirectUrl);
  };


  render() {
    const { cars } = this.props;
    return (
      <div className="car-carousel">
        <Carousel
          indicators={false} interval={null} wrap={false} onSelect={this.handleSelect}
        >
          {cars && cars.map((car, index) =>
            <Carousel.Item key={index}>
              <img alt="900x500" src={car.image} className="img-carousel" onClick={this.gotoDetailPage} />
              <div className="div">
                <div className="description">
                  <p className="model font-black">{car.year} {car.make} {car.model}</p>
                  <p className="price font-regular">{car.rentalPrice}/<TranslatedMessage messages={messages} messageId={car.rentalUnit} /></p>
                </div>
              </div>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    );
  }
}

CarCarousel.propTypes = {
  cars: PropTypes.array,
  linkTo: PropTypes.func,
};

export default CarCarousel;
