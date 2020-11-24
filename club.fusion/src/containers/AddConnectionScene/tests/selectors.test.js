import { fromJS } from 'immutable';
import { selectAddConnectionSceneReducer } from '../selectors';

describe('selectAddConnectionSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectAddConnectionSceneReducer(initialState)).toEqual(expected);
  });
});
