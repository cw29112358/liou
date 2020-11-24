/*
 *
 * HomeScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';
import auth from 'utils/auth';

import { INVENTORY_LOAD } from 'containers/InventoryScene/constants';

import {
  LOAD_AREA_CONFIG,
  LOAD_AREA_CONFIG_SUCCESS,
  LOAD_AREA_CONFIG_FAIL,

  LOAD_LOCATION_CITY,
  LOAD_LOCATION_CITY_SUCCESS,
  LOAD_LOCATION_CITY_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function homeSceneReducer(state = initialState, action) {
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

    default:
      return state;
  }
}

export default homeSceneReducer;
