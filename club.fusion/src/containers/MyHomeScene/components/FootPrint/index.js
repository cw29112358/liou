/**
*
* FootPrint Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  Text,
} from 'react-native';

import FilterBar from 'components/FilterBar';

import styles from './styles';

const FootPrint = (props) => {
  const { newsNoReadNumber, options, ...otherProps } = props;
  const isLarge = newsNoReadNumber > 99;

  const getRedDot = (item) => (
    item.label === 'myNews2' && newsNoReadNumber ? (
      <View style={[styles.redDot, { width: isLarge ? 32 : 24 }]}>
        <Text style={styles.redDotText}>{ isLarge ? '99+' : newsNoReadNumber}</Text>
      </View>
    ) : undefined
  );
  const getTrackOptions = () => options.map((item) => {
    const { image } = item;
    return (
      {
        ...item,
        leftChildren: (
          <View style={styles.imageView}>
            <Image source={image} style={styles.image} />
            { getRedDot(item) }
          </View>
        ),
      }
    );
  });

  return (
    <FilterBar
      title="myTracks"
      titleStyle={styles.title}
      options={getTrackOptions()}
      filterViewStyle={styles.view}
      buttonStyle={styles.button}
      textStyle={styles.text}
      {...otherProps}
    />
  );
};

FootPrint.defaultProps = {
  options: [],
  newsNoReadNumber: 0,
};

FootPrint.propTypes = {
  options: PropTypes.array,
  newsNoReadNumber: PropTypes.number,
};

export default FootPrint;
