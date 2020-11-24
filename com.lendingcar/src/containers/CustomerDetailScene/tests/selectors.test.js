import { fromJS } from 'immutable';
import { selectCustomerDetailSceneReducer } from '../selectors';

describe('selectCustomerDetailSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectCustomerDetailSceneReducer(initialState)).toEqual(expected);
  });
});
