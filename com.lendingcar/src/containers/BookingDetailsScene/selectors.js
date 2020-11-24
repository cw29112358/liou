import { createSelector } from 'reselect';
import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

import { selectCurrentAreaConfig, selectArea } from 'containers/HomeScene/selectors';
import { selectGetCarInfo } from 'containers/InventoryCarScene/selectors';
import { selectDrivers } from 'containers/AppRouter/selectors';

export const selectBookingDetailsSceneReducer = (state) => state.get('bookingDetailsScene', Immutable.Map());
export const selectIsDone = createGetSelector(selectBookingDetailsSceneReducer, 'done', true);

const selectCalculatedCurrentArea = createSelector(
  selectCurrentAreaConfig,
  (currentArea) => {
    const filterKeys = [
      'pickupMode',
      'pickupAddress1',
      'pickupAddress2',
      'pickupCity',
      'pickupState',
      'pickupZip',
      'returnAddress1',
      'returnAddress2',
      'returnCity',
      'returnState',
      'returnZip',
    ];

    return filterKeys
      .reduce((result, key) => result.set(key, currentArea.get(key)), Immutable.Map());
  },
);
export const selectBookingData = createSelector(
  selectCalculatedCurrentArea,
  selectDrivers,
  selectGetCarInfo,
  selectArea,
  (currentArea, drivers, carInfo, area) => {
    const mergeBookingObject = currentArea
      .set('area', area)
      .set('locale', 'en')
      .set('drivers', drivers)
      .set('vehicleId', carInfo.get('id'))
      .set('deposit', carInfo.get('depositPrice'))
      .set('bookingFee', 0)
      .set('rate', 0)
      .set('term', 12)
      .set('totalDue', 0);
    return mergeBookingObject;
  }
);
