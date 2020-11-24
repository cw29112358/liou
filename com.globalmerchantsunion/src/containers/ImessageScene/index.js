/**
 *
 * ImessageScene Container
 *
 */

/* global translate window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { Platform } from 'react-native';
import {
  Container,
  View,
} from 'native-base';
import JMessage from 'jmessage-react-plugin';
import IMUI from 'aurora-imui-react-native';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loginJMessage, nullFunction } from 'utils/helpers';

import {
  selectAuthUserInfo,
  makeSelectProfileById,
} from 'containers/AppRouter/selectors';
import {
  saveUnreadMessageCountAction,
  saveConversationsInfoAction,
} from 'containers/AppRouter/actions';

import AppHeader from 'components/AppHeader';
import ImageViewerModal from 'components/ImageViewerModal';

import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';
const {
  ChatInput,
  MessageList,
  AuroraIMUIController,
} = IMUI;
let themsgid = 1;
export class ImessageScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    let initHeight;
    if (Platform.OS === 'android') {
      initHeight = 100;
    } else {
      initHeight = 86;
    }
    this.state = {
      inputLayoutHeight: initHeight,
      messageListLayout: { flex: 1, width: styles.deviceWidth, margin: 0 },
      inputViewLayout: { width: styles.deviceWidth, height: initHeight },
      from: 0,
      images: [],
      imageIndex: 0,
      modalVisible: false,
    };
  }
  componentWillMount() {
    const { saveUnreadMessageCount } = this.props;
    this.resetUnreadMessageCount();
    saveUnreadMessageCount(0);
    this.saveAllConversationsInfo();
    AuroraIMUIController.addMessageListDidLoadListener(this.messageListDidLoadEvent);
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      this.refs.ChatInput.setMenuContainerHeight(316); // eslint-disable-line
    }
  }
  componentWillUnmount() {
    JMessage.removeReceiveMessageListener(this.receiveMessageCallBack);
    AuroraIMUIController.removeMessageListDidLoadListener(this.messageListDidLoadEvent);
  }
  messageListDidLoadEvent = () => {
    const isScroll = Platform.OS === 'android';
    this.getHistoryMessages(isScroll);
    JMessage.addReceiveMessageListener(this.receiveMessageCallBack);
    this.addHistoryMessageFrom();
  }

  getTimeString = (time) => {
    const date = time ? new Date(time) : new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const handleMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timeString = `${hours}:${handleMinutes}`;
    return timeString;
  }
  getHistoryTimeString = (createTime) => {
    const historyTime = new Date(createTime).getTime();
    // 获取当天零点时间戳
    const todayTime = new Date(new Date().toLocaleDateString()).getTime();
    // 获取昨天零点时间戳
    const yesterDayTime = todayTime - 24 * 60 * 60 * 1000;
    let historyTimeString = new Date(createTime).toLocaleString();
    if (historyTime > todayTime) {
      historyTimeString = this.getTimeString(createTime);
    } else if (historyTime < todayTime && historyTime > yesterDayTime) {
      const yesterday = translate('yesterday');
      const timeString = this.getTimeString(createTime);
      historyTimeString = `${yesterday} ${timeString}`;
    }
    return historyTimeString;
  }
  getLoginInfo = () => {
    const { authUserInfo } = this.props;
    const { user, id } = authUserInfo;
    const loginInfo = {
      username: user,
      password: id,
    };
    return loginInfo;
  };

  sendUserInfo = () => {
    const { authUserInfo } = this.props;
    const { id, verifiedName, avatar } = authUserInfo;
    const userInfo = {
      userId: id,
      displayName: verifiedName,
      avatarPath: avatar.url,
    };
    return userInfo;
  }
  receiveUserInfo = (type, value) => {
    const { userName, authUserInfo } = this.props;
    const { verifiedName, avatar } = authUserInfo;
    let key;
    let notificationText;
    if (type === 'images') {
      key = 'path';
      notificationText = translate('imageMessage');
    } else if (type === 'voice') {
      key = 'path';
      notificationText = translate('voiceMessage');
    } else {
      key = 'text';
      notificationText = value;
    }
    const receiveUserInfo = {
      type: 'single',
      username: userName,
      [key]: value,
      extras: {
        displayName: verifiedName,
        avatarPath: avatar.url,
      },
      messageSendingOptions: {
        isShowNotification: true,
        isRetainOffline: true,
        isCustomNotificationEnabled: true,
        notificationTitle: verifiedName,
        notificationText,
      },
    };
    return receiveUserInfo;
  }

  getHistoryMessages = (isSrollTop) => {
    const { userName } = this.props;
    const { from, images } = this.state;
    JMessage.getHistoryMessages({
      type: 'single', username: userName, from, limit: 20, isDescend: !isSrollTop,
    },
    (msgArr) => {
      const imageArr = [];
      msgArr.forEach((msg) => {
        const {
          createTime,
          type,
          thumbPath,
          id,
        } = msg;
        const timeString = this.getHistoryTimeString(createTime);
        const message = this.convertJMessageToAuroraMsg(msg, timeString);
        if (isSrollTop || Platform.OS === 'android') {
          AuroraIMUIController.insertMessagesToTop([message]);
        } else {
          AuroraIMUIController.appendMessages([message]);
        }
        if (type === 'image') {
          if (isSrollTop || Platform.OS === 'android') {
            imageArr.unshift({
              url: `file://${thumbPath}` || '',
              id,
            });
          } else {
            imageArr.push({
              url: `file://${thumbPath}` || '',
              id,
            });
          }
        }
      });
      this.setState({
        images: [...imageArr, ...images],
      });
    }, (error) => {
      const { code } = error;
      const loginInfo = this.getLoginInfo();
      if (code === 863004) {
        loginJMessage(loginInfo, this.getHistoryMessages);
      }
    });
  }
  receiveMessageCallBack = (Jmessage) => {
    const { images } = this.state;
    const { type, thumbPath, id } = Jmessage;
    const timeString = this.getTimeString();
    const msg = this.convertJMessageToAuroraMsg(Jmessage, timeString);
    AuroraIMUIController.appendMessages([msg]);

    const imageObj = {
      url: `file://${thumbPath}`,
      id,
    };
    if (type === 'image') {
      this.setState({
        images: [...images, imageObj],
      });
    }
    // 接收到消息之后 清空未读消息
    this.resetUnreadMessageCount();
    this.saveAllConversationsInfo();
  }
  constructNormalMessage = (isOutgoing, userInfo) => {
    const message = {};
    message.msgId = themsgid.toString();
    themsgid += 1;
    message.status = 'send_succeed';
    message.isOutgoing = isOutgoing;
    message.timeString = this.getTimeString();
    message.fromUser = userInfo;
    return message;
  }
  convertJMessageToAuroraMsg(jmessage, timeString) {
    const { authUserInfo } = this.props;
    const auroraMsg = {};
    auroraMsg.msgType = jmessage.type;
    auroraMsg.msgId = jmessage.id;
    if (jmessage.type === 'text') {
      auroraMsg.text = jmessage.text;
    } else if (jmessage.type === 'image') {
      auroraMsg.mediaPath = jmessage.thumbPath;
    } else if (jmessage.type === 'voice') {
      auroraMsg.mediaPath = jmessage.path;
      auroraMsg.duration = jmessage.duration;
    } else if (jmessage.type === 'file') {
      if (jmessage.extras.fileType === 'video') {
        auroraMsg.mediaPath = jmessage.path;
        auroraMsg.duration = jmessage.duration;
        auroraMsg.msgType = 'video';
      } else {
        return {};
      }
    } else if (jmessage.type === 'event') {
      auroraMsg.text = jmessage.eventType;
    } else if (jmessage.type === 'prompt') {
      auroraMsg.msgType = 'event';
      auroraMsg.text = jmessage.promptText;
    }

    const user = {};
    user.userId = jmessage.from.username;
    user.displayName = jmessage.extras.displayName || jmessage.from.username;
    user.avatarPath = jmessage.extras.avatarPath;

    if (user.avatarPath === '') {
      user.avatarPath = 'ironman';
    }
    auroraMsg.fromUser = user;
    auroraMsg.status = 'send_succeed';

    auroraMsg.isOutgoing = true;

    if (authUserInfo.user === jmessage.from.username) {
      auroraMsg.isOutgoing = true;
    } else {
      auroraMsg.isOutgoing = false;
    }
    auroraMsg.timeString = timeString;
    return auroraMsg;
  }
  // 判断是否是会员
  authUserIsMembership = (callback) => {
    window.validRights(callback, false, true);
  }

  // 清空未读消息
  resetUnreadMessageCount = () => {
    const { userName } = this.props;
    JMessage.resetUnreadMessageCount({ type: 'single', username: userName }, nullFunction, (error) => {
      console.log(error);
    });
  }
  // 保存会话
  saveAllConversationsInfo = () => {
    const { saveConversationsInfo } = this.props;
    JMessage.getConversations((conArr) => {
      saveConversationsInfo(conArr);
    }, (error) => {
      console.log(error);
    });
  }

  onTouchMsgList = () => {
    this.resetMenu();
  }
  JMsendTextMessage = (text) => {
    const receiveUserInfo = this.receiveUserInfo('text', text);
    JMessage.sendTextMessage(receiveUserInfo,
      (msg) => {
        console.log(msg.text);
      }, (error) => {
        const { code } = error;
        const loginInfo = this.getLoginInfo();
        if (code) {
          loginJMessage(loginInfo, () => this.JMsendTextMessage(text));
        }
      });
  }
  onSendText = (text) => {
    const callback = () => {
      const userInfo = this.sendUserInfo();
      const message = this.constructNormalMessage(true, userInfo);
      message.msgType = 'text';
      message.text = text;

      AuroraIMUIController.appendMessages([message]);

      this.JMsendTextMessage(text);
    };
    this.authUserIsMembership(callback);
  }
  JMsendImageMessage = (mediaPath) => {
    const receiveUserInfo = this.receiveUserInfo('images', mediaPath);
    JMessage.sendImageMessage(receiveUserInfo, (msg) => {
      console.log(msg, 'media');
    }, (error) => {
      const { code } = error;
      const loginInfo = this.getLoginInfo();
      if (code) {
        loginJMessage(loginInfo, () => this.JMsendImageMessage(mediaPath));
      }
    });
  }
  onSendGalleryFiles = (result) => {
    const { images } = this.state;
    const userInfo = this.sendUserInfo();
    const imagesArr = [];
    result.forEach((media) => {
      const message = this.constructNormalMessage(true, userInfo);

      message.msgType = media.mediaType;
      message.mediaPath = media.mediaPath;
      AuroraIMUIController.appendMessages([message]);
      // 保存新发送的图片
      const imagesObj = {
        url: `file://${message.mediaPath}`,
        id: message.msgId,
      };
      imagesArr.push(imagesObj);

      this.JMsendImageMessage(media.mediaPath);
    });
    this.setState({
      images: [...images, ...imagesArr],
    });
  }
  JMsendVoiceMessage = (mediaPath) => {
    const receiveUserInfo = this.receiveUserInfo('voice', mediaPath);

    JMessage.sendVoiceMessage(receiveUserInfo, (msg) => {
      console.log(msg, 'voice');
    }, (error) => {
      const { code } = error;
      const loginInfo = this.getLoginInfo();
      if (code) {
        loginJMessage(loginInfo, () => this.JMsendVoiceMessage(mediaPath));
      }
    });
  }
  onFinishRecordVoice = (mediaPath, duration) => {
    const userInfo = this.sendUserInfo();
    const message = this.constructNormalMessage(true, userInfo);
    message.msgType = 'voice';
    message.mediaPath = mediaPath;
    message.duration = duration;
    AuroraIMUIController.appendMessages([message]);

    this.JMsendVoiceMessage(mediaPath);
  }
  onTakePicture = (media) => {
    const userInfo = this.sendUserInfo();
    const message = this.constructNormalMessage(true, userInfo);
    message.msgType = 'image';
    message.mediaPath = media.mediaPath;
    AuroraIMUIController.appendMessages([message]);

    this.JMsendImageMessage(media.mediaPath);

    this.resetMenu();
  }
  onPullToRefresh = () => {
    const isScroll = Platform.OS !== 'android';
    this.addHistoryMessageFrom();
    this.getHistoryMessages(isScroll);
  }
  addHistoryMessageFrom = () => {
    const { from } = this.state;
    this.setState({
      from: from + 20,
    });
  }
  resetMenu = () => {
    if (Platform.OS === 'android') {
      this.refs.ChatInput.showMenu(false); // eslint-disable-line
      this.setState({
        inputLayoutHeight: 100,
        inputViewLayout: { width: styles.deviceWidth, height: 100 },
      });
    } else {
      this.setState({
        inputViewLayout: { width: styles.deviceWidth, height: 86 },
      });
    }
    AuroraIMUIController.hidenFeatureView(true);
  }
  onBeginDragMessageList = () => {
    this.resetMenu();
  }
  onInputViewSizeChange = (size) => {
    const { inputLayoutHeight } = this.state;
    if (inputLayoutHeight !== size.height) {
      this.setState({
        inputLayoutHeight: size.height,
        inputViewLayout: { width: styles.deviceWidth, height: size.height },
        messageListLayout: { flex: 1, width: styles.deviceWidth, margin: 0 },
      });
    }
  }
  onAvatarClick = (message) => {
    const { isOutgoing } = message;
    const { authUserInfo, fromUserInfo } = this.props;
    const profile = isOutgoing ? authUserInfo : fromUserInfo;
    Actions.push('profile', { profile });
  }
  // findImageIndex
  findImageIndex = (message) => {
    const { images } = this.state;
    const { msgId } = message;
    let imageIndex = 0;
    images.forEach((item, index) => {
      const { id } = item;
      if (id === msgId) {
        imageIndex = index;
      }
    });
    return imageIndex;
  }
  onMsgClick = (message) => {
    const { msgType } = message;
    const imageIndex = this.findImageIndex(message);
    if (msgType === 'image') {
      this.setState({
        modalVisible: true,
        imageIndex,
      });
    }
  }
  onTouchEditText = () => {
    this.refs.ChatInput.showMenu(false); // eslint-disable-line
  }
  onSwitchToEmojiMode = () => {
    this.authUserIsMembership(nullFunction);
  }
  onSwitchToMicrophoneMode = () => {
    this.authUserIsMembership(nullFunction);
  }
  onSwitchToGalleryMode = () => {
    this.authUserIsMembership(nullFunction);
  }
  onSwitchToCameraMode = () => {
    this.authUserIsMembership(nullFunction);
  }
  onHideModal = () => {
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const {
      messageListLayout,
      inputViewLayout,
      images,
      imageIndex,
      modalVisible,
    } = this.state;
    const { fromUserInfo } = this.props;
    const { verifiedName } = fromUserInfo || { verifiedName: 'Yilin' };
    const customLayoutItems = {
      left: [],
      right: ['send'],
      bottom: ['voice', 'gallery', 'emoji', 'camera'],
    };
    return (
      <Container>
        <AppHeader title={verifiedName} isTranslate={false} />
        <View style={styles.container}>
          <MessageList
            style={messageListLayout}
            isAllowPullToRefresh
            isShowDisplayName
            isShowIncomingDisplayName
            onAvatarClick={this.onAvatarClick}
            onMsgClick={this.onMsgClick}
            onStatusViewClick={this.onStatusViewClick}
            onTouchMsgList={this.onTouchMsgList}
            onTapMessageCell={this.onTapMessageCell}
            onBeginDragMessageList={this.onBeginDragMessageList}
            onPullToRefresh={this.onPullToRefresh}
            messageListBackgroundColor="#f3f3f3"
            sendBubbleTextColor="#000000"
            avatarSize={{ width: 50, height: 50 }}
            displayNamePadding={{
              left: 0, top: 0, right: 0, bottom: 5,
            }}
            avatarCornerRadius={25}
            photoMessageRadius={5}
            maxBubbleWidth={0.5}
          />
          <ChatInput
            ref="ChatInput" // eslint-disable-line
            style={inputViewLayout}
            onSendText={this.onSendText}
            onTakePicture={this.onTakePicture}
            onStartRecordVoice={this.onStartRecordVoice}
            onFinishRecordVoice={this.onFinishRecordVoice}
            onCancelRecordVoice={this.onCancelRecordVoice}
            onStartRecordVideo={this.onStartRecordVideo}
            onFinishRecordVideo={this.onFinishRecordVideo}
            onSendGalleryFiles={this.onSendGalleryFiles}
            onSwitchToEmojiMode={this.onSwitchToEmojiMode}
            onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
            onSwitchToGalleryMode={this.onSwitchToGalleryMode}
            onSwitchToCameraMode={this.onSwitchToCameraMode}
            onShowKeyboard={this.onShowKeyboard}
            onTouchEditText={this.onTouchEditText}
            onFullScreen={this.onFullScreen}
            onRecoverScreen={this.onRecoverScreen}
            onSizeChange={this.onInputViewSizeChange}
            showSelectAlbumBtn
            showRecordVideoBtn={false}
            onClickSelectAlbum={this.onClickSelectAlbum}
            inputPadding={{
              left: 30, top: 10, right: 10, bottom: 10,
            }}
            galleryScale={0.6}
            compressionQuality={0.6}
            cameraQuality={0.7}
            customLayoutItems={customLayoutItems}
          />
        </View>
        <ImageViewerModal
          renderIndicator={() => null}
          images={images}
          imageIndex={imageIndex}
          modalVisible={modalVisible}
          onHideModal={this.onHideModal}
        />
      </Container>
    );
  }
}

ImessageScene.defaultProps = {
  authUserInfo: {},
  userName: '',
  fromUserInfo: {},
};

ImessageScene.propTypes = {
  authUserInfo: PropTypes.object,
  userName: PropTypes.string,
  fromUserInfo: PropTypes.object,
  saveUnreadMessageCount: PropTypes.func.isRequired,
  saveConversationsInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  authUserInfo: selectAuthUserInfo,
  fromUserInfo: (state, props) => makeSelectProfileById(props.userName)(state),
});

const mapDispatchToProps = (dispatch) => ({
  saveUnreadMessageCount: (count) => dispatch(saveUnreadMessageCountAction(count)),
  saveConversationsInfo: (conversations) => dispatch(saveConversationsInfoAction(conversations)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'imessageScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(ImessageScene);
