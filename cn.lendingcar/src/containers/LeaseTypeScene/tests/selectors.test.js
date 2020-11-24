import { fromJS } from 'immutable';
import { selectLeaseTypeSceneReducer } from '../selectors';

describe('selectLeaseTypeSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectLeaseTypeSceneReducer(initialState)).toEqual(expected);
  });
});
