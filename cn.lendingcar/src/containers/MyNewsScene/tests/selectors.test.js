import { fromJS } from 'immutable';
import { selectMyNewsSceneReducer } from '../selectors';

describe('selectMyNewsSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectMyNewsSceneReducer(initialState)).toEqual(expected);
  });
});
