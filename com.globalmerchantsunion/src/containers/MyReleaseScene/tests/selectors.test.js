import { fromJS } from 'immutable';
import { selectMyReleaseSceneReducer } from '../selectors';

describe('selectMyReleaseSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectMyReleaseSceneReducer(initialState)).toEqual(expected);
  });
});
