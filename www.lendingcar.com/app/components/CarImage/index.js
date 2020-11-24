/**
*
* CarImage Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';

import { getResizeImageUrl } from 'utils/helpers';
import defaultCar from 'assets/car.png';
import './style.scss';

const imgLoad = () => <img src={defaultCar} alt="" />;
const imgError = (event) => {
  const img = event.target;
  img.src = defaultCar;
  img.onerror = null;
};
class CarImage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { width, height, url, className, placeholder, isLazyLoad = true, localImages = false } = this.props;
    const imgClassName = classNames({
      'car-img': true,
      [className]: className,
    });
    const defaultCarImage = (<img
      width={width}
      height={height}
      className="default-car-image"
      src={defaultCar}
      alt=""
    />);
    if (!url) return defaultCarImage;

    const carImage = (<img
      width={width}
      height={height}
      src={localImages ? url : getResizeImageUrl(url)}
      alt=""
      onLoad={imgLoad}
      onError={imgError}
    />);

    if (isLazyLoad) {
      return (
        <LazyLoad width={width} height={height} placeholder={placeholder || defaultCarImage} once debounce={300} >
          <div className={imgClassName}>
            {carImage}
            <div className="mask-watermark"></div>
          </div>
        </LazyLoad>
      );
    }
    return (
      <div className={imgClassName}>
        {carImage}
        <div className="mask-watermark"></div>
      </div>
    );
  }
}

CarImage.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
  isLazyLoad: PropTypes.bool,
  localImages: PropTypes.bool,
  placeholder: PropTypes.any,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default CarImage;
