/**
*
* AppStatusBar Stateless Component
*
*/

import React from 'react';
import { StatusBar } from 'react-native';

import variables from 'platform';

const { isIOS } = variables;

const AppStatusBar = () => <StatusBar barStyle={isIOS ? 'dark-content' : 'light-content'} translucent />;

export default AppStatusBar;
