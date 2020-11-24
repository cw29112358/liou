/**
*
* CarDetail
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import { lowerCase, pick, split } from 'lodash';

import TranslatedMessage from 'components/TranslatedMessage';
import CarImage from 'components/CarImage';
import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';
import messages from 'containers/InventoryPage/components/GridFilter/messages';

const Strong = styled.strong`
  color: #333;
`;
const H3 = styled.h3`
  margin: 10px 0 30px;
`;
const MobileTitle = styled.div`
  float:left;
  width: 60%;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow:hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: bold;
  color:#333;
`;
const MobilePrice = styled.span`
  float: right;
  width: 30%;
  color: #28d89d;
  text-align:right;
  font-weight:bold;
`;

class CarDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    window.history.go(-1);
  }
  render() {
    const { values, carInfo, hasReview, locale } = this.props;

    const vehicleInfo = {
      make: values.vehicleMake,
      model: values.vehicleModel,
      year: values.vehicleYear,
      color: values.vehicleColor,
      carType: values.vehicleType,
      mileage: values.vehicleMileage,
      mileageLimit: values.mileageLimit,
      feature: values.vehicleFeature,
      passengers: values.vehiclePassengers,
      doors: values.vehicleDoors,
      imageUrl: values.vehicleImage,
    };
    let priceCmp;
    const plan = carInfo.plan;
    const planUnit = plan.unit;
    const planPrice = plan.dailyRent;
    if (planPrice) {
      priceCmp = <MobilePrice>{'$'}{planPrice}{'/'}<TranslatedMessage messages={messagesCarPage} messageId={planUnit} tagName="span" /></MobilePrice>;
    }

    const divClass = classNames({
      'col-xs-12': true,
      'col-sm-8': true,
      'col-lg-7': !hasReview,
      'col-lg-5': hasReview,
      'margin-l-35': !hasReview,
    });

    const featuresEn = pick(carInfo, 'feature') ? Object.values(pick(carInfo, 'feature')) : {};
    const featuresZH = pick(carInfo, 'featureZH') ? Object.values(pick(carInfo, 'featureZH')) : { featuresEn };
    const featureArrEn = featuresEn ? split(featuresEn[0], ',') : [];
    const featureArrZh = featuresZH ? split(featuresZH[0], '，') : [];
    const featureArr = locale === 'zh' ? featureArrZh : featureArrEn;

    return (
      <div className="clearfix">
        {isMobile ?
          <div className="clearfix" style={{ margin: '15px' }} onClick={this.goBack}>
            <i className="glyphicon glyphicon-chevron-left pull-left" style={{ width: '5%', top: '5px' }}></i>
            <MobileTitle><TranslatedMessage messages={messagesCarPage} messageId={vehicleInfo.make} tagName="span" /> {vehicleInfo.model} {vehicleInfo.year}</MobileTitle>
            {priceCmp}
          </div> :
          <div>
            <div className="col-xs-12 col-sm-12 col-lg-4" style={{ marginBottom: '45px' }}>
              <CarImage url={vehicleInfo.imageUrl} className="pull-left" />
            </div>
            <div className={divClass}>
              <H3><TranslatedMessage messages={messagesCarPage} messageId={vehicleInfo.make} tagName="span" />&nbsp; {vehicleInfo.model} {vehicleInfo.year}</H3>
              <p><Strong><TranslatedMessage messages={messages} messageId="feature" tagName="span" />:&nbsp;</Strong>{featureArr.join(', ')}</p>
              {vehicleInfo.passengers && <p><Strong><TranslatedMessage messages={messages} messageId="passengers" tagName="span" />:&nbsp;</Strong>{vehicleInfo.passengers}</p>}
              {vehicleInfo.doors && <p><Strong><TranslatedMessage messages={messages} messageId="doors" tagName="span" />:&nbsp;</Strong>{vehicleInfo.doors}</p>}
              <p><Strong><TranslatedMessage messages={messages} messageId="color" tagName="span" />:&nbsp;</Strong><TranslatedMessage messages={messages} messageId={lowerCase(vehicleInfo.color)} tagName="span" /></p>
              <p><Strong><TranslatedMessage messages={messages} messageId="mileageLimit" tagName="span" />:&nbsp;</Strong>{vehicleInfo.mileageLimit} <TranslatedMessage messages={messages} messageId="miles" tagName="span" />/<TranslatedMessage messages={messages} messageId="month" tagName="span" /></p>
            </div>
          </div>}
      </div>
    );
  }
}

CarDetail.propTypes = {
  values: PropTypes.object,
  carInfo: PropTypes.object,
  // onPrevious: PropTypes.func,
  hasReview: PropTypes.bool,
  locale: PropTypes.string,
};

export default CarDetail;
