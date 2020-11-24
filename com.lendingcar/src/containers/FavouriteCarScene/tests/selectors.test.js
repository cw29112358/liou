import { fromJS } from 'immutable';
import { selectFavouriteCarSceneReducer } from '../selectors';

describe('selectFavouriteCarSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectFavouriteCarSceneReducer(initialState)).toEqual(expected);
  });
});
