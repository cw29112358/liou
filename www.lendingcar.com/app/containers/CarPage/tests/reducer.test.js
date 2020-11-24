
import { fromJS } from 'immutable';
import carPageReducer from '../reducer';

describe('carPageReducer', () => {
  it('returns the initial state', () => {
    expect(carPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
