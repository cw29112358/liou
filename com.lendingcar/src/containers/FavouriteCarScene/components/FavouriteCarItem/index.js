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
    images, make, model, price, id, depositPrice,
    // depositFinance,
  } = data;
  // const { downPayment, prepaid, monthlyPayment } = depositFinance;
  const checked = carId.includes(id);
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
            style={styles.checkBox}
          />
        )
        }

        <View style={styles.listItemContent}>
          <CarImage url={images[0]} style={styles.image} />
          <View>
            <Text style={[styles.carTitle]} numberOfLines={1}>
              { translate(make) }&nbsp;&nbsp;{ model }
            </Text>
            <Text style={styles.priceStyle}>
              {translate('purchaseBudget')} {translate(price, 'dollar')}
            </Text>
            <View style={styles.depositFinance}>
              <Text style={styles.depositText}>
                {translate(depositPrice, 'dollar', styles.depositStyle)} {translate('itemDeposit')}
              </Text>
              {/* <Text style={styles.monthlyText}>
                {translate(monthlyPayment, 'dollar', styles.monthlyDollar)} {translate('monthly')}
              </Text> */}
            </View>
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
