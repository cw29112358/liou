import { fromJS } from 'immutable';
import { selectProjectDetailSceneReducer } from '../selectors';

describe('selectProjectDetailSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectProjectDetailSceneReducer(initialState)).toEqual(expected);
  });
});
