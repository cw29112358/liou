import { fromJS } from 'immutable';
import { selectApplyLoanSceneReducer } from '../selectors';

describe('selectApplyLoanSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectApplyLoanSceneReducer(initialState)).toEqual(expected);
  });
});
