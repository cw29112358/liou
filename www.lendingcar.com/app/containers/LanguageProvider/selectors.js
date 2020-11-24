// import { createSelector } from 'reselect';
import { createGetSelector } from 'reselect-immutable-helpers';

export const selectLanguage = (state) => state.get('language');

export const selectLocale = createGetSelector(
  selectLanguage,
  'locale',
);
