/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* global window */

// react && redux module
import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Router,
  Scene,
} from 'react-native-router-flux';

import EntryScene from 'containers/EntryScene';
import LoginScene from 'containers/LoginScene';
import SignUpScene from 'containers/SignUpScene';
import ForgetPasswordScene from 'containers/ForgetPasswordScene';
import ChangePasswordScene from 'containers/ChangePasswordScene';

import SettingScene from 'containers/SettingScene';
import FaqScene from 'containers/FaqScene';
import FeedBackScene from 'containers/FeedBackScene';
import VersionScene from 'containers/VersionScene';
import ChangeLanguageScene from 'containers/ChangeLanguageScene';
import WebViewScene from 'containers/WebViewScene';

import ModalScene from 'components/ModalScene';
import TabIcon from 'components/TabIcon';

import HomeScene from 'containers/HomeScene';
import MyConnectionScene from 'containers/MyConnectionScene';
import MyReleaseScene from 'containers/MyReleaseScene';
import MyHomeScene from 'containers/MyHomeScene';

import ProjectDetailScene from 'containers/ProjectDetailScene';
import AddFriendScene from 'containers/AddFriendScene';
import MyNewsScene from 'containers/MyNewsScene';
import InvitationScene from 'containers/InvitationScene';
import ProfileScene from 'containers/ProfileScene';
import VerifiedScene from 'containers/VerifiedScene';
import MyCollection from 'containers/MyFavouritesScene';
import BonusScene from 'containers/BonusScene';
import MemberScene from 'containers/MemberScene';
import MemberBenefitScene from 'containers/MemberBenefitScene';
import ImessageScene from 'containers/ImessageScene';
import AddConnectionScene from 'containers/AddConnectionScene';
import ConnectionSearchScene from 'containers/ConnectionSearchScene';

import styles from './styles';

export default function AppRoutes(props) {
  const { initialKey } = props;
  const prefix = 'fusion';

  return (
    <Router uriPrefix={prefix}>
      <Stack key="root" hideNavBar>
        <Scene
          key="tabbar"
          initial={initialKey === 'home'}
          tabs
          lazy
          headerMode="none"
          tabBarPosition="bottom"
          showLabel={false}
          swipeEnabled={false}
          tabBarStyle={styles.tabBarStyle}
          tabBarOnPress={({ jumpToIndex, scene }) => {
            const { index } = scene;
            const callback = () => {
              jumpToIndex(index);
            };
            window.validRights(callback, index === 2, index === 2);
          }}
        >
          <Scene key="project" component={HomeScene} icon={TabIcon} />
          <Scene key="connection" component={MyConnectionScene} icon={TabIcon} />
          <Scene key="release" component={MyReleaseScene} icon={TabIcon} />
          <Scene key="my" component={MyHomeScene} icon={TabIcon} />
        </Scene>

        <Scene key="invitation" component={InvitationScene} />
        <Scene key="addFriend" component={AddFriendScene} />
        <Scene key="myFavourites" component={MyCollection} />
        <Scene key="bonus" component={BonusScene} />
        <Scene key="member" component={MemberScene} />
        <Scene key="memberBenefit" component={MemberBenefitScene} />
        <Scene key="projectDetail" component={ProjectDetailScene} />
        <Scene key="login" component={LoginScene} />
        <Scene key="signUp" component={SignUpScene} />
        <Scene key="forgetPassword" component={ForgetPasswordScene} />
        <Scene key="changePassword" component={ChangePasswordScene} />
        <Scene key="entry" component={EntryScene} initial={initialKey === 'entry'} />

        <Scene key="setting" component={SettingScene} />
        <Scene key="faq" component={FaqScene} />
        <Scene key="feedBack" component={FeedBackScene} />
        <Scene key="version" component={VersionScene} />
        <Scene key="changeLanguage" component={ChangeLanguageScene} />

        <Scene key="modal" path="modal" component={ModalScene} panHandlers={null} />
        <Scene key="webView" component={WebViewScene} />

        <Scene key="profile" component={ProfileScene} />
        <Scene key="myNews" path="/myNews" component={MyNewsScene} />
        <Scene key="verified" component={VerifiedScene} />
        <Scene key="imessage" component={ImessageScene} />
        <Scene key="addConnection" component={AddConnectionScene} />
        <Scene key="connectionSearch" component={ConnectionSearchScene} />
      </Stack>
    </Router>
  );
}

AppRoutes.propTypes = {
  initialKey: PropTypes.string.isRequired,
};
