import { fromJS } from 'immutable';
import { selectAppointmentSuccessSceneReducer } from '../selectors';

describe('selectAppointmentSuccessSceneReducer', () => {
  it('Tests specified unit', () => {
    const initialState = fromJS({});
    const expected = fromJS({});
    expect(selectAppointmentSuccessSceneReducer(initialState)).toEqual(expected);
  });
});
