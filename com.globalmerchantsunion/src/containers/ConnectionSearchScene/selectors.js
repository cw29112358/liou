import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

import {
  selectProfiles,
  selectAuthUserId,
} from 'containers/AppRouter/selectors';
import { selectConnectionsUserIds } from 'containers/MyConnectionScene/selectors';

export const selectConnectionSearchSceneReducer = (state) => state.get('connectionSearchScene', Immutable.Map());
export const selectSearchKey = createGetSelector(
  selectConnectionSearchSceneReducer, 'searchKey', '',
);
export const selectSearchValue = createGetSelector(
  selectConnectionSearchSceneReducer, 'searchValue', '',
);

// 非好友map
export const selectAllProfiles = createSelector(
  selectProfiles,
  selectConnectionsUserIds,
  selectAuthUserId,
  (profiles, userIds, myProfileId) => (
    profiles.filter((item, key) => (
      !userIds.includes(key) && item.get('id') !== myProfileId
    ))
  )
);
export const selectSearchProfiles = createSelector(
  selectAllProfiles,
  selectSearchKey,
  selectSearchValue,
  (profiles, key, value) => (
    profiles
      .filter((item) => {
        if (item.get(key)) {
          return item.get(key).includes(value);
        }
        return false;
      })
      .valueSeq()
  )
);
