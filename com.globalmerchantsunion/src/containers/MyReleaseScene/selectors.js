import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectMyReleaseSceneReducer = (state) => state.get('myReleaseScene', Immutable.Map());
export const selectUploadFileObject = createGetSelector(
  selectMyReleaseSceneReducer, 'fileObject', Immutable.Map(),
);
export const selectActivitiesLoading = createGetSelector(
  selectMyReleaseSceneReducer, 'activitiesLoading', false,
);
