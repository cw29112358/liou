/**
*
* PlansView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import values from 'lodash/values';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

// TODO: make sure all pure component use the following style
function PlansView(props) {
  const { plans, changePlan, changePlanCategory, curPlan, curPlanCategory } = props;
  const leaseStyle = curPlanCategory === 'lease' ? 'primary' : 'default';
  const rentStyle = curPlanCategory === 'rent' ? 'primary' : 'default';
  const leaseOnClick = changePlanCategory.bind(this, 'lease');
  const rentOnClick = changePlanCategory.bind(this, 'rent');
  const visiblePlans = plans.filter((plan) => {
    if (curPlanCategory === 'lease') return plan.downpay;
    return !plan.downpay;
  });
  return (
    <div className="row">
      <div className="col-sm-10 col-sm-offset-1">
        <div>
          <Button bsStyle={leaseStyle} onClick={leaseOnClick}>Lease</Button>
          <Button bsStyle={rentStyle} onClick={rentOnClick}>Rent</Button>
          <ul className="tabs-nav list-inline text-center" role="tablist">
            {
              visiblePlans.map((plan, key) => {
                const onClick = changePlan.bind(this, plan.type);
                const isActive = curPlan.type === plan.type;
                const className = isActive ? 'active' : '';
                return (
                  <li role="presentation" className={className} onClick={onClick} key={key}>
                    <a role="button"><FormattedMessage {...messages[plan.type]} /></a>
                  </li>
                );
              })}
          </ul>
          <Plan plan={curPlan} />
        </div>
      </div>
    </div>
  );
}

PlansView.propTypes = {
  plans: PropTypes.array,
  changePlan: PropTypes.func,
  changePlanCategory: PropTypes.func,
  curPlan: PropTypes.object,
  curPlanCategory: PropTypes.string,
};

function Plan(props) {
  const { plan } = props;
  if (!plan) return null;
  const detail = [
    // plan.type ? { type: plan.type } : {},
    plan.lease ? { lease: plan.lease } : {},
    plan.deposit ? { deposit: plan.deposit } : {},
    plan.downpay ? { downpay: plan.downpay } : {},
  ];
  const renderDetail = detail.map((list, order) =>
    isEmpty(list) ? <tr key={order}></tr>
    :
    <tr key={order}>
      <td ><FormattedMessage {...messages[keys(list)]} /></td>
      <td style={{ display: 'flex' }}>
        {list.lease || list.deposit || list.downpay ? '$' : ''}
        {list.type ? <FormattedMessage {...messages[list.type]} /> : values(list)}
        {list.lease ? ' /' : ''}{list.lease ? <FormattedMessage {...messages[plan.unit]} /> : ''}
      </td>
    </tr>
  );
  return (
    <div className="tab-content">
      <div role="tabpanel" className="tab-pane active" id="info">
        <table className="table table-striped">
          <tbody>
            {renderDetail}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Plan.propTypes = {
  plan: PropTypes.object,
};

export default PlansView;
