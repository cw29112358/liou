import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import moment from 'moment';

import { getCalculatedItem } from 'containers/InventoryScene/selectors';

export const selectAppRouter = (state) => state.get('appRouter', Immutable.Map());
export const selectAllUsers = createGetSelector(selectAppRouter, 'users', Immutable.Map());
export const selectAuthUserId = createGetSelector(selectAppRouter, 'authUserId', '');
export const selectIsLoading = createGetSelector(selectAppRouter, 'isLoading', false);
export const selectIsPrimary = createGetSelector(selectAppRouter, 'isPrimary', false);
export const selectError = createGetSelector(selectAppRouter, 'error', false);
export const selectMessage = createGetSelector(selectAppRouter, 'message', '');
export const selectVerificationCodeInfos = createGetSelector(selectAppRouter, 'verificationCodeInfos', Immutable.Map());
export const selectLanguage = createGetSelector(selectAppRouter, 'language', 'en');
export const selectFavouriteCar = createGetSelector(selectAppRouter, 'favouriteCar', Immutable.List());
export const selectIsFavouriteError = createGetSelector(selectAppRouter, 'favouriteError', false);

export const selectAuthUser = createSelector(
  selectAuthUserId,
  selectAllUsers,
  (userId, users) => users.get(userId, Immutable.Map())
);
export const selectAuthUserMembership = createSelector(
  selectAuthUser,
  (authUser) => {
    const membership = authUser.get('membership', Immutable.Map());
    const status = membership.get('status');
    const isMembership = !!(status === 'active' || status === 'inactive');
    return membership.set('isMembership', isMembership);
  }
);
export const selectAuthUserAgent = createSelector(
  selectAuthUser,
  (authUser) => authUser.get('agent', Immutable.Map())
);
export const selectAuthUserInfo = createSelector(
  selectAuthUser,
  (authUser) => authUser.get('profile', Immutable.Map())
);

export const selectToBeAgentTime = createSelector(
  selectAuthUserAgent,
  (agent) => {
    const today = moment(new Date());
    const agentCreatedDate = moment(agent.get('createdDate'));
    return today.diff(agentCreatedDate, 'days');
  }
);
export const selectDrivers = createGetSelector(selectAuthUserInfo, 'drivers', Immutable.List());

export const selectIsLoggedIn = createSelector(selectAuthUserId,
  (substate) => !!substate);
export const selectIsLogoutDone = createSelector(selectAppRouter, (substate) => substate.get('logoutDone', true));
export const selectIsDone = createSelector(selectAppRouter,
  (substate) => substate.get('done', true));

// 收藏
export const makeSelectAvailabilityFavouriteCar = (availability) => createSelector(
  selectFavouriteCar,
  (favouriteCars) => {
    if (!favouriteCars || !favouriteCars.size) return Immutable.List();

    return favouriteCars
      .map((item) => getCalculatedItem(item))
      .filter((favouriteCar) => favouriteCar.get('availability') === availability);
  }
);
export const selectAvailableFavouriteCar = makeSelectAvailabilityFavouriteCar('available');
export const selectNotAvailableFavouriteCar = makeSelectAvailabilityFavouriteCar('notAvailable');

export const selectFavouriteCarId = createSelector(
  selectFavouriteCar,
  (favouriteCars) => getCarId(favouriteCars)
);
export const selectAvailableFavouriteCarId = createSelector(
  selectAvailableFavouriteCar,
  (availableFavouriteCars) => getCarId(availableFavouriteCars)
);
export const selectNotAvailableFavouriteCarId = createSelector(
  selectNotAvailableFavouriteCar,
  (notAvailableFavouriteCars) => getCarId(notAvailableFavouriteCars)
);
export function getCarId(favouriteCars) {
  if (!favouriteCars || !favouriteCars.size) return Immutable.List();

  return favouriteCars
    .reduce((result, item) => {
      const id = item.get('id');
      return result.push(id);
    }, Immutable.List());
}
