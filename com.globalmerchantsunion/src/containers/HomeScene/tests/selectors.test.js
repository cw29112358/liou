import { fromJS } from 'immutable';
import { selectHomeSceneReducer } from '../selectors';

describe('selectHomeSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectHomeSceneReducer(initialState)).toEqual(expected);
  });
});
