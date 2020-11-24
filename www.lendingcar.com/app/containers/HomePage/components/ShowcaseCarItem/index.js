/**
*
* ShowcaseCarItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

import CarImage from 'components/CarImage';
import '../InfoBlock12.scss';

function ShowcaseCarItem(props) {
  const { carData, linkTo, ...rest } = props;
  const plans = carData.plans;
  const id = carData.id;
  const redirectUrl = `/c/${id}`;

  let priceCmp;
  if (plans) {
    const lastPlan = plans[plans.length - 1];
    let planUnit = lastPlan.unit;
    let planPrice = lastPlan.lease;
    if (planUnit === 'mo') {
      planPrice = Math.round(planPrice / 30);
      planUnit = 'day';
    }
    priceCmp = <h4 className="text-uppercase " >${planPrice} /{planUnit}</h4>;
  }

  const gotoDetailPage = () => {
    linkTo(redirectUrl);
  };

  const styleTrophy = isMobile ? { color: 'white', marginLeft: '0px', marginTop: '10px' } : { color: 'white', marginTop: '10px' };

  return (
    <div {...rest} >
      <div className="item" >
        <a className="category-box " role="button" style={{ paddingLeft: '4%', paddingRight: '4%', paddingTop: '6%', paddingBottom: '4%' }} onClick={gotoDetailPage}>
          <div className="col-xs-1 divTrophy" ><i className="fa fa-trophy fa-2x " style={styleTrophy}></i></div>
          <CarImage url={carData.images[0]} isLazyLoad={false} className="img-responsive" width="100%" />
          <div className="category-text  ">
            <h4 className="text-uppercase " >{carData.make} {carData.model} </h4>
            {priceCmp}


          </div>
        </a>
      </div>
    </div>
  );
}

ShowcaseCarItem.propTypes = {
  carData: PropTypes.object,
  linkTo: PropTypes.func,
};

export default ShowcaseCarItem;
