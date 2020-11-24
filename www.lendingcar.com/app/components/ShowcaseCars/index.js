/**
*
* ShowcaseCars
*
*/


import React from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'react-device-detect';
import Slider from 'react-slick';
import TranslatedMessage from 'components/TranslatedMessage';
import ShowcaseCarItem from '../ShowcaseCarItem';
// import messages from './messages';
import './style.scss';

function ShowcaseCars(props) {
  const { inventory, linkTo, messages } = props;
  const settings = isMobileOnly ?
  {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  }
  :
  {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  const renderCar = (carData, i) => (
    <ShowcaseCarItem key={i} carData={carData} linkTo={linkTo} clickable />
  );
  return (
    <div
      className="split-section"
      style={{ paddingTop: '10px', paddingBottom: '40px' }}
    >
      <div style={{ paddingTop: '27px', paddingBottom: '0px' }}>
        <h3 className="fontStyle"><TranslatedMessage messages={messages} messageId="browseCars" tagName="span" />
          <a role="button" style={{ color: '#000', fontSize: '15px', paddingLeft: '15px' }} onClick={() => linkTo('/inventory')}>
            (<u><TranslatedMessage messages={messages} messageId="viewAll" /></u>)
          </a>
        </h3>
      </div>

      {!!inventory.length &&
        <Slider {...settings}>
          {inventory.map(renderCar)}
        </Slider>
      }
    </div>
  );
}

ShowcaseCars.propTypes = {
  inventory: PropTypes.array,
  linkTo: PropTypes.func,
  messages: PropTypes.object,
};

export default ShowcaseCars;
