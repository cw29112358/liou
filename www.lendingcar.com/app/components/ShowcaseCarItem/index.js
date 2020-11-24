/**
*
* ShowcaseCarItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { isMobile } from 'react-device-detect';
// import { getFileUrl } from 'utils/helpers';
import { camelCase } from 'lodash';
import TranslatedMessage from 'components/TranslatedMessage';
import carDetailMessages from 'containers/CarPage/components/CarDetail/messages';
import CarImage from 'components/CarImage';
import { getResizeImageUrl } from 'utils/helpers';
import './style.scss';

function ShowcaseCarItem(props) {
  const { carData, linkTo, clickable, ...rest } = props;
  const image = getResizeImageUrl(carData.images[0]);
  const id = carData.id;
  const redirectUrl = `/c/${id}`;

  const gotoDetailPage = () => {
    if (clickable) linkTo(redirectUrl);
  };

  // const styleTrophy = isMobile ? { color: 'white', marginLeft: '0px', marginTop: '10px' } : { color: 'white', marginTop: '10px' };

  return (
    <div {...rest} >
      <div className="item" >
        <span className="category-box " style={{ paddingLeft: '4%', paddingRight: '4%', paddingTop: '6%', paddingBottom: '4%' }} onClick={gotoDetailPage}>
          {/* <div className="col-xs-1 divTrophy" >
            <i className="fa fa-trophy fa-2x " style={styleTrophy}></i>
          </div> */}
          <CarImage width="320" url={image} />
          <div className="category-text">
            <h4 className="text-uppercase" ><TranslatedMessage messages={carDetailMessages} messageId={camelCase(carData.make)} tagName="span" /> {carData.model} </h4>
          </div>
        </span>
      </div>
    </div>
  );
}

ShowcaseCarItem.propTypes = {
  carData: PropTypes.object,
  linkTo: PropTypes.func,
  clickable: PropTypes.bool,
};

export default ShowcaseCarItem;
