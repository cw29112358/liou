import { fromJS } from 'immutable';
import { selectRentCarSceneReducer } from '../selectors';

describe('selectRentCarSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectRentCarSceneReducer(initialState)).toEqual(expected);
  });
});
