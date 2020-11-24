/**
*
* CarouselImages Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

import CarImage from 'components/CarImage';

import styles from './styles';

const CarouselImages = (props) => {
  const { carData } = props;
  const images = carData.images ? carData.images : [''];
  const swiperImage = () => images
    .map((image) => (
      <CarImage
        style={styles.defaultImage}
        containerStyle={styles.imageStyle}
        key={image}
        url={image}
      />
    ));

  return (
    <Swiper
      height={styles.swiperHeight}
      activeDotColor={styles.brand}
      dotColor={styles.grey}
      dotStyle={styles.dot}
      activeDotStyle={styles.dot}
      loop={false}
    >
      {swiperImage()}
    </Swiper>
  );
};

CarouselImages.defaultProps = {
  carData: null,
};

CarouselImages.propTypes = {
  carData: PropTypes.object,
};

export default CarouselImages;
