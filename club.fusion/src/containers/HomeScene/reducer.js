/*
 *
 * HomeScene reducer
 *
 */
import { getImmutableData } from 'utils/helpers';

import {
  LOAD_AREA_CONFIG,
  LOAD_AREA_CONFIG_SUCCESS,
  LOAD_AREA_CONFIG_FAIL,

  LOAD_LOCATION_CITY,
  LOAD_LOCATION_CITY_SUCCESS,
  LOAD_LOCATION_CITY_FAIL,

  LOAD_ACTIVITIES,
  LOAD_ACTIVITIES_SUCCESS,
  LOAD_ACTIVITIES_FAIL,
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

    case LOAD_LOCATION_CITY:
      return state;
    case LOAD_LOCATION_CITY_SUCCESS: {
      return state.set('locationCity', getImmutableData(action.locationCity));
    }
    case LOAD_LOCATION_CITY_FAIL:
      return state;

    case LOAD_ACTIVITIES: {
      const { params: { area, industry } } = action;
      return state
        .set('area', area)
        .set('industry', industry)
        .set('isLoading', true);
    }
    case LOAD_ACTIVITIES_SUCCESS: {
      return state.set('activities', getImmutableData(action.activities))
        .set('isLoading', false);
    }
    case LOAD_ACTIVITIES_FAIL:
      return state;

    default:
      return state;
  }
}

export default homeSceneReducer;
