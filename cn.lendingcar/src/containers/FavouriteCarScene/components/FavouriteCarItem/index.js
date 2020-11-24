/**
*
* FavouriteCarItem Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import {
  ListItem,
  View,
  Text,
  CheckBox,
} from 'native-base';

import CarImage from 'components/CarImage';


import styles from './styles';

const FavouriteCarItem = (props) => {
  const {
    data,
    carId,
    edit,
    changeCheckoutBox,
    linkTo,
  } = props;
  const {
    images, make, model, year, price, id,
  } = data;
  const checked = carId.includes(id);
  const checkBoxStyle = checked ? {} : styles.unCheckBox;
  return (
    <ListItem style={styles.listItem} touchableHighlightStyle={styles.touchableHighlightStyle}>
      <TouchableOpacity
        onPress={() => linkTo(data)}
        style={styles.listItemWrapper}
      >
        {
          edit
        && (
          <CheckBox
            checked={checked}
            onPress={() => changeCheckoutBox(id)}
            style={[styles.checkBox, checkBoxStyle]}
          />
        )
        }

        <View style={styles.listItemContent}>
          <CarImage url={images[0]} style={styles.image} />
          <View>
            <Text style={[styles.carTitle]} numberOfLines={1}>
              { translate(make) }&nbsp;&nbsp;{ model }
            </Text>
            <View style={styles.mileage}>
              <Text style={styles.greyText}>
                {year}
              </Text>
            </View>
            <Text style={styles.priceStyle}>
              {translate(price, 'dollar', styles.dollarStyle)} {translate('startPay')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

    </ListItem>
  );
};

FavouriteCarItem.defaultProps = {
  data: {},
  carId: [],
  edit: false,
  changeCheckoutBox: () => null,
  linkTo: () => null,
};

FavouriteCarItem.propTypes = {
  data: PropTypes.object,
  carId: PropTypes.array,
  edit: PropTypes.bool,
  changeCheckoutBox: PropTypes.func,
  linkTo: PropTypes.func,
};

export default FavouriteCarItem;
