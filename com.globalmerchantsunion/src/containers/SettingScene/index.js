/**
 *
 * SettingScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Actions } from 'react-native-router-flux';

import { Linking, NativeModules } from 'react-native';
import variables from 'platform';

import {
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Text,
  Button,
} from 'native-base';


import { logoutByUserAction } from 'containers/AppRouter/actions';
import {
  selectIsLogoutDone,
} from 'containers/AppRouter/selectors';

import FullScreenScene from 'components/FullScreenScene';
import Mask from 'components/Mask';

import LogoOutModal from './components/LogOutModal';
import { SETTING_LIST } from './constants';
import styles from './styles';
const {
  isIOS,
} = variables;

export class SettingScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  closeLogOutModal = () => {
    this.setState({ modalVisible: false });
  }
  openLogOutModal = () => {
    this.setState({ modalVisible: true });
  }
  openSettings = () => {
    if (isIOS) {
      Linking.openURL('app-settings:')
        .catch((err) => console.log('error', err)); // eslint-disable-line
    } else {
      NativeModules.OpenSettings.openNetworkSettings((data) => {
        console.log('call back data', data); // eslint-disable-line
      });
    }
  }
  getOnPressItem = (item) => {
    const { linkUrl, openSettings } = item;
    if (openSettings) return () => { this.openSettings(); };
    if (!linkUrl) return null;
    return () => { Actions.push(linkUrl); };
  }

  renderItemLeft = (item) => (
    <Left>
      <Text style={styles.labelStyle} numberOfLines={1}>
        {translate(item.value)}
      </Text>
    </Left>
  )
  renderItemRight = (item) => (
    <Right style={styles.rightStyle}>
      {item.hasRightText && (
        <Text style={styles.rightTextStyle}>
          {item.rightText}
        </Text>
      )}
      {item.hasRightIcon && (
        <Icon style={styles.rightIconStyle} name="ios-arrow-forward" />
      )}
    </Right>
  )
  renderList = () => (
    <List>
      {
        SETTING_LIST.map((item) => (
          <ListItem
            key={item.key}
            onPress={this.getOnPressItem(item)}
            style={styles.listItem}
          >
            { this.renderItemLeft(item) }
            { this.renderItemRight(item) }
          </ListItem>
        ))
      }
    </List>
  )

  renderLogoutButton = () => (
    <Button
      transparent
      onPress={this.openLogOutModal}
      style={styles.logOutButton}
    >
      <Text style={styles.logOutText}>{translate('logOut')}</Text>
    </Button>
  )
  renderModal = () => {
    const { logOut } = this.props;
    const { modalVisible } = this.state;
    return (
      <LogoOutModal
        modalVisible={modalVisible}
        closeModal={this.closeLogOutModal}
        logOut={logOut}
      />
    );
  }
  renderOutsideContent = () => {
    const { modalVisible } = this.state;
    return modalVisible ? <Mask /> : null;
  }
  render() {
    const { isLogOut } = this.props;
    const { modalVisible } = this.state;
    return (
      <FullScreenScene
        isLoading={!isLogOut}
        headerTitle="setting"
        headerProps={{
          hasRight: false,
        }}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
        renderOutsideContent={this.renderOutsideContent}
      >
        {this.renderList()}
        { !modalVisible && this.renderLogoutButton()}
        { this.renderModal() }
      </FullScreenScene>
    );
  }
}

SettingScene.defaultProps = {
  isLogOut: false,
  logOut: () => null,
};

SettingScene.propTypes = {
  isLogOut: PropTypes.bool,
  logOut: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  isLogOut: selectIsLogoutDone,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logoutByUserAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(SettingScene);
