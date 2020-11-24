/**
*
* SearchHeader Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Item,
  Button,
} from 'native-base';
import {
  Image,
} from 'react-native';

import { nullFunction } from 'utils/helpers';

import AppStatusBar from 'components/AppStatusBar';
import DeleteNbInput from 'components/DeleteNbInput';

import backImage from './assets/back.png';
import searchImage from './assets/search.png';
import styles from './styles';

function SearchHeader(props) {
  const {
    onBack, value, onChange, onFocus, onBlur,
  } = props;

  return (
    <View style={styles.header}>
      <AppStatusBar />
      <Button
        transparent
        style={[styles.boxShadow, styles.backButton]}
        onPress={onBack}
      >
        <Image source={backImage} style={styles.backImage} />
      </Button>

      <Item style={[styles.boxShadow, styles.item]}>
        <Image source={searchImage} style={styles.searchImage} />
        <DeleteNbInput
          viewWithDeleteStyle={styles.viewWithDelete}
          deleteViewStyle={styles.deleteView}
          placeholder={translate('placeholderSearch')}
          style={styles.searchInput}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType="done"
        />
      </Item>
    </View>
  );
}

SearchHeader.defaultProps = {
  onBack: nullFunction,
  value: '',
  onChange: nullFunction,
  onFocus: nullFunction,
  onBlur: nullFunction,
};

SearchHeader.propTypes = {
  onBack: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default SearchHeader;
