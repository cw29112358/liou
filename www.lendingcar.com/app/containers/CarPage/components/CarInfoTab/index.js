/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import toInteger from 'lodash/toInteger';
import isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize';
import keys from 'lodash/keys';
import values from 'lodash/values';
// import { FormattedMessage } from 'react-intl';
// import TranslatedMessage from 'components/TranslatedMessage';
// import messages from './messages';


function CarInfoTab(props) {
  // const { carData, curPlanIndex, changePlan } = props;
  const carData = props;
  if (!carData || !props.shouldPriceShown) {
    return (
      <div>
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // const { changePlan } = props;
  // const plans = props.plans;

  const tabContents = [
    { type: 'DETAILS', color: carData.color, mileage: toInteger(carData.mileage).toLocaleString() },
    { type: 'FEATURES', feature: carData.feature }];
  const renderPlanDetail = (item, index) => {
    const className = `tab-pane${!index ? ' active' : ''}`;
    const detail = [

      item.color ? { color: item.color } : {},
      item.mileage ? { mileage: item.mileage } : {},
      item.feature ? { feature: item.feature } : {},
    ];

    const renderDetail = detail.map((list, order) =>
      isEmpty(list) ? <tr key={order}></tr>
      :
      <tr key={order} style={{ textAlign: 'center' }}>
        <td style={{ fontWeight: 'bold', color: '#000' }}>
          {capitalize(keys(list))} :
        </td>
        <td style={{ fontWeight: 'bold', color: '#000' }}>
          { values(list)}
        </td>
      </tr>
    );

    return (<div role="tabpanel" className={className} id={index} key={index}>
      <table className="table table-striped">
        <tbody style={{ fontSize: '10px' }}>
          {renderDetail}
        </tbody>
      </table>
    </div>);
  };

  const renderPlansType = tabContents.map((item, index) => {
    const className = `${!index ? 'active' : ''}`;
    const typeName = `${item.type}`;
    // const onClick = changePlan.bind(this, index);
    return (
      <li role="presentation" className={className} style={{ margin: '0%', padding: '3%', width: '15%' }} key={index}>
        <a href={`#${index}`} aria-controls="info" role="tab" data-toggle="tab" style={{ fontSize: '10px' }}>
          {typeName}
        </a></li>
    );
  });
  const renderPlansContent = tabContents.map(renderPlanDetail);

  return (
    <div>
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1">
          <div>
            <ul className="tabs-nav list-inline text-center" role="tablist">
              {renderPlansType}
            </ul>
            <div className="tab-content">
              {renderPlansContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CarInfoTab.propTypes = {
  shouldPriceShown: PropTypes.bool,
};

export default CarInfoTab;
