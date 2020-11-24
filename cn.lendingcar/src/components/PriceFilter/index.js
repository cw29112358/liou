/**
*
* PriceFilter Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';

import ScrollRuler from 'components/ScrollRuler';
import FilterTitle from './FilterTitle';

import { SCALES } from './constants';
import styles from './styles';

const PriceFilter = (props) => {
  const {
    filterData, changeFilter, changeIsScroll, slideWidth,
    hasTitle, viewStyle,
  } = props;

  const sliderImagesValue = filterData.priceRange || [];

  return (
    <View style={viewStyle}>
      { hasTitle && <FilterTitle {...props} /> }
      <ScrollRuler
        scales={SCALES}
        slideWidth={slideWidth || styles.slideLength}
        sliderImagesValue={sliderImagesValue}
        changeFilter={changeFilter}
        changeIsScroll={changeIsScroll}
      />
    </View>
  );
};

PriceFilter.defaultProps = {
  slideWidth: styles.deviceWidth,
  hasTitle: true,
  viewStyle: {},
  changeFilter: () => null,
  changeIsScroll: () => null,
};

PriceFilter.propTypes = {
  slideWidth: PropTypes.number,
  filterData: PropTypes.object.isRequired,
  hasTitle: PropTypes.bool,
  viewStyle: PropTypes.object,
  changeFilter: PropTypes.func,
  changeIsScroll: PropTypes.func,
};

export default PriceFilter;
