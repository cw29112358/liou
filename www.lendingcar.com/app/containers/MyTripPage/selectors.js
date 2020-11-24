import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { createGetSelector } from 'reselect-immutable-helpers';

export const selectTripPageDomain = (state) => state.get('myTripPage');

export const selectTrips = createSelector(
  selectTripPageDomain,
  (tripDomain) => tripDomain.get('trips')
);

export const selectTripTypes = createSelector(
  selectTripPageDomain,
  (tripDomain) => tripDomain.get('tripTypes')
);

export const selectIsLatest = createGetSelector(
  selectTripPageDomain, 'isLatest'
);

export const selectIsLoading = createGetSelector(
  selectTripPageDomain, 'isLoading'
);

export const selectAllTrips = createSelector(
  selectTrips,
  (trips) => trips
);

export const selectUpcompingTrips = createSelector(
  selectTrips,
  (trips) => fromJS(trips.toJS().filter((trip) => trip.bookingState === 'pending'))
);

export const selectRentingTrips = createSelector(
  selectTrips,
  (trips) => fromJS(trips.toJS().filter((trip) => trip.bookingState === 'leasing'))
);

export const selectCanceledTrips = createSelector(
  selectTrips,
  (trips) => fromJS(trips.toJS().filter((trip) => trip.bookingState === 'canceled'))
);

export const selectDoneTrips = createSelector(
  selectTrips,
  (trips) => fromJS(trips.toJS().filter((trip) => trip.bookingState === 'returned'))
);
