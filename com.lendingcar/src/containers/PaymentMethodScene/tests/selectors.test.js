import { fromJS } from 'immutable';
import { selectPaymentMethodSceneReducer } from '../selectors';

describe('selectPaymentMethodSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectPaymentMethodSceneReducer(initialState)).toEqual(expected);
  });
});
