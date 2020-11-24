/**
 *
 * VersionScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  View,
} from 'native-base';
import {
  Image,
  Text,
} from 'react-native';

import { openURLByLinking } from 'utils/helpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import FullScreenScene from 'components/FullScreenScene';
import Button from 'components/Button';
import TranslateText from 'components/TranslateText';
import appImage from 'assets/appIcon.png';

import {
  selectIsLoading,
  selectVersionInfo,
} from './selectors';
import { loadAppVersionAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

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

  renderText({ isLatest, version }) {
    return (
      <TranslateText
        label={isLatest ? 'latestVersion' : 'latestVersionDetected'}
        style={styles.textGrey}
        rightChildren={isLatest ? '' : `V${version}`}
      />
    );
  }
  renderButton({ isLatest, readableVersion }) {
    const label = isLatest ? 'checkForUpdate' : 'updateNow';

    return (
      <View style={styles.bottomView}>
        <Button
          style={styles.button}
          onPress={this.pressButton}
          textLabel={label}
          textStyle={styles.buttonText}
        />
        <TranslateText
          label="currentVersion"
          style={styles.textGrey}
          rightChildren={<Text style={styles.textGrey2A}>{`V${readableVersion}`}</Text>}
        />
      </View>
    );
  }

  render() {
    const { isLoading } = this.props;
    const versionInfo = this.getVersionInfo();

    return (
      <FullScreenScene
        headerTitle="version"
        contentContainerStyle={styles.contentContainer}
        isLoading={isLoading}
      >
        <Image source={appImage} style={styles.app} />


        { this.renderText(versionInfo) }
        { this.renderButton(versionInfo) }
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
