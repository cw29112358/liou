/**
 *
 * MyNewsScene Container
 *
 */
/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Actions } from 'react-native-router-flux';
import {
  ScrollView,
  RefreshControl,
  Animated,
  View,
} from 'react-native';
import JMessage from 'jmessage-react-plugin';

import { notificationLink, nullFunction } from 'utils/helpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  saveConversationsInfoAction,
} from 'containers/AppRouter/actions';

import FullScreenScene from 'components/FullScreenScene';
import NoticeModal from 'components/NoticeModal';
import Mask from 'components/Mask';
import SeperatorText from 'components/SeperatorText';
import EmptyList from 'components/EmptyList';

import NewsTabs from './components/NewsTabs';
import FriendsNews from './components/FriendsNews';
import SystemNews from './components/SystemNews';

import {
  loadNotificationsAction,
  setNotificationsLastReadTimeAction,
  loadInvitationsAction,
  changeInvitationAction,
} from './actions';
import {
  NEWS_TYPES_OPTIONS,
} from './constants';
import {
  selectIsDone,
  selectNotificationsLoading,
  selectOrderedNotifications,
  selectInvitationsLoading,
  selectOrderedInvitations,
} from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

const { twoColumnHeight, deviceWidth, seperatorHeight } = styles;

export class MyNewsScene extends React.Component {
  constructor(props) {
    super(props);

    const { notificationId, notifications, invitations } = props;
    const showNewsIndex = notificationId ? 1 : 0;
    this.state = {
      isShowNotice: false,
      notice: null,
      showNewsType: NEWS_TYPES_OPTIONS[showNewsIndex].label,
      translateX: new Animated.Value(-deviceWidth * showNewsIndex),
      [`${NEWS_TYPES_OPTIONS[0].label}Height`]: 83 * invitations.length,
      [`${NEWS_TYPES_OPTIONS[1].label}Height`]: 100 * notifications.length,
      parentHeight: twoColumnHeight,
    };
  }
  componentWillMount() {
    this.loadInvitations();
    this.loadNotifications();
  }

  /* func */

  onSelectNewsType = ({ item, index }) => {
    const { translateX } = this.state;
    this.setState({ showNewsType: item.label });
    Animated.spring(translateX, {
      toValue: -deviceWidth * index,
      bounciness: 2,
    }).start();
  }

  // 1. invitations
  loadInvitations = (callback) => {
    const { loadInvitations } = this.props;
    loadInvitations(callback);
  }
  onPressInvitation = (item) => {
    const { type, profile: { user } } = item;
    const isConversations = type === 'conversations';
    if (isConversations) {
      Actions.push('imessage', {
        userName: user,
      });
    } else {
      Actions.push('invitation', { invitationId: item.id });
    }
  }
  onDeleteInvitation = (item) => {
    const { type, profile: { user } } = item;
    const isConversations = type === 'conversations';
    if (isConversations) {
      JMessage.deleteConversation({ type: 'single', username: user }, nullFunction, nullFunction);
      this.saveAllConversationsInfo();
    } else {
      this.onChangeInvitation('hide', item.id);
    }
  }
  onAcceptInvitation = (item) => {
    this.onChangeInvitation('accept', item.id);
  }
  onChangeInvitation = (type, id) => {
    const { changeInvitation } = this.props;
    changeInvitation(type, id);
  }
  onLayoutList = (e, type) => {
    const { height } = e.nativeEvent.layout;
    this.setState({ [`${type}Height`]: height });
  }
  // 删除之后重新保存会话
  saveAllConversationsInfo = () => {
    const { saveConversationsInfo } = this.props;
    JMessage.getConversations((conArr) => {
      saveConversationsInfo(conArr);
    }, nullFunction);
  }
  // 2. notifications
  loadNotifications = (callback) => {
    const { loadNotifications } = this.props;
    loadNotifications(callback);
  }
  onPressNotification = (item) => {
    if (item.promotionImages.length > 0) {
      this.setState({
        isShowNotice: true,
        notice: item,
      });
    } else if (item.promotionUrl) {
      notificationLink(item.promotionUrl);
    }
  }
  closeNotice = () => {
    this.setState({ isShowNotice: false });
  }

