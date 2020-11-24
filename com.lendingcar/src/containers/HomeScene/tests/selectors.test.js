import { fromJS } from 'immutable';
import { selecthomeScene } from '../selectors';

describe('selectHomeSceneReducer', () => {
  it('Tests specified unit', () => {
    const expected = fromJS({});
    const initialState = fromJS({});
    expect(selecthomeScene(initialState)).toEqual(expected);
  });
});
