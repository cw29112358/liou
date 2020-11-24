/**
 *
 * EntryScene Container
 *
 */
import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  ImageBackground,
  Image,
} from 'react-native';

import AppStatusBar from 'components/AppStatusBar';
import FilterBar from 'components/FilterBar';
import TranslateText from 'components/TranslateText';

import logoImage from 'assets/logo.png';
import bgImage from './assets/bg.png';

import styles from './styles';

export class EntryScene extends React.Component {
  onPressFooter = ({ item }) => {
    Actions.push(item.label);
  }

  renderFooter = () => {
    const options = [
      {
        label: 'login',
        buttonStyle: styles.logInButton,
        ...styles.linearProps,
      },
      {
        label: 'signUp',
        buttonStyle: styles.signButton,
      },
    ];
    return (
      <FilterBar
        options={options}
        viewStyle={styles.buttonParentView}
        buttonViewStyle={styles.buttonView}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        onSelect={this.onPressFooter}
      />
    );
  }
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundImage}>
        <AppStatusBar />
        <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
        <TranslateText label="logoText" style={styles.logoText} />
        { this.renderFooter() }
      </ImageBackground>
    );
  }
}

EntryScene.defaultProps = {
};

EntryScene.propTypes = {
};

export default EntryScene;
