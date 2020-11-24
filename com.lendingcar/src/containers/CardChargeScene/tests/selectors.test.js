import { fromJS } from 'immutable';
import { selectCardChargeSceneReducer } from '../selectors';

describe('selectCardChargeSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectCardChargeSceneReducer(initialState)).toEqual(expected);
  });
});
