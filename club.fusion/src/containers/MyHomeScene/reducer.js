/*
 *
 * MyHomeScene reducer
 *
 */
import { getImmutableData } from 'utils/helpers';

import {
  LOAD_MEMBERSHIPS_POINT,
  LOAD_MEMBERSHIPS_POINT_SUCCESS,
  LOAD_MEMBERSHIPS_POINT_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function ProfileSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MEMBERSHIPS_POINT: {
      return state
        .set('pointsLoading', true);
    }
    case LOAD_MEMBERSHIPS_POINT_SUCCESS: {
      return state
        .set('pointsLoading', false)
        .set('points', getImmutableData(action.points));
    }
    case LOAD_MEMBERSHIPS_POINT_FAIL:
      return state
        .set('pointsLoading', false);

    default:
      return state;
  }
}

export default ProfileSceneReducer;
