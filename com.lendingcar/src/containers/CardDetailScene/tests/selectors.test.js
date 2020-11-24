import { fromJS } from 'immutable';
import { selectCardDetailSceneReducer } from '../selectors';

describe('selectCardDetailSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectCardDetailSceneReducer(initialState)).toEqual(expected);
  });
});
