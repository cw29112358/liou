import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const selectVersionSceneReducer = (state) => state.get('versionScene', Immutable.Map());

export const selectIsLoading = createGetSelector(
  selectVersionSceneReducer, 'isLoading', false
);
export const selectVersions = createGetSelector(
  selectVersionSceneReducer, 'versions', Immutable.Map()
);

export const selectVersionInfo = createSelector(
  selectVersions,
  (versions) => {
    const locale = 'CN';
    const platform = Platform.OS;
    let versionInfo = versions.get(`${platform}${locale}`);
    if (!versionInfo || !versionInfo.size) versionInfo = Immutable.Map();

    const readableVersion = DeviceInfo.getReadableVersion();
    const version = versionInfo.get('version') || '';
    const isLatest = readableVersion >= version;
    const isLargeLatest = readableVersion.substr(0, 3) >= version.substr(0, 3);

    return versionInfo
      .set('isLatest', isLatest)
      .set('isLargeLatest', isLargeLatest)
      .set('readableVersion', readableVersion);
  }
);
