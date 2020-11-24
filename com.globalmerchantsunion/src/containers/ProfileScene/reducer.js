/*
 *
 * ProfileScene reducer
 *
 */
import { getImmutableData } from 'utils/helpers';

import {
  LOAD_USER_ACTIVITIES,
  LOAD_USER_ACTIVITIES_SUCCESS,
  LOAD_USER_ACTIVITIES_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function ProfileSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_ACTIVITIES: {
      const profileUser = state.getIn(['profile', 'user']);
      const { params, isFirstLoad } = action;

      const result = state.set('activitiesLoading', true);
      if (!isFirstLoad && profileUser === params.user) return result;

      return result
        .delete('activities')
        .delete('profile');
    }
    case LOAD_USER_ACTIVITIES_SUCCESS: {
      return state
        .set('activitiesLoading', false)
        .set('activities', getImmutableData(action.activities))
        .set('loadContentLength', action.loadContentLength);
    }
    case LOAD_USER_ACTIVITIES_FAIL:
      return state
        .set('activitiesLoading', false);

    default:
      return state;
  }
}

export default ProfileSceneReducer;
