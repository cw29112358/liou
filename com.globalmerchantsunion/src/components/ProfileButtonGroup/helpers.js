/* global window */

import { Actions } from 'react-native-router-flux';

import addFriendImage from './assets/addFriend.png';
import phoneCallImage from './assets/phoneCall.png';
import sendMessageImage from './assets/sendMessage.png';

export const getProfileOptions = (profile) => {
  const { isFriend } = profile || {};
  return [
    {
      isShow: isFriend,
      label: 'phoneCall',
      sceneKey: 'phoneCall',
      image: phoneCallImage,
      profile,
    },
    {
      isShow: !isFriend,
      label: 'addFriend',
      sceneKey: 'addFriend',
      image: addFriendImage,
      profile,
    },
    {
      isShow: true,
      label: 'imessage',
      sceneKey: 'imessage',
      image: sendMessageImage,
      profile,
    },
  ].filter((item) => item.isShow);
};

export const onPressProfileButton = ({ item }) => {
  const {
    sceneKey, profile: { user },
  } = item;
  if (sceneKey === 'phoneCall') {
    window.alert('', 'noPhoneCall');
    return;
  }

  const callback = () => {
    Actions.push(sceneKey, {
      userId: user, // AddFriendScene need
      userName: user, // ImessageScene need
    });
  };
  window.validRights(callback, false, true);
};
