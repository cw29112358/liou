import { fromJS } from 'immutable';
import { selectTripSceneReducer } from '../selectors';

describe('selectTripSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectTripSceneReducer(initialState)).toEqual(expected);
  });
});
