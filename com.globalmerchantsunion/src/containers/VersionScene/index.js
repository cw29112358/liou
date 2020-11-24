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

import { LINEAR_PROPS } from 'utils/constants';
import { openURLByLinking } from 'utils/helpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import FullScreenScene from 'components/FullScreenScene';
import Button from 'components/Button';
import TranslateText from 'components/TranslateText';

import appImage from 'assets/icon.png';
import {
  selectIsLoading,
  selectVersionInfo,
} from './selectors';
import { loadAppVersionAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class VersionScene extends React.Component {
  componentWillMount() {
    this.loadAppVersion();
  }

  pressButton = (versionInfo) => {
    const func = versionInfo.isLatest ? this.loadAppVersion : this.linkToDownload;
    func(versionInfo);
  }
  loadAppVersion = () => {
    const { loadAppVersion } = this.props;
    loadAppVersion({ forceReload: true });
  }
  linkToDownload = ({ url }) => {
    openURLByLinking(url);
  }

  renderText({ isLatest, version, readableVersion }) {
    const textProps = isLatest
      ? {
        label: 'latestVersion',
      }
      : {
        label: 'latestVersionDetected',
        rightChildren: ` V${version}`,
      };

    return (
      <View style={styles.textView}>
        <TranslateText
          {...textProps}
          style={styles.title}
        />
        <TranslateText
          label="currentVersion"
          style={styles.sbuTitle}
          rightChildren={<Text style={styles.textGrey}>{` V${readableVersion}`}</Text>}
        />
      </View>
    );
  }
  renderButton(versionInfo) {
    return (
      <Button
        {...LINEAR_PROPS}
        linearStyle={styles.linearStyle}
        style={styles.button}
        onPress={() => this.pressButton(versionInfo)}
        scrollEnabled={false}
        textLabel={versionInfo.isLatest ? 'checkForUpdate' : 'updateNow'}
        textStyle={styles.buttonText}
      />
    );
  }

  render() {
    const { isLoading, versionInfo } = this.props;

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
