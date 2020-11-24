/*
 *
 * PackageProductPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  INVENTORY_CAR_LOAD_ACTION,
  INVENTORY_CAR_LOAD_SUCCESS_ACTION,
  INVENTORY_CAR_LOAD_FAIL_ACTION,

  INVENTORY_CAR_SINGLE_ACTION,
  INVENTORY_CAR_SINGLE_SUCCESS_ACTION,

} from './constants';

const initialState = fromJS({
  carId: [],
  carInfoGroup: [],
});

function inventoryCarSceneReducer(state = initialState, action) {
  switch (action.type) {
    case INVENTORY_CAR_LOAD_ACTION: {
      return state.set('isLoading', true)
        .set('key', action.key)
        .set('singleCar', fromJS(action.carInfo))
        .update('carInfoGroup', (carInfoGroup) => {
          if (action.key === 0) {
            return carInfoGroup.clear().set(action.key, fromJS({ [action.carInfo.carId]: action.carInfo }));
          }
          return carInfoGroup.set(action.key, fromJS({ [action.carInfo.carId]: action.carInfo }));
        });
    }
    case INVENTORY_CAR_SINGLE_ACTION:
      return state.set('isLoading', true)
        .set('key', action.key);
    case INVENTORY_CAR_SINGLE_SUCCESS_ACTION: {
      return state.set('isLoading', false)
        .set('singleCar', action.singleCar)
        .update('carInfoGroup', (carInfoGroup) => carInfoGroup.set(action.key, fromJS({ [action.singleCar.get('carId')]: action.singleCar })));
    }

    case INVENTORY_CAR_LOAD_SUCCESS_ACTION:
      return state.set('singleCar', action.singleCar.size > 0 ? action.singleCar : state.get('singleCar'))
        .set('isLoading', false);
    case INVENTORY_CAR_LOAD_FAIL_ACTION:
      return state.set('isLoading', false);

    default:
      return state;
  }
}

export default inventoryCarSceneReducer;
