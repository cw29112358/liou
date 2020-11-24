/*
 *
 * ProfileScene actions
 *
 */

import {
  RELEASE_ACTIVITIES,
  RELEASE_ACTIVITIES_SUCCESS,
  RELEASE_ACTIVITIES_FAIL,
  SAVE_UPLOAD_FILE_FIELD,
} from './constants';

export function releaseActivitiesAction(formData, uploadFilefiled) {
  return {
    type: RELEASE_ACTIVITIES,
    formData,
    uploadFilefiled,
  };
}
export function releaseActivitiesSuccessAction(activities) {
  return {
    type: RELEASE_ACTIVITIES_SUCCESS,
    activities,
  };
}
export function releaseActivitiesFailAction(error) {
  return {
    type: RELEASE_ACTIVITIES_FAIL,
    error,
  };
}

export function saveUploadFileField(fileObject) {
  return {
    type: SAVE_UPLOAD_FILE_FIELD,
    fileObject,
  };
}
