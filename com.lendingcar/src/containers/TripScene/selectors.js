import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import moment from 'moment';

import {
  momentFormat,
  getCalculatedString,
} from 'utils/helpers';

export const selectTripSceneReducer = (state) => state.get('tripScene', Immutable.Map());

export const selectAllTrips = createGetSelector(
  selectTripSceneReducer, 'trips', Immutable.List()
);
export const selectIsLoading = createGetSelector(
  selectTripSceneReducer, 'isLoading', true,
);
export const selectTab = createGetSelector(
  selectTripSceneReducer, 'tab', 'pending',
);

export const selectRootTrip = createSelector(
  selectAllTrips,
  (allTrips) => (
    allTrips
      .map((item) => (
        item
          .updateIn(['car', 'make'], (val) => getCalculatedString(val))
          .update('pickupDate', momentFormat)
          .update('returnDate', momentFormat)
      ))
      .sortBy((item) => {
        const createdTime = item.get('createdTime');
        const unix = moment(createdTime).unix();
        return -unix;
      })
  )
);

export const selectCurrentTabTrips = createSelector(
  selectRootTrip,
  selectTab,
  (allTrips, tab) => {
    if (tab === 'allTrip') return allTrips;

    return allTrips
      .filter((item) => item.get('bookingState') === tab);
  }

);
