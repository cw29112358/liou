/*
 *
 * ComponentTestPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
// import BookingPaymentForm from 'forms/BookingPaymentForm';
// import { isMobile } from 'react-device-detect';
// // import BookingContract from 'components/BookingContract';
// // import Printable from 'components/Printable';
import BookingConfirmation from 'components/BookingConfirmation';
// const urls = [
//   'https://img.lendingcar.com/640x480/inventories/1Kh4CLsehPH6uQs3f8HdidCecgtncgUkcA/7456e29d2058c30f859beabb5e1f2069.jpg',
//   'https://img.lendingcar.com/640x480/inventories/1Kh4CLsehPH6uQs3f8HdidCecgtncgUkcA/9ec84a2f422a7a10ef92739f259f5456.jpg',
//   'https://img.lendingcar.com/640x480/inventories/1Kh4CLsehPH6uQs3f8HdidCecgtncgUkcA/7893049eaadff8118d27e168ae85e5f4.jpg',
//   'https://img.lendingcar.com/640x480/inventories/1Kh4CLsehPH6uQs3f8HdidCecgtncgUkcA/e7aa2438aa7515bd49461e9e0fab9cc8.jpg',
//   'https://img.lendingcar.com/640x480/inventories/1Kh4CLsehPH6uQs3f8HdidCecgtncgUkcA/c9ecd3b6cb635c56820e049353142122.jpg',
//   'https://img.lendingcar.com/640x480/inventories/1Kh4CLsehPH6uQs3f8HdidCecgtncgUkcA/8fd510565c7971dd4201fe8b267f8358.jpg',
// ];

export class ComponentTestPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="container page-container" style={{ backgroundColor: 'white' }}>
          {/* <ShowDetailCars urls={urls} /> */}
          {/* <BookingPaymentForm /> */}
          <BookingConfirmation bookingData={{}} goToLoginPage={console.log} />
        </div>
      </div>
    );
  }
}

ComponentTestPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentTestPage);
