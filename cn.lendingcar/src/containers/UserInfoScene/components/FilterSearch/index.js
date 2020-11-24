/**
*
* FilterOptions Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';
import { nullFunction } from 'utils/helpers';
import DeleteNbInput from 'components/DeleteNbInput';

import styles from './styles';

const FilterSearch = (props) => {
  const {
    value,
    onChange,
    onFocus,
    onBlur,
  } = props;
  return (
    <View style={styles.content}>
      <View style={styles.inputWrapper}>
        <DeleteNbInput
          viewWithDeleteStyle={styles.viewWithDelete}
          deleteViewStyle={styles.deleteView}
          placeholder={translate('userIfonPlaceholderSearch')}
          style={styles.searchInput}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType="done"
        />
      </View>
    </View>
  );
};

FilterSearch.defaultProps = {
  value: '',
  onChange: nullFunction,
  onFocus: nullFunction,
  onBlur: nullFunction,
};

FilterSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default FilterSearch;
