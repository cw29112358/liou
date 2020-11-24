/* eslint-disable linebreak-style */
import { createSelector } from 'reselect';
import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable, { fromJS } from 'immutable';
import { selectCalculatedCar, selectBookingDetails } from 'containers/CarPage/selectors';
import pick from 'lodash/pick';
import { selectAuthUserInfo } from 'containers/App/selectors';
import { getEnvironment } from 'utils/helpers';
import { BOOKING_DEBUG_DATA, LEASINGUSERKEYS } from './constants';

const env = getEnvironment();

/**
 * Direct selector to the bookingPage state domain
 */
export const selectBookingPageDomain = (state) => state.get('bookingPage');

export const selectAllForm = createGetSelector(
  selectBookingPageDomain, 'bookingForm', Immutable.Map()
);

export const selectCurrentBookingId = createGetSelector(
  selectAllForm, 'currentBookingId'
);

export const selectCurrentBookingForm = createSelector(
  selectAllForm,
  selectCurrentBookingId,
  (form, id) => form.get(id, Immutable.Map())
);

export const selectTotalDue = createSelector(
  selectCurrentBookingForm,
  (form) => form.get('totalDue', 0)
);

export const selectMergedBookingForm = createSelector(
  selectCurrentBookingForm,
  selectCalculatedCar,
  selectAuthUserInfo,
  selectBookingDetails,
  (originalData, car, currentUser, bookingDetails) => {
    const carInfo = car.toJS();
    const leasingUserInfo = pick(currentUser.toJS(), LEASINGUSERKEYS);
    const userImage = pick(currentUser.toJS(), 'logo');
    const form = originalData.merge(fromJS(bookingDetails))
                .set('vehicleMake', carInfo.make)
                .set('vehicleModel', carInfo.model)
                .set('vehicleYear', carInfo.year)
                .set('vehicleColor', carInfo.color)
                .set('vehicleType', carInfo.carType)
                .set('vehicleImage', carInfo.images ? carInfo.images[0] : '')
                .set('vehicleFeature', carInfo.feature)
                .set('vehiclePassengers', carInfo.passengers)
                .set('vehicleDoors', carInfo.doors)
                .set('vehicleMileage', carInfo.mileage)
                .set('vehicleLicensePlate', carInfo.licensePlate)
                .set('vehicleLink', `https://www.lendingcar.com/c/${carInfo.id}`)
                .set('vehicleId', carInfo.id)
                .set('vehicleVin', carInfo.vin)
                .set('userImage', userImage.logo)
                .set('locale', localStorage.DEFAULT_LOCALE || 'en')
                .merge(fromJS(leasingUserInfo));
    if (env === 'dev') return form.merge(fromJS(BOOKING_DEBUG_DATA));
    return form;
  }
);

export const selectBookingDone = createGetSelector(
  selectBookingPageDomain, 'done'
);

export const selectBookingError = createGetSelector(
  selectBookingPageDomain, 'error'
);

export const selectIsSubmitSuccess = createGetSelector(
  selectBookingPageDomain, 'isSubmitSuccess'
);
