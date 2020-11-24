import { fromJS } from 'immutable';
import { selectInventorySceneReducer } from '../selectors';

describe('selectInventorySceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectInventorySceneReducer(initialState)).toEqual(expected);
  });
});
