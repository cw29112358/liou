/**
*
* TripCard Stateless Component
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
import {
  Image,
} from 'react-native';

import { openURLByLinking } from 'utils/helpers';
import { SERVICE_TEL_SPLIT, SERVICE_TEL } from 'utils/constants';

import CarImage from 'components/CarImage';
import DivisionLine from 'components/DivisionLine';

import arrowImage from './assets/arrow.png';
import styles from './styles';

const TripCard = (props) => {
  const { item, itemStyle, onPress } = props;

  const {
    bookingState, car,
    pickupDate, pickupAddress1, pickupCity, pickupState, pickupZip,
    returnDate, returnAddress1, returnCity, returnState, returnZip,
  } = item;
  const { images = [], make, model } = car;
  // 是否是送货上门
  const isDelivery = !pickupAddress1;

  const renderTime = (date) => (
    <Text style={styles.blackText}>{ date }</Text>
  );
  const renderLocationItem = (address, city, state, zip) => (
    <View>
      <Text style={styles.greyText}>{ address }，</Text>
      <Text style={styles.greyText}>{ city }，{ state }，{ zip }</Text>
    </View>
  );
  const renderAddressRow = () => (
    <View style={styles.row}>
      { renderLocationItem(pickupAddress1, pickupCity, pickupState, pickupZip) }
      <Image style={styles.arrowImage} source={arrowImage} />
      { renderLocationItem(returnAddress1, returnCity, returnState, returnZip) }
    </View>
  );
  const renderAdressTip = () => (
    <View style={[styles.row, { justifyContent: 'center' }]}>
      <Text style={styles.greyText}>
        {translate('locationNote')}
        {translate('detailConsult')}
        <Text
          style={[styles.greyText, styles.linkText]}
          onPress={() => openURLByLinking(`tel:${SERVICE_TEL}`, 'notSupportPhoneUrl')}
        >
          { SERVICE_TEL_SPLIT }
        </Text>
      </Text>
    </View>
  );

  return (
    <Item style={[styles.item, itemStyle]} onPress={() => { onPress(item); }}>
      <View style={styles.row}>
        <Text style={[styles.blackText, styles.leftTitle]} numberOfLines={1}>
          {translate(make)}&nbsp;&nbsp;
          {model}
        </Text>
        <Text style={styles.greyText}> {translate(bookingState)} </Text>
      </View>

      <View style={styles.imageView}>
        <CarImage url={images[0]} style={styles.image} />
      </View>

      <DivisionLine width={styles.item.width - 12} />

      <View style={[styles.row, styles.dateView]}>
        { renderTime(pickupDate) }
        { renderTime(returnDate) }
      </View>

      { isDelivery ? renderAdressTip() : renderAddressRow() }
    </Item>
  );
};

TripCard.defaultProps = {
  item: {},
  itemStyle: {},
  onPress: () => null,
};

TripCard.propTypes = {
  item: PropTypes.object,
  itemStyle: PropTypes.object,
  onPress: PropTypes.func,
};

export default TripCard;
