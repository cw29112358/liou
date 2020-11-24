import { fromJS } from 'immutable';
import { selectConnectionSearchSceneReducer } from '../selectors';

describe('selectConnectionSearchSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectConnectionSearchSceneReducer(initialState)).toEqual(expected);
  });
});
