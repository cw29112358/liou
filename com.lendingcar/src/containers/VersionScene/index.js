/**
 *
 * VersionScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  View,
  Button,
} from 'native-base';
import {
  Image,
  Text,
} from 'react-native';

import { openURLByLinking } from 'utils/helpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import FullScreenScene from 'components/FullScreenScene';

import {
  selectIsLoading,
  selectVersionInfo,
} from './selectors';
import { loadAppVersionAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';
import appImage from './assets/app.png';

export class VersionScene extends React.Component { // eslint-disable-line
  componentWillMount() {
    this.loadAppVersion();
  }

  pressButton = () => {
    const { isLatest } = this.getVersionInfo();
    const func = isLatest ? this.loadAppVersion : this.linkToDownload;
    func();
  }
  loadAppVersion = () => {
    const { loadAppVersion } = this.props;
    loadAppVersion({ forceReload: true });
  }
  linkToDownload = () => {
    const { url } = this.getVersionInfo();
    openURLByLinking(url);
  }

  getVersionInfo = () => {
    const { versionInfo } = this.props;
    return versionInfo;
  }

  renderImage() {
    return (
      <Image source={appImage} style={styles.app} />
    );
  }
  renderText() {
    const { isLatest, version, readableVersion } = this.getVersionInfo();
    const title = isLatest
      ? translate('latestVersion')
      : `${translate('latestVersionDetected')}V${version}`;

    return (
      <View style={styles.textView}>
        <Text style={styles.textGrey}>{title}</Text>
        <Text style={styles.textGrey}>
          {translate('currentVersion')}
          <Text style={styles.textGrey2A}>{`V${readableVersion}`}</Text>
        </Text>
      </View>
    );
  }
  renderButton() {
    const { isLatest } = this.getVersionInfo();
    const label = isLatest ? 'checkForUpdate' : 'updateNow';

    return (
      <Button
        style={styles.button}
        onPress={this.pressButton}
        scrollEnabled={false}
      >
        <Text style={styles.buttonText}>{translate(label)}</Text>
      </Button>
    );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <FullScreenScene
        headerTitle="version"
        contentContainerStyle={styles.contentContainer}
        isLoading={isLoading}
      >
        { this.renderImage() }
        { this.renderText() }
        { this.renderButton() }
      </FullScreenScene>
    );
  }
}

VersionScene.defaultProps = {
  isLoading: false,
  versionInfo: {},
};

VersionScene.propTypes = {
  isLoading: PropTypes.bool,
  versionInfo: PropTypes.object,
  loadAppVersion: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
  versionInfo: selectVersionInfo,
});

const mapDispatchToProps = (dispatch) => ({
  loadAppVersion: (params) => dispatch(loadAppVersionAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'versionScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(VersionScene);
