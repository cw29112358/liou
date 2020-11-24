/**
*
* ProductListItem Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';
import {
  Item,
  View,
  Text,
} from 'native-base';

import inventoryTagImage from 'assets/inventoryTag.png';

import CarImage from 'components/CarImage';
import DisplayColumn from 'components/DisplayColumn';
import SpecificPreference from 'components/SpecificPreference';

import styles from './styles';

const ProductListItem = (props) => {
  const { item, type, onPress } = props;
  if (!item) return null;
  const {
    make, model, year,
    price,
    images = [],
    loanRelated,
    depositPrice,
    isLoanable,
    promotion,
    // depositFinance,
  } = item;
  const itemStyle = type === 0 ? styles.firstItem : {};

  const renderMakeModelYear = () => (
    <View style={styles.titleLeftView}>
      <Text style={[styles.blackText, styles.leftTitle]} numberOfLines={1}>
        { translate(make) }&nbsp;&nbsp;
        { model }
        <Text style={styles.greyText}> &nbsp;&nbsp;{ year } </Text>
      </Text>
      { renderMileageView() }
    </View>
  );
  const renderMileageView = () => (
    <Text style={styles.greyText}>
      {translate('kbb')}&nbsp;{translate(price, 'dollar', { priceText: styles.greyText })}
    </Text>
  );
  const renderLoanTag = () => (
    <View style={styles.loanView}>
      <Image source={inventoryTagImage} style={styles.tagImage} />
      <Text style={styles.tagText}>{translate('isLoanable')}</Text>
    </View>
  );

  const renderImageView = () => {
    let list;
    if (isLoanable) {
      list = [
        {
          key: translate(loanRelated.defaultDownPayment, 'dollar', styles.priceStyle),
          keyTranslate: false,
          value: 'startingAt',
          valueStyle: styles.paymentText,
        },
      ];
    } else {
      list = [
        {
          key: translate(depositPrice, 'dollar', styles.priceStyle),
          keyTranslate: false,
          value: 'itemDeposit',
          valueStyle: styles.paymentText,
        },
      ];
    }
    const isShowActivity = promotion && JSON.stringify(promotion) !== '{}';
    return (
      <View style={styles.imageView}>
        <CarImage url={images[0]} style={styles.image} />
        <DisplayColumn list={list} listViewStyle={styles.listView} />
        { isShowActivity && <SpecificPreference rowStyles={styles.specificRow} activity={promotion} />}
      </View>
    );
  };
  return (
    <Item
      style={[styles.item, itemStyle]}
      onPress={() => onPress(item)}
    >
      <View style={styles.titleContent}>
        { renderMakeModelYear() }
        { isLoanable && renderLoanTag() }
      </View>
      { renderImageView() }
    </Item>
  );
};

ProductListItem.defaultProps = {
  item: null,
  type: 1,
  onPress: () => null,
};

ProductListItem.propTypes = {
  item: PropTypes.object,
  type: PropTypes.number,
  onPress: PropTypes.func,
};

export default ProductListItem;
