import { fromJS } from 'immutable';
import { selectInventoryCar } from '../selectors';

describe('selectInventoryCarSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectInventoryCar(initialState)).toEqual(expected);
  });
});
