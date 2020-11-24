/**
*
* ShowDetailCarousel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { isMobile } from 'react-device-detect';
import { Row } from 'antd';

import CarImage from 'components/CarImage';
import './style.scss';

export class ShowDetailCarousel extends React.Component {
  constructor(props) {
    super(props);
    const lengthAboveOne = this.props.urls.length > 1;
    this.settings = {
      arrows: lengthAboveOne && (this.props.hasArrows || (!isMobile && this.props.vertical)),
      dots: lengthAboveOne && (this.props.hasDots || (isMobile || !this.props.vertical)),
      infinite: lengthAboveOne,
      slidesToShow: isMobile ? 1 : Number(this.props.slidesToShow),
      slidesToScroll: 1,
      vertical: !isMobile && this.props.vertical,
      autoplay: lengthAboveOne && this.props.autoplay,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      afterChange: !this.props.autoplay ? (index) => this.setState({ index }) : () => {},
    };
    this.state = {
      index: 0,
    };
  }

  renderNormal() {
    const { urls } = this.props;
    const currentImage = urls[this.state.index];
    return (
      this.props.vertical ?
        <div className="carimg-detail">
          <Row justify="space-between" type="flex">
            <div className="carimg-static-div">
              <CarImage isLazyLoad={false} url={currentImage} className="carimg-static" />
            </div>
            <div className="carimg-dynamic-div" >
              {!!urls.length &&
              <Slider {...this.settings}>
                {urls.map((url, index) =>
                  <div key={index} className="img-div" >
                    <CarImage isLazyLoad={false} url={url} className="carimg-dynamic" />
                  </div>
                )}
              </Slider>}
            </div>
          </Row>
        </div>
      :
        <div className="carimg-horizontal">
          {!!urls.length &&
          <Slider {...this.settings}>
            {urls.map((url, index) =>
              <div key={index} className="img-div">
                <CarImage isLazyLoad={false} url={url} width="100%" className="carimg-dynamic" />
              </div>
            )}
          </Slider>}
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
    // return this.renderMobile();
    return isMobile ? this.renderMobile() : this.renderNormal();
  }
}

ShowDetailCarousel.propTypes = {
  urls: PropTypes.array,
  hasArrows: PropTypes.bool,
  hasDots: PropTypes.bool,
  vertical: PropTypes.bool,
  autoplay: PropTypes.bool,
  slidesToShow: PropTypes.string,
};

export default ShowDetailCarousel;
