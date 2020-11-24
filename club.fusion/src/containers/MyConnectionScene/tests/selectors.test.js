import { fromJS } from 'immutable';
import { selectMyConnectionSceneReducer } from '../selectors';

describe('selectMyConnectionSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectMyConnectionSceneReducer(initialState)).toEqual(expected);
  });
});
