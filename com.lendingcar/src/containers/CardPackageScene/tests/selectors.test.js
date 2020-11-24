import { fromJS } from 'immutable';
import { selectCardPackageSceneReducer } from '../selectors';

describe('selectCardPackageSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectCardPackageSceneReducer(initialState)).toEqual(expected);
  });
});
