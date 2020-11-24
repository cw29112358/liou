/**
*
* AgentBaseInfo Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Button,
  Text,
} from 'native-base';
import {
  getUserLogoUrl,
  getUserDisplayName,
} from 'utils/helpers';

import Avatar from 'components/Avatar';

import styles from './styles';

const AgentBaseInfo = (props) => {
  const { authUser, openModal, toBeAgentTime } = props;
  const { logo } = authUser;
  const userName = getUserDisplayName(authUser);

  const renderAgentInfo = () => (
    <View style={styles.textView}>
      <Text style={styles.avatarName}>
        { userName }
      </Text>
      <Text style={styles.agentInfoText}>
        {translate('agentInfo')}{toBeAgentTime} {translate('day')}
      </Text>
    </View>
  );
  const renderUserInfo = () => (
    <View style={styles.avatarView}>
      <Avatar
        url={getUserLogoUrl(logo)}
        avatarStyle={styles.avatar}
        showUserName={false}
      />
      { renderAgentInfo() }
    </View>
  );

  return (
    <View style={styles.content}>
      { renderUserInfo() }
      <Button
        primary
        rounded
        style={styles.button}
        onPress={openModal}
      >
        <Text style={styles.buttonText}>{translate('recommendUser')}</Text>
      </Button>
    </View>
  );
};

AgentBaseInfo.defaultProps = {
  authUser: '',
  openModal: () => null,
  toBeAgentTime: 0,
};

AgentBaseInfo.propTypes = {
  authUser: PropTypes.object,
  openModal: PropTypes.func,
  toBeAgentTime: PropTypes.number,
};

export default AgentBaseInfo;
