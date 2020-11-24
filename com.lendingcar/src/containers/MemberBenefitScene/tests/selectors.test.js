import { fromJS } from 'immutable';
import { selectMemberBenefitSceneReducer } from '../selectors';

describe('selectMemberBenefitSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectMemberBenefitSceneReducer(initialState)).toEqual(expected);
  });
});
