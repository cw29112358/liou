import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectLandingPageRoot = (state) => state.get('landingPage') || Immutable.Map();

export const selectSearchBar = createGetSelector(selectLandingPageRoot, 'searchContent', Immutable.Map());

export const selectCars = createGetSelector(selectLandingPageRoot, 'car', Immutable.Map());
