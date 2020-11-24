/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';

import TranslatedMessage from 'components/TranslatedMessage';
import CarImage from 'components/CarImage';
import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';

import Placeholder from '../Placeholder';
import messages from './messages';
import './style.scss';

function GridItem(props) {
  const { id, make, year, model, plan,
    images = [], linkTo,
  } = props;
  const redirectUrl = `/c/${id}`;
  const labelStyle = props.availability === 'leased' ? { zIndex: 9999 } : { display: 'none' };

  const gotoDetailPage = () => {
    linkTo(redirectUrl);
  };

  let priceCmp;
  // TODO: Philip use selector to get the cheapest plan instead of hardcode. getCheapestDailyPlan
  if (plan) {
    // const lastPlan = plans[plans.length - 1];
    const planUnit = plan.unit;
    const planPrice = plan.dailyRent;
    const showStyle = isNaN(plan.dailyRent) ? { display: 'none' } : {};
    // if (planUnit === 'mo') {
    //   planPrice = Math.round(planPrice / 30);
    //   planUnit = 'day';
    // }
    priceCmp = <span className="product-price pull-right" style={showStyle}>${planPrice} /<TranslatedMessage messages={messages} messageId={planUnit} tagName="span" /></span>;
  }
  return (
    <div className="product-box" onClick={gotoDetailPage}>
      <div className="product-thumb">
        <div className="leasedLabel" style={labelStyle}>
          <div className="leasedFont"><TranslatedMessage messages={messages} messageId="leased" tagName="span" /></div>
        </div>
        <CarImage url={images[0]} placeholder={<Placeholder />} height="100%" className="img-responsive" />
        <div className="product-overlay">
          <span>
            {/* <a role="button" className="btn btn-primary" onClick={onClick}><FormattedMessage {...messages.getItNow} tagName="div" /></a>*/}
          </span>
        </div>
      </div>
      <div className="product-desc" >
        {priceCmp}
        <h5 className="product-name"><TranslatedMessage messages={messagesCarPage} messageId={make} tagName="span" />&nbsp; {model} {year}</h5>
        <a className="btn btn-default" style={{ display: 'none', backgroundColor: '#28d89d', color: '#fff' }} onClick={gotoDetailPage}><TranslatedMessage messages={messages} messageId="viewDetail" tagName="div" /></a>
      </div>
    </div>
  );
}

GridItem.propTypes = {
  id: PropTypes.string,
  make: PropTypes.string,
  year: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  model: PropTypes.string,
  plan: PropTypes.object,
  images: PropTypes.array,
  linkTo: PropTypes.func,
  availability: PropTypes.string,
};

export default GridItem;
