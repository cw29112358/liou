import { fromJS } from 'immutable';
import { selectImessageSceneReducer } from '../selectors';

describe('selectImessageSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectImessageSceneReducer(initialState)).toEqual(expected);
  });
});