  /* render */
  getContentProps = (type) => {
    const { invitationsLoading, notificationsLoading } = this.props;
    const { invitations, notifications } = this.props;
    if (type === 'friendNews') {
      return {
        refreshProps: {
          refreshing: invitationsLoading,
          onRefresh: this.loadInvitations,
        },
        listFunc: this.renderFriendsNews,
        list: invitations,
      };
    }

    return {
      refreshProps: {
        refreshing: notificationsLoading,
        onRefresh: this.loadNotifications,
      },
      listFunc: this.renderSystemNews,
      list: notifications,
    };
  }
  renderTabs = (type) => (
    <NewsTabs
      options={NEWS_TYPES_OPTIONS}
      selectedOption={type}
      onSelect={this.onSelectNewsType}
    />
  )
  renderContent = (type, index) => {
    const { refreshProps, list, listFunc } = this.getContentProps(type);
    const noEmpty = !!list.length;

    const { [`${type}Height`]: listHeight, parentHeight } = this.state;
    const isAbsolute = !listHeight || !parentHeight || listHeight < parentHeight - seperatorHeight - 33;

    return (
      <View key={type} style={[styles.column, { left: deviceWidth * index }]}>
        <ScrollView
          refreshControl={(
            <RefreshControl
              {...refreshProps}
              title={translate('loading')}
            />
          )}
          contentContainerStyle={isAbsolute ? { flex: 1 } : undefined}
        >
          { noEmpty && listFunc(list, type) }
          { noEmpty && this.renderSeperatorText(isAbsolute) }
          { !noEmpty && this.renderEmptyList() }
        </ScrollView>
      </View>
    );
  }
  renderFriendsNews = (list, type) => (
    <FriendsNews
      list={list}
      onLayoutList={(e) => this.onLayoutList(e, type)}
      onPress={this.onPressInvitation}
      onDelete={this.onDeleteInvitation}
      onAgree={this.onAcceptInvitation}
    />
  )
  renderSeperatorText = (isAbsolute) => {
    const viewStyle = isAbsolute ? styles.seperatorAbsolute : styles.seperatorRelative;

    return (
      <SeperatorText
        key="seperatorText"
        label="noNews"
        showSeperate="true"
        viewStyle={viewStyle}
      />
    );
  }
  renderEmptyList = () => (
    <EmptyList label="noMessage" scrollEnabled={false} />
  );

  renderSystemNews = (list, type) => (
    <SystemNews
      list={list}
      onLayoutList={(e) => this.onLayoutList(e, type)}
      onPress={this.onPressNotification}
    />
  )
  renderNoticeModal = () => {
    const { isShowNotice, notice } = this.state;

    return (
      <Mask onClose={this.closeNotice}>
        <NoticeModal
          key="noticeModal"
          isShowNotice={isShowNotice}
          onClose={this.closeNotice}
          notice={notice}
        />
      </Mask>
    );
  }

  render() {
    const { isDone } = this.props;
    const { isShowNotice, showNewsType, translateX } = this.state;
    return (
      <FullScreenScene
        headerTitle="myNews"
        contentContainerStyle={{ flex: 1 }}
        contentStyle={{ flex: 1 }}
        scrollEnabled={false}
        isLoading={!isDone}
        renderOutsideContent={isShowNotice ? this.renderNoticeModal() : undefined}
      >
        { this.renderTabs(showNewsType) }
        <Animated.View
          style={[
            styles.twoColumn,
            { transform: [{ translateX }] },
          ]}
          onLayout={(e) => this.onLayoutList(e, 'parent')}
        >
          { NEWS_TYPES_OPTIONS.map(({ label }, index) => this.renderContent(label, index))}
        </Animated.View>
      </FullScreenScene>
    );
  }
}

MyNewsScene.defaultProps = {
  invitationId: undefined,
  notificationId: undefined,
};

MyNewsScene.propTypes = {
  invitationId: PropTypes.string,
  notificationId: PropTypes.string,
  isDone: PropTypes.bool.isRequired,
  notificationsLoading: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  invitationsLoading: PropTypes.bool.isRequired,
  invitations: PropTypes.array.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  loadInvitations: PropTypes.func.isRequired,
  changeInvitation: PropTypes.func.isRequired,
  saveConversationsInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isDone: selectIsDone,
  notificationsLoading: selectNotificationsLoading,
  notifications: selectOrderedNotifications,
  invitationsLoading: selectInvitationsLoading,
  invitations: selectOrderedInvitations,
});

const mapDispatchToProps = (dispatch) => ({
  loadNotifications: (onSuccess) => dispatch(loadNotificationsAction(onSuccess)),
  notificationsLastReadTime: (time) => dispatch(setNotificationsLastReadTimeAction(time)),
  loadInvitations: (onSuccess) => dispatch(loadInvitationsAction(onSuccess)),
  changeInvitation: (apiType, id) => dispatch(changeInvitationAction(apiType, id)),
  saveConversationsInfo: (conversations) => dispatch(saveConversationsInfoAction(conversations)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'myNewsScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MyNewsScene);
