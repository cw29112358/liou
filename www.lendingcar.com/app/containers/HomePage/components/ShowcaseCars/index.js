/**
*
* ShowcaseCars
*
*/


import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import Slider from 'react-slick';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from '../messages';
import ShowcaseCarItem from '../ShowcaseCarItem';


function ShowcaseCars(props) {
  const { inventory, linkTo } = props;
  const showcaseCars = Object.values(inventory);
  const selectedCars = showcaseCars.filter((item) =>
    item.images
  );
  const settings = isMobile ?
  {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  }
  :
  {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const renderCar = (carData, i) => (
    <ShowcaseCarItem key={i} carData={carData} isMobile={isMobile} linkTo={linkTo} />
  );
  return (
    <div className="split-section" style={{ backgroundColor: '#eee', paddingTop: '10px', paddingBottom: '40px' }}>
      <div style={{ color: '#000', fontSize: '20px', fontFamily: '微软雅黑', paddingLeft: '15px' }}><TranslatedMessage messages={messages} messageId="mostPopular" tagName="span" /></div>
      {!!selectedCars.length &&
        <Slider {...settings}>
          {selectedCars.map(renderCar)}
        </Slider>
      }
    </div>
  );
}

ShowcaseCars.propTypes = {
  inventory: PropTypes.object,
  linkTo: PropTypes.func,
};

export default ShowcaseCars;
