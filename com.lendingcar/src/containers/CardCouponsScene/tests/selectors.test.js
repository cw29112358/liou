import { fromJS } from 'immutable';
import { selectCardCouponsSceneReducer } from '../selectors';

describe('selectCardCouponsSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectCardCouponsSceneReducer(initialState)).toEqual(expected);
  });
});
