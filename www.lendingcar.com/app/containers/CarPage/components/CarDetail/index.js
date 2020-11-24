/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Row, Col, Card, Icon } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
// import { FormattedMessage } from 'react-intl';
import toInteger from 'lodash/toInteger';
import pick from 'lodash/pick';
// import divide from 'lodash/divide';
import split from 'lodash/split';
import isEmpty from 'lodash/isEmpty';
// import ceil from 'lodash/ceil';
import lowerCase from 'lodash/lowerCase';

import TranslatedMessage, { formatMessage } from 'components/TranslatedMessage';
import BookingDetails from 'components/BookingDetails';
import ShowDetailCarousel from 'components/ShowDetailCarousel';
import CarImage from 'components/CarImage';
import { CONTACT_INFO } from 'utils/constants';
import messages from './messages';
import './style.scss';
import FAQ from '../FAQ';

const Tabs = [
  { value: 'details', label: 'Car Detail' },
  { value: 'feature', label: 'Feature' },
];

export class CarDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'details',
    };
  }

  getRateAndMessageId = (plan) => {
    let rate;
    let rateMessageId = 'unit';

    if (plan.unit === 'month') {
      rate = Math.round(plan.dailyRent * 30);
      rateMessageId = 'mo';
    } else if (plan.unit === 'day') {
      rate = Math.round(plan.dailyRent);
      rateMessageId = 'day';
    }
    return { rate, rateMessageId };
  }

  renderCarTitle() {
    const { carData } = this.props;
    const askForPrice = carData.askForPrice;
    const isAskForPrice = askForPrice === 'true';
    // let price;
    // if (plan) {
    //   const planUnit = plan.unit;
    //   const planPrice = plan.dailyRent;
    //   price = (
    //     <span className="car-title-right font-medium">
    //       ${planPrice}
    //       <span className="unit-day title-unit">/<TranslatedMessage messages={messages} messageId={planUnit} tagName="span" /></span>
    //     </span>
    //   );
    // }
    // const isTitle = true;
    const rateObject = this.getRateAndMessageId(carData.plan);
    const perUnit = isAskForPrice ? '' : <TranslatedMessage messages={messages} messageId={rateObject.rateMessageId} tagName="span" />;

    return (
      <Row type="flex" className="make-row">
        <Col>
          <h3 className="car-title-left font-400">
            <TranslatedMessage messages={messages} messageId={carData.make} tagName="span" />
            &nbsp;{carData.model}
            <span className="car-title-color">
              &nbsp;{!isAskForPrice ? '$' : ''}{!isAskForPrice ? rateObject.rate : 'Ask For Price'}{!isAskForPrice ? '/' : ''}{perUnit}
            </span>
            {/* /{carData.year}
            /{ceil(divide(carData.mileage, 1000))}k<TranslatedMessage messages={messages} messageId="miles" tagName="span" /> */}
            {/* {leaseTerm} */}
          </h3>
        </Col>
        {/* <Col className="car-title-right-div"> */}
        {/* <h3 className="car-title-right"> */}
        {/* {price} */}
        {/* </h3> */}
        {/* {this.renderButton(isTitle)} */}
        {/* </Col> */}
      </Row>
    );
  }

  renderCarImages(urls) {
    const otherProps = {
      urls: urls.length ? urls : [''],
      vertical: false,
      hasArrows: false,
      hasDots: true,
      slidesToShow: '1',
      autoplay: !!urls.length,
    };
    return (
      <div className="carimg-div">
        {/* <ShowDetailCars {...this.props} urls={urls} />*/}
        <ShowDetailCarousel {...this.props} {...otherProps} />
      </div>
    );
  }

  renderCarDetails() {
    const { carData } = this.props;
    const translatedMiles = formatMessage(this.props.intl, messages, 'miles');
    const unknownMiles = formatMessage(this.props.intl, messages, 'Unknown');
    return (
      <div>
        <Row justify="center" type="flex" className="info-row info-row-colorF">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="mileage" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            {carData.mileage ? `${toInteger(carData.mileage).toLocaleString()} ${translatedMiles}` : unknownMiles}
          </span>
        </Row>

        <Row justify="center" type="flex" className="info-row">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="color" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            <TranslatedMessage messages={messages} messageId={lowerCase(carData.color)} tagName="span" />
          </span>
        </Row>

        <Row justify="center" type="flex" className="info-row info-row-colorF">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="year" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            {carData.year ? carData.year : '' }
          </span>
        </Row>

        <Row justify="center" type="flex" className="info-row">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="carType" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            <TranslatedMessage messages={messages} messageId={carData.carType ? carData.carType : ''} tagName="span" />
          </span>
        </Row>
        <Row justify="center" type="flex" className="info-row info-row-colorF">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="trim" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            <TranslatedMessage messages={messages} messageId={carData.trim ? carData.trim : ''} tagName="span" />
          </span>
        </Row>
        <Row justify="center" type="flex" className="info-row">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="engineCylinders" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            <TranslatedMessage messages={messages} messageId={carData.engineCylinders ? carData.engineCylinders : ''} tagName="span" />
          </span>
        </Row>
        <Row justify="center" type="flex" className="info-row info-row-colorF">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="transmissionType" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            <TranslatedMessage messages={messages} messageId={carData.transmissionType ? carData.transmissionType : ''} tagName="span" />
          </span>
        </Row>
        <Row justify="center" type="flex" className="info-row">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="drivenWheels" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            <TranslatedMessage messages={messages} messageId={carData.drivenWheels ? carData.drivenWheels : ''} tagName="span" />
          </span>
        </Row>
        <Row justify="center" type="flex" className="info-row info-row-colorF">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="mpgCity" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            <TranslatedMessage messages={messages} messageId={carData.mpgCity ? carData.mpgCity.toString() : ''} tagName="span" />
          </span>
        </Row>
        <Row justify="center" type="flex" className="info-row">
          <span className="details-description-left">
            <TranslatedMessage messages={messages} messageId="mpgHighway" tagName="span" />
          </span>
          <span className="details-description-right font-400">
            <TranslatedMessage messages={messages} messageId={carData.mpgHighway ? carData.mpgHighway.toString() : ''} tagName="span" />
          </span>
        </Row>
      </div>
    );
  }

  renderCarFeatures() {
    const { carData, locale } = this.props;
    const featuresRows = [];
    const featuresEn = pick(carData, 'feature') ? Object.values(pick(carData, 'feature')) : {};
    const featuresZH = pick(carData, 'featureZH') ? Object.values(pick(carData, 'featureZH')) : { featuresEn };
    const featureArrEn = featuresEn ? split(featuresEn[0], ',') : [];
    const featureArrZh = featuresZH ? split(featuresZH[0], '，') : [];
    const featureArr = locale === 'zh' ? featureArrZh : featureArrEn;
    featureArr.forEach((item, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      if (!featuresRows[row]) featuresRows[row] = [];
      featuresRows[row][col] = item;
    });

    return (
      <div>
        {featuresRows.map(this.renderFeaturesRows)}
      </div>
    );
  }

  renderFeaturesRows(row, index) {
    if (!row.length) return null;
    return (
      <div key={index}>
        {
          row.map((feature, indexRow) => {
            if (isEmpty(feature.trim())) return null;
            return (
              <Row justify="center" type="flex" className={indexRow % 2 === 0 ? 'info-row-colorF info-row' : 'info-row'} key={indexRow}>
                {feature}
              </Row>
            );
          })
        }
      </div>
    );
  }

  // renderPrice() {
  //   const { carData } = this.props;
  //   return (
  //     <div>
  //       <Row justify="space-around" type="flex" className="info-row info-row-colorF">
  //         <TranslatedMessage messages={messages} messageId="mileage" tagName="span" />
  //         {carData.mileage ? toInteger(carData.mileage).toLocaleString() : '' }
  //       </Row>
  //
  //       <Row justify="space-around" type="flex" className="info-row">
  //         <TranslatedMessage messages={messages} messageId="color" tagName="span" />
  //         <TranslatedMessage messages={messages} messageId={lowerCase(carData.color)} tagName="span" />
  //       </Row>
  //
  //       <Row justify="space-around" type="flex" className="info-row info-row-colorF">
  //         <TranslatedMessage messages={messages} messageId="year" tagName="span" />
  //         {carData.year ? carData.year : '' }
  //       </Row>
  //
  //       <Row justify="space-around" type="flex" className="info-row">
  //         <TranslatedMessage messages={messages} messageId="carType" tagName="span" />
  //         <TranslatedMessage messages={messages} messageId={carData.carType ? carData.carType : ''} tagName="span" />
  //       </Row>
  //     </div>
  //   );
  // }

  renderCarInformation() {
    const TabContent = {
      details: this.renderCarDetails(),
      feature: this.renderCarFeatures(),
    };
    return (
      <div className="left-div" style={{ textAlign: 'left', marginBottom: '20px' }}>
        <div className="info-title">
          {Tabs && Tabs.map((item, index) =>
            <a role="button" key={index} onClick={() => this.setState({ selectedTab: item.value })} className={this.state.selectedTab === item.value ? 'active-nav' : 'nav-button'}>
              <TranslatedMessage messages={messages} messageId={item.value} tagName="span" />
            </a>
          )}
        </div>
        {TabContent[this.state.selectedTab]}
      </div>
    );
  }

  renderReservationPrice(isShowError, isShowTermError) {
    const { bookingDetails, currentAreaConfig, carData } = this.props;
    const askForPrice = carData.askForPrice;
    const isAskForPrice = askForPrice === 'true';
    return (
      <div>
        <div className="leasing-label">
          <TranslatedMessage messages={messages} messageId="leasingDetails" tagName="span" />
        </div>
        <BookingDetails
          bookingData={bookingDetails}
          isShowError={isShowError}
          isShowTermError={isShowTermError}
          currentAreaConfig={currentAreaConfig}
          isAskForPrice={isAskForPrice}
        />
      </div>
    );
  }

  renderRecommend() {
    const cars = this.props.recommendedCars;
    return (
      <div className="recommend-div">
        <div className="recommend-title">
          <h1 className="point point-left">·</h1>
          <h3><TranslatedMessage messages={messages} messageId="similarVehicles" tagName="span" /></h3>
          <h1 className="point point-right">·</h1>
        </div>
        <div>
          <Row className="recommend-row">
            {cars && cars.map((eachCar, index) => {
              const rateObject = this.getRateAndMessageId(eachCar.plan);

              return (<Card
                bordered={false}
                cover={<CarImage url={eachCar.images[0]} isLazyLoad={false} />}
                onClick={() => { this.props.linkTo(`/c/${eachCar.id}`); }}
                className="card-recommend-div"
                key={index}
              >
                <Row justify="space-between" type="flex" className="car-info-box" >
                  <div className="card-info-left">
                    <h3 className="card-info-title">
                      <TranslatedMessage messages={messages} messageId={eachCar.make} tagName="span" />
                      &nbsp; {eachCar.model}
                    </h3>
                    <span className="card-info-year">{eachCar.year}</span>
                    <span className="card-info-automatic">{eachCar.mileage ? toInteger(eachCar.mileage).toLocaleString() : '' } <TranslatedMessage messages={messages} messageId="miles" tagName="span" /></span>
                  </div>
                  <div className="price-div">
                    <span className="price">${rateObject.rate}</span>
                    <span className="unit-day card-title-unit">/<TranslatedMessage messages={messages} messageId={rateObject.rateMessageId} tagName="span" /></span>
                  </div>
                </Row>
              </Card>);
            })}
          </Row>
        </div>
      </div>
    );
  }

  renderFAQ() {
    return (
      <div className="recommend-div">
        <div className="faq-title">
        </div>
        <div>
          <FAQ intl={this.props.intl} />
        </div>
      </div>
    );
  }

  renderButton(isShowError, isShowTermError, isTitle) {
    let style = isTitle ? { marginLeft: 10 } : { marginTop: 30, marginBottom: 30 };
    style = Object.assign({}, style, isMobile ? { fontSize: 12 } : { fontSize: 22 });
    const buttonClassName = classNames({
      btn: true,
      'btn-primary': true,
      disabled: isShowError || isShowTermError,
    });
    const availableButton = this.props.carData.availability === 'leased' ?
      (<a role="button" className="btn btn-default disabled" style={style}>
        <TranslatedMessage messages={messages} messageId="leased" tagName="span" />
      </a>)
      :
      (<a role="button" className={buttonClassName} onClick={() => (isShowError || isShowTermError) ? null : this.props.linkTo('/inventory/booking')} style={style} >
        <TranslatedMessage messages={messages} messageId="getItNow" tagName="span" />
      </a>);
    const bookingButton = !(this.props.carData.askForPrice === 'true') ? availableButton : (<a role="button" className="btn btn-default disabled" style={style}>
      <TranslatedMessage messages={messages} messageId="callUs" tagName="span" />
    </a>);

    return (
      <Row type="flex" justify="center" className="get-it-now">
        {/* {this.props.carData.availability === 'leased' ?
          <a role="button" className="btn btn-default disabled" style={style}>
            <TranslatedMessage messages={messages} messageId="leased" tagName="span" />
          </a>
          :
          <a role="button" className={buttonClassName} onClick={() => (isShowError || isShowTermError) ? null : this.props.linkTo('/inventory/booking')} style={style} >
            <TranslatedMessage messages={messages} messageId="getItNow" tagName="span" />
          </a>} */}
        {bookingButton}
      </Row>
    );
  }

  renderContactUs() {
    const contactPhone = `tel:${CONTACT_INFO.phone}`;

    return (
      <div style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center', marginTop: '20px' }}>
        <TranslatedMessage messages={messages} messageId="contactMessage" tagName="span" />
        <p>
          <a href={contactPhone} className="contact-us-color">
            <Icon type="phone" />&nbsp;&nbsp;
            +1 {CONTACT_INFO.phone}
          </a></p>
      </div>
    );
  }

  render() {
    const { carData, carImages, recommendedCars, bookingDetails, currentAreaConfig } = this.props;
    const { pickupDate, term } = bookingDetails;
    const isNeedPreOrder = !!carData.needPreOrder;
    const isShowError = isNeedPreOrder && moment().day(14).isAfter(pickupDate);
    const isShowTermError = isNeedPreOrder && Number(term) < Number(currentAreaConfig.preOrderMinimumTerms);

    if (!carData) return <div></div>;
    const urls = carImages.map((item) => item.url);

    return (
      <div className="car-detail">
        {this.renderCarTitle()}
        <div className="col-lg-7 col-md-7 col-sm-7 col-sm-offset-1">
          {this.renderCarImages(urls)}
          {this.renderCarInformation()}
          {/* {this.renderContactUs()} */}
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 ">
          {this.renderReservationPrice(isShowError, isShowTermError)}
          {this.renderButton(isShowError, isShowTermError)}
        </div>
        {!isMobile && this.renderFAQ()}
        {!isNeedPreOrder && !!recommendedCars && recommendedCars.length > 0 && this.renderRecommend()}
      </div>
    );
  }
}

CarDetail.propTypes = {
  intl: PropTypes.object,
  carData: PropTypes.object,
  carImages: PropTypes.array,
  locale: PropTypes.string,
  linkTo: PropTypes.func,
  recommendedCars: PropTypes.array,
  bookingDetails: PropTypes.object,
  currentAreaConfig: PropTypes.object,
};

export default CarDetail;
