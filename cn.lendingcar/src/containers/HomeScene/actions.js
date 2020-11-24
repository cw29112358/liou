/*
 *
 * HomeScene actions
 *
 */

import {
  LOAD_AREA_CONFIG,
  LOAD_AREA_CONFIG_SUCCESS,
  LOAD_AREA_CONFIG_FAIL,

  LOAD_LOCATION_CITY,
  LOAD_LOCATION_CITY_SUCCESS,
  LOAD_LOCATION_CITY_FAIL,
} from './constants';

export function loadAreaConfigAction(params = {}) {
  return {
    type: LOAD_AREA_CONFIG,
    params,
  };
}
export function loadAreaConfigSuccessAction(areaConfig) {
  return {
    type: LOAD_AREA_CONFIG_SUCCESS,
    areaConfig,
  };
}
export function loadAreaConfigFailAction(error) {
  return {
    type: LOAD_AREA_CONFIG_FAIL,
    error,
  };
}

export function loadLocationCityAction(onSuccess) {
  return {
    type: LOAD_LOCATION_CITY,
    onSuccess,
  };
}
export function loadLocationCitySuccessAction(locationCity) {
  return {
    type: LOAD_LOCATION_CITY_SUCCESS,
    locationCity,
  };
}
export function loadLocationCityFailAction(error) {
  return {
    type: LOAD_LOCATION_CITY_FAIL,
    error,
  };
}
