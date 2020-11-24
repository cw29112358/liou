/*
 *
 * ComponentTestPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import BookingForm from 'forms/BookingForm';
// import { Modal } from 'antd';
import BookingContract from 'components/BookingContract';
// import BookingPaymentForm from 'forms/BookingPaymentForm';
// import BookingPayInformation from 'components/BookingPayInformation';
// import MobileSideBar from 'components/MobileSideBar';
// import BookingSteps from 'components/BookingSteps';
// import RentalDateForm from 'forms/RentalDateForm';

export class ComponentTestPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="container page-container" style={{ backgroundColor: 'white' }}>
          {/* <BookingSteps page={1} /> */}
          {/* <BookingForm /> */}
          {/* <BookingPaymentForm /> */}
          {/* <BookingPayInformation /> */}
          <BookingContract />
        </div>
      </div>
    );
  }
}

ComponentTestPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(ComponentTestPage);
