/*
 *
 * ProfileScene reducer
 *
 */
import { getImmutableData } from 'utils/helpers';

import {
  RELEASE_ACTIVITIES,
  RELEASE_ACTIVITIES_SUCCESS,
  RELEASE_ACTIVITIES_FAIL,
  SAVE_UPLOAD_FILE_FIELD,
} from './constants';

const initialState = getImmutableData({
});

function ProfileSceneReducer(state = initialState, action) {
  switch (action.type) {
    case RELEASE_ACTIVITIES: {
      return state
        .set('activitiesLoading', true);
    }
    case RELEASE_ACTIVITIES_SUCCESS: {
      return state
        .set('activitiesLoading', false)
        .set('activities', getImmutableData(action.activities))
        .set('fileObject', getImmutableData({}));
    }
    case RELEASE_ACTIVITIES_FAIL:
      return state
        .set('activitiesLoading', false)
        .set('fileObject', getImmutableData({}));
    case SAVE_UPLOAD_FILE_FIELD:
      return state
        .set('fileObject', action.fileObject);
    default:
      return state;
  }
}

export default ProfileSceneReducer;
