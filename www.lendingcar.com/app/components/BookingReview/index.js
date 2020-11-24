/**
*
* PaymentDetailForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';
// import { injectIntl } from 'react-intl';
// import { pick } from 'lodash';

// import * as FormField from 'components/Form/BootstrapFormField';
// import BookingSuccessHeadLiner from 'forms/BookingReviewForm/components/BookingSuccessHeadLiner';
// import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';
// import { getFeature } from 'utils/helpers';
import TranslatedMessage, { formatMessage } from 'components/TranslatedMessage';
import BookingContract from 'components/BookingContract';
import BookingPayInformation from 'components/BookingPayInformation';
import { OTHER_LINK } from 'utils/constants';

import messages from './messages';
import './style.scss';

class BookingReview extends React.Component {// eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    scrollTo(0, 0);
  }

  render() {
    const { bookingData, onFinish, onEdit } = this.props;

    const currHeight = document.body.clientHeight - 320;
    const currMobileHeight = document.body.clientHeight - 110;
    const style = isMobile ? { minHeight: currMobileHeight } : { minHeight: currHeight };

    return (
      <div style={style} className="booking-confirm-form">
        <div className="col-lg-12">
          <div className="ibox float-e-margins">
            <BookingContract
              titleId="bookingInformation"
              iconType="edit"
              buttonId="changeVehicle"
              isShow
              onEdit={onEdit}
              bookingData={bookingData}
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="ibox float-e-margins" style={{ marginTop: '-20px' }}>
            <BookingPayInformation bookingData={bookingData} onEdit={onEdit} />
          </div>
        </div>

        <div className="col-md-12 text-center" style={{ marginTop: '20px' }}>
          <Button
            type="button" bsSize="large" bsStyle="primary" className="btn-brand"
            style={{ width: '80%', marginTop: '-40px' }}
            onClick={() => onFinish(bookingData)} disabled={this.props.checked === false}
          >
            <TranslatedMessage messages={messages} messageId="payAndFinish" tagName="span" />
          </Button>
          <form>
            <input type="checkbox" checked={this.props.checked === true} onClick={() => this.props.changeChecked()} />
            &nbsp;<span style={{ fontWeight: 'bold' }}>
              {formatMessage(this.props.intl, messages, 'privacyStatementOne')}
              <a href={OTHER_LINK.terms} target="_blan">
                {formatMessage(this.props.intl, messages, 'termsAndConditions')}</a>
              {formatMessage(this.props.intl, messages, 'privacyStatementTwo')}
              <a href={OTHER_LINK.privacyPolicy} target="_blank">
                {formatMessage(this.props.intl, messages, 'privacyPolicy')}</a>.
            </span>
          </form>
        </div>

      </div>
    );
  }
}

BookingReview.propTypes = {
  // intl: intlShape.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  // submitting: PropTypes.bool,
  intl: PropTypes.object,
  onFinish: PropTypes.func,
  onEdit: PropTypes.func,
  bookingData: PropTypes.object,
  checked: PropTypes.bool,
  changeChecked: PropTypes.func,
};

export default BookingReview;
