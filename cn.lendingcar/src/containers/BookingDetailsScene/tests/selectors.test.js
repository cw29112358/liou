import { fromJS } from 'immutable';
import { selectBookingDetailsSceneReducer } from '../selectors';

describe('selectBookingDetailsSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectBookingDetailsSceneReducer(initialState)).toEqual(expected);
  });
});
