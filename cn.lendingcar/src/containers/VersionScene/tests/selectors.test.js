import { fromJS } from 'immutable';
import { selectVersionSceneReducer } from '../selectors';

describe('selectVersionSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectVersionSceneReducer(initialState)).toEqual(expected);
  });
});
