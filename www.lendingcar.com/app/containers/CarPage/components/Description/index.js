/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import values from 'lodash/values';
// import { FormattedMessage } from 'react-intl';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';


function Description(props) {
  // const { carData, curPlanIndex, changePlan } = props;
  const carData = props;
  if (!carData || !carData.plans || !props.shouldPriceShown) {
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
  const { changePlan } = props;
  const plans = props.plans;
  const renderPlanDetail = (item, index) => {
    const className = `tab-pane${!index ? ' active' : ''}`;
    const detail = [
      item.type ? { type: item.type } : {},
      item.lease ? { lease: item.lease } : {},
      item.deposit ? { deposit: item.deposit } : {},
      item.downpay ? { downpay: item.downpay } : {},
    ];

    const renderDetail = detail.map((list, order) =>
      isEmpty(list) ? <tr key={order}></tr>
      :
      <tr key={order}>
        <td style={list.downpay ? { fontWeight: 'bold', color: '#28d89d' } : {}}>
          <TranslatedMessage messages={messages} messageId={keys(list)[0]} tagName="div" />
        </td>
        <td style={list.downpay ? { fontWeight: 'bold', color: '#28d89d', display: 'flex' } : { display: 'flex' }}>
          {list.lease || list.deposit || list.downpay ? '$' : ''}
          {list.type ? <TranslatedMessage messages={messages} messageId={list.type} tagName="span" /> : values(list)}
          {list.lease && item.unit ? ' /' : ''}{list.lease && item.unit ? <TranslatedMessage messages={messages} messageId={item.unit} tagName="span" /> : ''}
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

  const renderPlansType = plans.map((item, index) => {
    const className = `${!index ? 'active' : ''}`;
    const typeName = `type${item.type}`;
    const onClick = changePlan.bind(this, index);
    return (
      <li role="presentation" onClick={onClick} className={className} style={{ margin: '0%', padding: '3%', width: '15%' }} key={index}>
        <a href={`#${index}`} aria-controls="info" role="tab" data-toggle="tab" style={{ fontSize: '10px' }}>
          <TranslatedMessage messages={messages} messageId={typeName} tagName="span" />
        </a></li>
    );
  });
  const renderPlansContent = plans.map(renderPlanDetail);

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

Description.propTypes = {
  // carData: PropTypes.object,
  plans: PropTypes.array,
  shouldPriceShown: PropTypes.bool,
  changePlan: PropTypes.func,
};

export default Description;
