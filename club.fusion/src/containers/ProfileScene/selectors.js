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

export const selectProfileSceneReducer = (state) => state.get('profileScene', Immutable.Map());
export const selectActivities = createGetSelector(
  selectProfileSceneReducer, 'activities', Immutable.List(),
);
export const selectActivitiesLoading = createGetSelector(
  selectProfileSceneReducer, 'activitiesLoading', false,
);
export const selectProfile = createGetSelector(
  selectProfileSceneReducer, 'profile', Immutable.Map(),
);

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
