import { fromJS } from 'immutable';
import { selectAppRouter } from '../selectors';

describe('selectAppRouter', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectAppRouter(initialState)).toEqual(expected);
  });
});
