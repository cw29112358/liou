import { fromJS } from 'immutable';
import { selectMemberPaymentSceneReducer } from '../selectors';

describe('selectMemberPaymentSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectMemberPaymentSceneReducer(initialState)).toEqual(expected);
  });
});
