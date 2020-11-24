/* global window */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import {
  StyleProvider,
} from 'native-base';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import variables from 'platform';
import getTheme from 'theme/components';

import { translate } from 'utils/helpers';

import configureStore from 'src/store';
import { loadStories } from './storyLoader';

// import stories
configure(() => {
  loadStories();
}, module);

const store = configureStore();

window.translate = translate;

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true });

// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <StorybookUIRoot />
        </StyleProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Fusion', () => StorybookUIHMRRoot);
export default StorybookUIHMRRoot;
