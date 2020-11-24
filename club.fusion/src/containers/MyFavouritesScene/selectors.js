import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

import {
  getProfile,
  getIsFriend,
  getSortList,
} from 'utils/helpers';
import { selectProfiles } from 'containers/AppRouter/selectors';
import { selectConnectionsUserIds } from 'containers/MyConnectionScene/selectors';

export const selectMyFavouritesSceneReducer = (state) => state.get('myFavouritesScene', Immutable.Map());
export const selectFavourites = createGetSelector(
  selectMyFavouritesSceneReducer, 'favourites', Immutable.List()
);
export const selectIsLoading = createGetSelector(
  selectMyFavouritesSceneReducer, 'isLoading', false
);

export const selectFavouritesIds = createSelector(
  selectFavourites,
  (list) => list.map((item) => item.get('id'))
);

export const selectNewFavourites = createSelector(
  selectFavourites,
  selectProfiles,
  selectConnectionsUserIds,
  (favourites, profiles, userIds) => favourites
    .map((item) => (
      item
        .set('isFavourite', true)
        .set('isSelected', false)
        .set('profile', getProfile(profiles, item))
        .setIn(['profile', 'isFriend'], getIsFriend(userIds, item))
    ))
);
export const selectSortFavourites = createSelector(
  selectNewFavourites,
  (list) => getSortList(list)
);
