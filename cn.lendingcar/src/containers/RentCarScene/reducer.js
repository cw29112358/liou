/*
 *
 * RentCarScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import auth from 'utils/auth';
import { INVENTORY_LOAD } from 'containers/InventoryScene/constants';
import { SAVE_TIME_ADDRESS } from 'containers/RentScene/constants';

import {
  LOAD_AREA_CONFIG,
  LOAD_AREA_CONFIG_SUCCESS,
  LOAD_AREA_CONFIG_FAIL,

  LOAD_LOCATION_CITY,
  LOAD_LOCATION_CITY_SUCCESS,
  LOAD_LOCATION_CITY_FAIL,

  LOAD_RENTAL_INVENTORY,
  LOAD_RENTAL_INVENTORY_SUCCESS,
  LOAD_RENTAL_INVENTORY_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function rentCarSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_AREA_CONFIG:
      return state;
    case LOAD_AREA_CONFIG_SUCCESS: {
      return state.set('areaConfig', getImmutableData(action.areaConfig));
    }
    case LOAD_AREA_CONFIG_FAIL:
      return state;

    case INVENTORY_LOAD: {
      const { area } = action.params;
      if (!area) return state;

      auth.set(area, 'localArea');
      return state.set('area', area);
    }

    case LOAD_LOCATION_CITY:
      return state;
    case LOAD_LOCATION_CITY_SUCCESS: {
      return state.set('locationCity', getImmutableData(action.locationCity));
    }
    case LOAD_LOCATION_CITY_FAIL:
      return state;
    // 把当前选择的取车时间、还车时间、取车区域、还车区域存入rentInfo
    case SAVE_TIME_ADDRESS:
      return state.set('rentInfo', action.params);
    case LOAD_RENTAL_INVENTORY:
      return state;
    // 把重新获取的短租车列表存入rentInventory
    case LOAD_RENTAL_INVENTORY_SUCCESS:
      return state.set('rentInventory', action.invnetories);
    case LOAD_RENTAL_INVENTORY_FAIL:
      return state;
    default:
      return state;
  }
}

export default rentCarSceneReducer;
