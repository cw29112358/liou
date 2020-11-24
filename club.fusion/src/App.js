/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// react && redux module
import React from 'react';
import { Provider } from 'react-redux';

import { StyleProvider, Root } from 'native-base';

import variables from 'platform';
import getTheme from 'theme/components';

import AppRouter from 'containers/AppRouter';
import RNToast from 'components/RNToast';

import configureStore from './store';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}
const store = configureStore();

export default function App() {
  return (
    <StyleProvider style={getTheme(variables)}>
      <Provider store={store}>
        <Root>
          <AppRouter />
          <RNToast ref={(c) => { if (c) RNToast.toastInstance = c; }} />
        </Root>
      </Provider>
    </StyleProvider>
  );
}
