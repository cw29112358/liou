import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const selecthomeScene = (state) => state.get('homeScene', Immutable.Map());

// areaConfig
export const selectAreaConfig = createGetSelector(
  selecthomeScene, 'areaConfig', Immutable.Map()
);
export const selectArea = createGetSelector(
  selecthomeScene, 'area', 'bayArea'
);
export const selectLocationCity = createGetSelector(
  selecthomeScene, 'locationCity', Immutable.Map()
);

export const selectCurrentAreaConfig = createGetSelector(
  selectAreaConfig,
  selectArea,
  (areaConfig, area) => areaConfig.get(area)
);
export const selectAreaList = createSelector(
  selectAreaConfig,
  (areaConfig) => areaConfig.keySeq()
);
export const selectLocationAreaList = createSelector(
  selectAreaList,
  (areaList) => {
    const list = Immutable.List(areaList).sortBy((value) => value === 'other');
    return list.unshift('all');
  }
);
