/**
*
* TripList
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import './style.scss';
import TripItem from '../TripItem';

const renderList = (props, filterTrips) => {
  if (!filterTrips.length) {
    return (
      <div className="trip-list-null">
        <TranslatedMessage messages={messages} messageId="tripListNull" tagName="span" />
      </div>
    );
  }

  return (
    filterTrips.map((trip, index) => (
      <TripItem key={index} {...props} trip={trip}></TripItem>
    ))
  );
};

function TripList(props) {
  return (
    <ul className="trip-list">
      { renderList(props, props.filterTrips) }
    </ul>
  );
}

TripList.propTypes = {
  filterTrips: PropTypes.array,
};

export default TripList;
