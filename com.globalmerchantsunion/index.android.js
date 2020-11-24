/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: Module RCTAuroraIMUIModule requires main', 'Module RCTAuroraIMUIModule', 'Class RCTCxxModule']);
YellowBox.ignoreWarnings(['Warning: Module RCTJMessageModule requires main', 'Module RCTJMessageModule', 'Class RCTCxxModule']);
AppRegistry.registerComponent('GlobalMerchantsUnion', () => App);
