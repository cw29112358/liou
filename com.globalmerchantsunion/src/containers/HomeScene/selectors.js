import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

import {
  getProfile,
  getIsFriend,
  getIsFavourite,
  getSortList,
} from 'utils/helpers';
import { selectProfiles } from 'containers/AppRouter/selectors';
import { selectConnectionsUserIds } from 'containers/MyConnectionScene/selectors';
import { selectFavouritesIds } from 'containers/MyFavouritesScene/selectors';

export const selectHomeSceneReducer = (state) => state.get(
  'homeScene', Immutable.Map()
);
export const selectIsLoading = createGetSelector(
  selectHomeSceneReducer, 'isLoading', false
);
export const selectDone = createGetSelector(
  selectHomeSceneReducer, 'done', true
);
export const selectAreaConfig = createGetSelector(
  selectHomeSceneReducer, 'areaConfig', Immutable.Map()
);
export const selectIndustries = createGetSelector(
  selectHomeSceneReducer, 'industries', Immutable.List(),
);
export const selectArea = createGetSelector(
  selectHomeSceneReducer, 'area', 'bayArea'
);
export const selectIndustry = createGetSelector(
  selectHomeSceneReducer, 'industry', ''
);
export const selectLocationCity = createGetSelector(
  selectHomeSceneReducer, 'locationCity', Immutable.Map()
);
export const selectActivities = createGetSelector(
  selectHomeSceneReducer, 'activities', Immutable.List()
);
export const selectLoadContentLength = createGetSelector(
  selectHomeSceneReducer, 'loadContentLength', 0
);

export const selectIndustryOptions = createSelector(
  selectIndustries,
  (industries) => (
    industries.map((item) => Immutable.Map({
      label: item, value: item,
    }))
  )
);
export const selectHomeIndustryList = createSelector(
  selectIndustries,
  (industries) => (
    industries.unshift('all')
  )
);

// activities
export const selectProfileActivities = createSelector(
  selectActivities,
  selectProfiles,
  selectConnectionsUserIds,
  selectFavouritesIds,
  (activities, profiles, userIds, favouritesIds) => activities
    .map((item) => (
      item
        .set('profile', getProfile(profiles, item))
        .setIn(['profile', 'isFriend'], getIsFriend(userIds, item))
        .set('isFavourite', getIsFavourite(favouritesIds, item))
    ))
);
export const selectSortActivities = createSelector(
  selectProfileActivities,
  (list) => getSortList(list)
);

// area
export const selectCurrentAreaConfig = createSelector(
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
export const selectAreaOptions = createSelector(
  selectAreaList,
  (areaList) => areaList.map((value) => Immutable.Map({ label: value, value }))
);
