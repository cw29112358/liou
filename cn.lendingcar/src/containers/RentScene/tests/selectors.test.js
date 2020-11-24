import { fromJS } from 'immutable';
import { selectRentSceneReducer } from '../selectors';

describe('selectRentSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectRentSceneReducer(initialState)).toEqual(expected);
  });
});
