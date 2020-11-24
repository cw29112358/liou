import { createGetSelector } from 'reselect-immutable-helpers';
import { createSelector } from 'reselect';
import Immutable from 'immutable';

import {
  getProfile,
  getSortList,
} from 'utils/helpers';
import {
  selectProfiles,
  selectUnreadMessageCount,
  selectConversations,
} from 'containers/AppRouter/selectors';

export const selectMyNewsSceneReducer = (state) => state.get('myNewsScene', Immutable.Map());
export const selectIsDone = createGetSelector(
  selectMyNewsSceneReducer, 'done', true,
);
export const selectNotifications = createGetSelector(
  selectMyNewsSceneReducer, 'notifications', Immutable.List()
);
export const selectNotificationsLoading = createGetSelector(
  selectMyNewsSceneReducer, 'notificationsLoading', false,
);
export const selectInvitations = createGetSelector(
  selectMyNewsSceneReducer, 'invitations', Immutable.List()
);
export const selectInvitationsLoading = createGetSelector(
  selectMyNewsSceneReducer, 'invitationsLoading', false,
);
export const selectInvitationId = createGetSelector(
  selectMyNewsSceneReducer, 'invitationId',
);

/* notifications */

// 1.order
export const selectFilterNotifications = createSelector(
  selectNotifications,
  (notifications) => {
    const filterFunc = (item) => {
      if (item.get('type') === 'notice') {
        return item.get('promotionImages').size > 0;
      }
      return true;
    };

    return notifications
      .filter(filterFunc);
  }
);
export const selectOrderedNotifications = createSelector(
  selectFilterNotifications,
  (list) => getSortList(list, 'createdAt')
);

// 2. notice
export const selectNotice = createSelector(
  selectOrderedNotifications,
  (notifications) => (
    notifications.find((item) => item.get('type') === 'notice')
  )
);

/* invitations */
export const selectProfileInvitations = createSelector(
  selectInvitations,
  selectProfiles,
  (invitations, profiles) => invitations
    .map((item) => (
      item
        .set('profile', getProfile(profiles, item, 'from'))
    ))
);
export const selectOrderedInvitations = createSelector(
  selectProfileInvitations,
  selectConversations,
  (invitations, conversations) => {
    const list = invitations
      .concat(conversations)
      .filter((item) => !item.get('isHidden'));
    return getSortList(list);
  }
);

export const selectInvitation = createSelector(
  selectInvitations,
  selectInvitationId,
  (invitations, id) => {
    if (!id) return Immutable.Map();

    return invitations
      .find((item) => item.get('id') === id);
  }
);

// 未读新闻数
export const getNoReadSize = (list) => (
  list
    .filter((item) => !item.get('isRead'))
    .size
);
export const selectNewsNoReadNumber = createSelector(
  selectOrderedInvitations,
  selectUnreadMessageCount,
  (invitations) => (
    getNoReadSize(invitations)
  )
);
