import { fromJS } from 'immutable';
import { selectMemberSceneReducer } from '../selectors';

describe('selectMemberSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectMemberSceneReducer(initialState)).toEqual(expected);
  });
});
