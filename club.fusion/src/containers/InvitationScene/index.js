/**
 *
 * InvitationScene Stateless Container
 *
 */

/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Text,
  View,
} from 'native-base';

import { LINEAR_PROPS } from 'utils/constants';

import {
  selectInvitation,
  selectIsDone,
} from 'containers/MyNewsScene/selectors';
import {
  setInvitationIdAction,
  changeInvitationAction,
} from 'containers/MyNewsScene/actions';

import FullScreenScene from 'components/FullScreenScene';
import ProfileCard from 'components/ProfileCard';
import { onPressProfileButton } from 'components/ProfileButtonGroup/helpers';
import FilterBar from 'components/FilterBar';

import styles from './styles';

class InvitationScene extends React.Component {
  componentWillMount() {
    const { setInvitationId, invitationId, invitation } = this.props;
    setInvitationId(invitationId);
    this.onReadInvitation(invitation);
  }
  componentWillReceiveProps(nextProps) {
    this.onReadInvitation(nextProps.invitation);
  }

  formatUser = (invitation, format) => {
    const { profile = {}, updatedAt } = invitation;
    const formatedProfile = format(profile) || {};
    return {
      ...formatedProfile,
      timeText: window.momentFormat(updatedAt),
      greyText: '',
      avatarRowStyle: styles.avatarRow,
      avatarRightStyle: styles.avatarRight,
      row1Style: styles.row1Style,
      blackTextStyle: styles.blackText,
    };
  }
  getButtonOptions = ({ status, profile }) => {
    const isSuccess = status === 'success';
    const isFail = status === 'fail';

    const refuseObject = {
      shadowStyle: [styles.shadowRadius],
      label: 'refused',
    };
    const agreeObject = {
      shadowStyle: [styles.brandShadow, styles.shadowRadius],
      ...LINEAR_PROPS,
      label: 'goChat',
      linearStyle: styles.shadowRadius,
      textStyle: styles.whiteText,
    };

    if (isSuccess) {
      agreeObject.onSelect = () => {
        onPressProfileButton({
          item: {
            sceneKey: 'imessage',
            profile,
          },
        });
      };

      return [
        agreeObject,
      ];
    }
    if (isFail) {
      refuseObject.shadowStyle.push(styles.borderButton);
      refuseObject.disabled = true;
      return [
        refuseObject,
      ];
    }

    refuseObject.shadowStyle.push(styles.blackShadow);
    refuseObject.shadowStyle.push(styles.leftButton);
    refuseObject.label = 'refuse';
    refuseObject.onSelect = () => { this.onChangeInvitation('refuse'); };

    agreeObject.label = 'agree';
    agreeObject.onSelect = () => { this.onChangeInvitation('accept'); };
    return [
      refuseObject,
      agreeObject,
    ];
  }
  onReadInvitation = (invitation) => {
    if (invitation.id && !invitation.isRead) {
      this.onChangeInvitation('read');
    }
  }
  onChangeInvitation = (type) => {
    const { changeInvitation, invitationId } = this.props;
    changeInvitation(type, invitationId);
  }
  onPressAvatar = () => {
    const { invitation } = this.props;
    Actions.push('profile', { profile: invitation.profile });
  }

  renderTop = (invitation) => (
    <View style={styles.topView}>
      <ProfileCard
        onlyAvatar
        user={invitation}
        format={this.formatUser}
        avatarProps={{
          avatarStyle: styles.avatarImage,
        }}
        onPress={this.onPressAvatar}
      />
      <Text style={styles.message}>{ invitation.message }</Text>
    </View>
  )
  renderButtonGroup = (invitation) => (
    <FilterBar
      options={this.getButtonOptions(invitation)}
      buttonViewStyle={styles.buttonView}
      buttonStyle={styles.button}
      textStyle={styles.buttonText}
    />
  )
  render() {
    const { isDone, invitation } = this.props;
    return (
      <FullScreenScene
        isLoading={!isDone}
        headerTitle="newFriend"
        contentContainerStyle={styles.content}
      >
        <View style={styles.view}>
          {this.renderTop(invitation)}
          {this.renderButtonGroup(invitation)}
        </View>
      </FullScreenScene>
    );
  }
}

InvitationScene.defaultProps = {
  invitationId: '',
  invitation: {},
};

InvitationScene.propTypes = {
  invitationId: PropTypes.string,
  invitation: PropTypes.object,
  isDone: PropTypes.bool.isRequired,
  setInvitationId: PropTypes.func.isRequired,
  changeInvitation: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  invitation: selectInvitation,
  isDone: selectIsDone,
});

const mapDispatchToProps = (dispatch) => ({
  setInvitationId: (id) => dispatch(setInvitationIdAction(id)),
  changeInvitation: (apiType, id) => dispatch(changeInvitationAction(apiType, id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(InvitationScene);
