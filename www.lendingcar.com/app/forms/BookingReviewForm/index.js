/**
*
* PaymentDetailForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { reduxForm } from 'redux-form/immutable';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
// import { pick } from 'lodash';
// import * as FormField from 'components/Form/BootstrapFormField';
import BookingContract from 'components/BookingContract';
import BookingPayInformation from 'components/BookingPayInformation';
// import BookingSuccessHeadLiner from 'forms/BookingReviewForm/components/BookingSuccessHeadLiner';
// import { getFeature } from 'utils/helpers';
import TranslatedMessage from 'components/TranslatedMessage';
// import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';
import messages from './messages';
import './style.scss';

class BookingReviewForm extends React.Component {// eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    scrollTo(0, 0);
  }

  render() {
    // const { handleSubmit, submitting, initialValues, intl, onGoToInventory } = this.props;
    const { initialValues, handleSubmit } = this.props;
    const initialValuesObject = initialValues.toJS();

    const currHeight = document.body.clientHeight - 320;
    const currMobileHeight = document.body.clientHeight - 110;
    const style = isMobile ? { minHeight: currMobileHeight } : { minHeight: currHeight };

    return (
      <div style={style} className="booking-confirm-form">
        <div className="col-lg-12">
          <div className="ibox float-e-margins">
            {/* <BookingSuccessHeadLiner />*/}
            <BookingContract contractInfo={initialValuesObject} {...this.props} />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="ibox float-e-margins" style={{ marginTop: '-20px' }}>
            {/* <BookingSuccessHeadLiner />*/}
            <BookingPayInformation contractInfo={initialValuesObject} {...this.props} />
          </div>
        </div>

        <div className="col-md-12 text-center" style={{ marginTop: '20px' }}>
          <form onSubmit={handleSubmit}>
            <Button
              type="submit" bsSize="large" bsStyle="primary" className="btn-brand"
              style={{ width: '80%', marginTop: '-40px' }}
            >
              <TranslatedMessage messages={messages} messageId="payAndFinish" tagName="span" />
            </Button>
          </form>
        </div>

      </div>
    );
  }
}

BookingReviewForm.propTypes = {
  // intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // submitting: PropTypes.bool,
  initialValues: PropTypes.any,
  // onGoToInventory: PropTypes.func,
  // makeBooking: PropTypes.func,
  // formValues: PropTypes.any,
};

export default injectIntl(reduxForm({
  form: 'BookingForm',
  // enableReinitialize: false,
})(BookingReviewForm));
