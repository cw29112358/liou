/**
 *
 * ChangeLanguageScene Stateless Container
 *
 */
/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import I18n from 'react-native-i18n';
import {
  List,
  ListItem,
  Icon,
} from 'native-base';

import { selectLanguage } from 'containers/AppRouter/selectors';
import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';

import styles from './styles';

const languageList = Object.keys(I18n.translations);

function ChangeLanguageScene(props) {
  const { language } = props;

  return (
    <FullScreenScene
      headerTitle="changeLanguage"
    >
      <List>
        {
          languageList.map((item) => (
            <ListItem
              key={item}
              onPress={() => { window.changeLanguage(item); }}
              style={styles.listItem}
            >
              <TranslateText label={item} style={styles.labelStyle} />
              { (language === item) && <Icon style={styles.rightIconStyle} name="checkmark" />}
            </ListItem>
          ))
        }
      </List>
    </FullScreenScene>
  );
}

ChangeLanguageScene.defaultProps = {
};

ChangeLanguageScene.propTypes = {
  language: PropTypes.string.isRequired,
};

const mapStateToProps = createPropsSelector({
  language: selectLanguage,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(ChangeLanguageScene);
