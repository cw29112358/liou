import { fromJS } from 'immutable';
import { selectMyFavouritesSceneReducer } from '../selectors';

describe('selectMyFavouritesSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectMyFavouritesSceneReducer(initialState)).toEqual(expected);
  });
});
