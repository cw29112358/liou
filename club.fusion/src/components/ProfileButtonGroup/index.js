/**
*
* ProfileButtonGroup Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
} from 'react-native';

import FilterBar from 'components/FilterBar';

import { getProfileOptions, onPressProfileButton } from './helpers';
import styles from './styles';

const ProfileButtonGroup = (props) => {
  const {
    formatOptions, hasSplit, profile, ...otherProps
  } = props;

  let options = getProfileOptions(profile);
  options = options
    .map((item) => ({
      ...item,
      leftChildren: <Image source={item.image} style={styles.image} />,
    }));
  if (hasSplit) options[0].rightChildren = <View style={styles.splitLine} />;
  if (formatOptions) options = formatOptions(options);

  return (
    <FilterBar
      showTitle={false}
      options={options}
      onSelect={onPressProfileButton}
      buttonStyle={styles.button}
      textStyle={styles.buttonText}
      {...otherProps}
    />
  );
};

ProfileButtonGroup.defaultProps = {
  hasSplit: false,
  profile: {},
  formatOptions: undefined,
};

ProfileButtonGroup.propTypes = {
  hasSplit: PropTypes.bool,
  profile: PropTypes.object,
  formatOptions: PropTypes.func,
};

export default ProfileButtonGroup;
