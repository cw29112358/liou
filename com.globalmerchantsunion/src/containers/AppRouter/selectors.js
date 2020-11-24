/* global translate */
import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const selectAppRouter = (state) => state.get('appRouter', Immutable.Map());
export const selectAllUsers = createGetSelector(selectAppRouter, 'users', Immutable.Map());
export const selectAuthUserId = createGetSelector(selectAppRouter, 'authUserId', '');
export const selectIsLoading = createGetSelector(selectAppRouter, 'isLoading', false);
export const selectIsLogoutDone = createGetSelector(selectAppRouter, 'logoutDone', true);
export const selectIsDone = createGetSelector(selectAppRouter, 'done', true);
export const selectIsUploadSuccess = createGetSelector(selectAppRouter, 'uploadSuccess', true);
export const selectError = createGetSelector(selectAppRouter, 'error', false);
export const selectMessage = createGetSelector(selectAppRouter, 'message', '');
export const selectVerificationCodeInfos = createGetSelector(selectAppRouter, 'verificationCodeInfos', Immutable.Map());
export const selectLanguage = createGetSelector(selectAppRouter, 'language', 'en');
export const selectProfiles = createGetSelector(selectAppRouter, 'profiles', Immutable.Map());
export const selectProfilesIsLoading = createGetSelector(selectAppRouter, 'profilesIsLoading', false);
export const selectUnreadMessageCount = createGetSelector(selectAppRouter, 'unreadMessageCount', 0);

// 获取会话消息
export const selectConversations = createSelector(
  selectAppRouter,
  selectProfiles,
  (appRouter, profileMaps) => {
    const originalConversations = appRouter.get('conversations');
    if (originalConversations) {
      const handleConversations = originalConversations.map((conversation) => {
        const { latestMessage = {}, title, unreadCount } = conversation;
        const profile = profileMaps.get(title);
        let message = '';
        if (latestMessage.type === 'image') {
          message = translate('imageMessage');
        } else if (latestMessage.type === 'voice') {
          message = translate('voiceMessage');
        } else {
          message = latestMessage.text;
        }
        return Immutable.Map({
          message,
          profile: profile || {},
          updatedAt: latestMessage.createTime,
          id: title,
          type: 'conversations',
          isRead: !unreadCount,
        });
      });
      return Immutable.List(handleConversations);
    }
    return Immutable.List();
  }
);

export const makeSelectProfileById = (user) => createSelector(
  selectProfiles,
  (profiles) => profiles.get(user)
);

export const selectAuthUser = createSelector(
  selectAuthUserId,
  selectAllUsers,
  (userId, users) => users.get(userId, Immutable.Map())
);
export const selectAuthUserInfo = createSelector(
  selectAuthUser,
  (authUser) => authUser.get('profile', Immutable.Map())
);
export const selectAuthUserMembership = createSelector(
  selectAuthUser,
  (authUser) => {
    const membership = authUser.get('membership', Immutable.Map());
    const status = membership.get('status');
    const isMembership = status === 'active';
    return membership.set('isMembership', isMembership);
  }
);

export const selectIsLoggedIn = createSelector(selectAuthUserId,
  (substate) => !!substate);
