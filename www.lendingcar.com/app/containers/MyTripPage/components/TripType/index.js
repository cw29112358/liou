/**
*
* TripType
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import { intlShape } from 'react-intl';
import './style.scss';
import TripList from '../TripList';
const TabPane = Tabs.TabPane;

class TripType extends React.Component { // eslint-disable-line react/prefer-stateless-function

  chooseTripType = (index) => index

  render() {
    const { intl, messages } = this.props;
    return (
      <div className="trip-type">
        <Tabs defaultActiveKey="0" onChange={this.chooseTripType}>
          {
            this.props.tripTypes.map((tripType, index) =>
              <TabPane tab={intl.formatMessage(messages[tripType.propName])} key={index}>
                <TripList {...this.props} messages={messages} filterTrips={this.props[tripType.listName]} />
              </TabPane>)
          }
        </Tabs>
      </div>
    );
  }
}

TripType.propTypes = {
  intl: intlShape.isRequired,
  messages: PropTypes.object,
  tripTypes: PropTypes.array,
};

export default TripType;
