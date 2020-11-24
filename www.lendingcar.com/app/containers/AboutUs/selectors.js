import { createSelector } from 'reselect';

/**
 * Direct selector to the aboutUs state domain
 */
export const selectAboutUsDomain = (state) => state.get('aboutUs');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AboutUs
 */

export const selectAboutUs = createSelector(
  selectAboutUsDomain,
  (substate) => substate
);

export default selectAboutUs;
