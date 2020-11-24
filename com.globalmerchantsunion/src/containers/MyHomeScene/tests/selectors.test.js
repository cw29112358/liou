import { fromJS } from 'immutable';
import { selectMyHomeSceneReducer } from '../selectors';

describe('selectMyHomeSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectMyHomeSceneReducer(initialState)).toEqual(expected);
  });
});
