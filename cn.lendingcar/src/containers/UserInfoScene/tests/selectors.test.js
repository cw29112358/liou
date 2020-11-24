import { fromJS } from 'immutable';
import { selectUserInfoSceneReducer } from '../selectors';

describe('selectUserInfoSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectUserInfoSceneReducer(initialState)).toEqual(expected);
  });
});
