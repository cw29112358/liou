import { fromJS } from 'immutable';
import { selectAgentSceneReducer } from '../selectors';

describe('selectAgentSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectAgentSceneReducer(initialState)).toEqual(expected);
  });
});
