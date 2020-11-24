import { createGetSelector } from 'reselect-immutable-helpers';
import { createSelector } from 'reselect';
import Immutable, { fromJS } from 'immutable';
import { LOCATIONS } from 'components/TripConfigurationBarMonth/constants';

// selectLocationState expects a plain JS object for the routing state
export const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export const selectApp = (state) => state.get('app');

export const selectShouldSubscribeModalShown = createGetSelector(
  selectApp, 'shouldSubscribeModalShown'
);
export const selectIsLoading = createGetSelector(
  selectApp, 'isLoading'
);
export const selectIsDone = createSelector(
  selectApp,
  (substate) => substate.get('done', true)
);
export const selectIsShowNotification = createGetSelector(
  selectApp, 'showNotification'
);
export const selectIsLogoutDone = createSelector(
  selectApp,
  (substate) => substate.get('logoutDone', true)
);
export const selectError = createGetSelector(
  selectApp, 'error'
);
export const selectMsg = createGetSelector(
  selectApp, 'msg'
);
export const selectShowResend = createGetSelector(
  selectApp, 'showResend'
);

export const selectAreaConfig = createGetSelector(
  selectApp,
  'areaConfig', Immutable.Map()
);
export const selectActiveAreas = createSelector(
  selectAreaConfig,
  () => fromJS(LOCATIONS),
  // (areaConfig) => {
  //   const enabledLocations = Object.keys(areaConfig.toJS());
  //   LOCATIONS.options.forEach((option) => {
  //     const newOption = option;
  //     if (enabledLocations.includes(option.value)) newOption.unSelect = false;
  //     return newOption;
  //   });
  //   return fromJS(LOCATIONS);
  // }
);

export const selectAllUsers = createGetSelector(
  selectApp, 'users', Immutable.Map()
);
export const selectAuthUserId = createGetSelector(
  selectApp, 'authUser', ''
);

export const selectIsLoggedIn = createSelector(
  selectAuthUserId,
  (substate) => !!substate
);
export const selectAuthUserInfo = createSelector(
  selectAuthUserId,
  selectAllUsers,
  (userId, users) => users.get(userId, Immutable.Map())
);

export const selectProfileUserId = createGetSelector(
  selectApp, 'profileUserId'
);
export const selectProfileUserInfo = createSelector(
  selectProfileUserId,
  selectAllUsers,
  (userId, users) => users.get(userId, Immutable.Map())
);
export const selectProfileCreatedTime = createGetSelector(
  selectProfileUserInfo, 'createdTime'
);

export const selectCalculator = createGetSelector(
  selectApp, 'calculator', Immutable.Map()
);
export const selectArea = createGetSelector(
  selectCalculator, 'area'
);
export const selectPassengers = createGetSelector(
  selectCalculator, 'passengers'
);
export const selectSize = createGetSelector(
  selectCalculator, 'size'
);
export const selectDate = createGetSelector(
  selectCalculator, 'date'
);
export const selectTerm = createGetSelector(
  selectCalculator, 'term'
);

export const selectCurrentAreaConfig = createGetSelector(
  selectAreaConfig,
  selectArea,
  (areaConfig, area) => areaConfig.get(area)
);

export const selectSignUpFormStore = createGetSelector(
  selectApp, 'signUpForm'
);
export const selectSignUpForm = createSelector(
  selectSignUpFormStore,
  (formDataDB) => {
    const formDataLocal = fromJS({
      email: window.localStorage.email === 'undefined' ? '' : window.localStorage.email,
      name: window.localStorage.name === 'undefined' ? '' : window.localStorage.name,
      referralCode: window.localStorage.referralCode === 'undefined' ? '' : window.localStorage.referralCode,
    });
    return formDataDB.merge(formDataLocal);
  }
);
export const selectRedirectUrl = createGetSelector(
  selectSignUpFormStore, 'redirectUrl'
);
export const selectEmailInSignUp = createGetSelector(
  selectSignUpFormStore, 'email'
);
export const selectIsSubscribed = createSelector(
  selectEmailInSignUp,
  (email) => {
    if (email || window.localStorage.email) {
      return true;
    }
    return false;
  }
);

export const selectIsLimited = () => {
  const path = window.location.pathname;
  const flag = path.split('/')[1];
  return flag === 'd';
};
export const selectIsHome = () => {
  const path = window.location.pathname;
  const hash = window.location.hash;
  return path === '/' || hash === '#/';
};
