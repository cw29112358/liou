import { createGetSelector } from 'reselect-immutable-helpers';
import { createSelector } from 'reselect';
import Immutable from 'immutable';
import moment from 'moment';

import { getCalculatedItem } from 'containers/InventoryScene/selectors';

export const selectMyNewsSceneReducer = (state) => state.get('myNewsScene', Immutable.Map());

export const selectNotifications = createGetSelector(
  selectMyNewsSceneReducer, 'notifications', Immutable.List()
);
export const selectIsLoading = createGetSelector(
  selectMyNewsSceneReducer, 'isLoading', true,
);
export const selectNotificationsLastReadTime = createGetSelector(
  selectMyNewsSceneReducer, 'notificationsLastReadTime', Immutable.Map(),
);

export const filterInvalidNotification = (item) => {
  if (item.get('type') === 'notice') {
    return item.get('promotionImages').size > 0 && item.get('locale') === 'en';
  }
  return item.get('locale') === 'en';
};
export const formatCarData = (item) => item.update(
  'metadata',
  (value) => {
    if (item.get('metadata')) return getCalculatedItem(item.get('metadata'));
    return value;
  }
);
export const selectOrderNotifications = createSelector(
  selectNotifications,
  (notifications) => notifications.filter(filterInvalidNotification)
    .map(formatCarData)
    .sortBy((item) => {
      const createdTime = item.get('createdTime');
      const unix = moment(createdTime).unix();
      return -unix;
    })
);

export const selectNotificationListIsRead = createSelector(
  selectOrderNotifications,
  selectNotificationsLastReadTime,
  (notifications, unixTime) => {
    const unix = notifications.get(0);
    if (!unixTime) return true;
    if (!unix) return false;
    if (unix.size > 0) {
      return moment(unix.get('createdTime')).unix() >= Number(unixTime);
    }
    return true;
  }
);

export const selectNotice = createSelector(
  selectOrderNotifications,
  (notifications) => {
    const notice = notifications.filter((value) => value.get('type') === 'notice');
    return notice.get(0);
  }
);
