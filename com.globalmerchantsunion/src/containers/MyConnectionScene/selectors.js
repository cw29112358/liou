import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

import {
  getProfile,
} from 'utils/helpers';
import { selectProfiles } from 'containers/AppRouter/selectors';

export const selectMyConnectionSceneReducer = (state) => state.get('myConnectionScene', Immutable.Map());
export const selectConnections = createGetSelector(
  selectMyConnectionSceneReducer, 'connections', Immutable.List()
);
export const selectConnectionsLoading = createGetSelector(
  selectMyConnectionSceneReducer, 'connectionsLoading', false,
);
export const selectRecommends = createGetSelector(
  selectMyConnectionSceneReducer, 'recommends', Immutable.List()
);
export const selectRecommendsLoading = createGetSelector(
  selectMyConnectionSceneReducer, 'recommendsLoading', false,
);

export const selectIsLoading = createSelector(
  selectConnectionsLoading,
  selectRecommendsLoading,
  (connectionsLoading, recommendsLoading) => connectionsLoading || recommendsLoading
);
export const selectConnectionsUserIds = createSelector(
  selectConnections,
  (connections) => connections.map((item) => item.get('user'))
);

export const selectProfileConnections = createSelector(
  selectConnections,
  selectProfiles,
  (connections, profiles) => connections
    .map((item) => (
      item
        .set('profile', getProfile(profiles, item))
    ))
);
export const selectProfileRecommends = createSelector(
  selectRecommends,
  selectProfiles,
  (recommends, profiles) => recommends
    .map((item) => (
      item
        .set('profile', getProfile(profiles, item))
    ))
);

export const selectMyConnectionGroup = createSelector(
  selectProfileConnections,
  selectProfileRecommends,
  (connections, recommends) => Immutable.Map({
    internetGroup: connections,
    recommendedGroup: recommends,
  })
);
