/**
*
* ProductListItem Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Item,
  View,
  Text,
} from 'native-base';

import CarImage from 'components/CarImage';
import TranslateText from 'components/TranslateText';

import styles from './styles';

const ProductListItem = (props) => {
  const { item, onPress } = props;
  if (!item) return null;

  const {
    make, model, year, images = [], price,
  } = item;

  // const renderBrandBgText = (label) => (
  //   <View style={styles.brandBgView}>
  //     <View style={styles.brandBg} />
  //     <TranslateText label={label} style={styles.brandBgText} />
  //   </View>
  // );

  return (
    <Item
      style={styles.item}
      onPress={() => onPress(item)}
    >
      <CarImage url={images[0]} style={styles.image} />
      <View>

        <View style={styles.row}>
          <Text style={styles.blackText} numberOfLines={1}>
            { translate(make) }&nbsp;
            { model }
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.greyText}>{ year } </Text>
        </View>

        <View style={[styles.row, styles.priceRow]}>
          <TranslateText type="dollar" label={price} style={styles.priceStyle} />
          <TranslateText label="startPay" style={styles.startPay} />
        </View>

        {/* <View style={[styles.row, { marginLeft: -8 }]}>
          {renderBrandBgText('staging')}
          {renderBrandBgText('installmentPaymentNote')}
        </View> */}
      </View>
    </Item>
  );
};

ProductListItem.defaultProps = {
  item: null,
  onPress: () => null,
};

ProductListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default ProductListItem;
