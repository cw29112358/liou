/**
*
* ShowDetailCars
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { isMobile } from 'react-device-detect';
import { Row } from 'antd';
import CarImage from 'components/CarImage';
import './style.scss';

export class ShowDetailCars extends React.Component {
  constructor(props) {
    super(props);
    this.settings = {
      arrows: !isMobile,
      dots: isMobile,
      infinite: true,
      slidesToShow: isMobile ? 1 : 2,
      slidesToScroll: 1,
      vertical: !isMobile,
      autoplay: false,
      pauseOnHover: true,
      afterChange: (index) => this.setState({ index }),
    };
    this.state = {
      index: 0,
    };
  }

  renderNormal() {
    const { urls } = this.props;
    const currentImage = urls[this.state.index];
    return (
      <div className="carimg-detail">
        <Row justify="space-between" type="flex">
          <div className="carimg-static-div">
            <CarImage isLazyLoad={false} url={currentImage} className="carimg-static" />
          </div>
          <div className="carimg-dynamic-div">
            {!!urls.length &&
            <Slider {...this.settings}>
              {urls.map((url, index) =>
                <div key={index} className="img-div">
                  <CarImage isLazyLoad={false} url={url} className="carimg-dynamic" />
                </div>
              )}
            </Slider>}
          </div>

          {/* <div key={urls.length} className="img-div">
            <CarImage isLazyLoad={false} url={urls[urls.length-1]} className="carimg-dynamic" />
          </div> */}
        </Row>
      </div>
    );
  }

  renderMobile() {
    const { urls } = this.props;
    return (
      <div className="carimg-mobile">
        {!!urls.length &&
        <Slider {...this.settings}>
          {urls.map((url, index) =>
            <div key={index} className="img-div">
              <CarImage isLazyLoad={false} url={url} className="carimg-dynamic" />
            </div>
          )}
        </Slider>}
      </div>
    );
  }

  render() {
    return isMobile ? this.renderMobile() : this.renderNormal();
  }
}

ShowDetailCars.propTypes = {
  urls: PropTypes.array,
};

export default ShowDetailCars;
