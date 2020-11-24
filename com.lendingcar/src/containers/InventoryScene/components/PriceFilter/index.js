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

import FiterBar from 'components/FilterBar';

import {
  omitObjBykeyObj,
  objectMerge,
} from 'utils/helpers';

import FilterTitle from '../FilterTitle';

import styles from './styles';

const propTypes = {
  hasTitle: PropTypes.bool,
  translateLeft: PropTypes.bool,
  translateRight: PropTypes.bool,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  changeFilter: PropTypes.func,
  viewStyle: PropTypes.object,
  titleViewStyle: PropTypes.object,
  leftLabelStyle: PropTypes.object,
  rightLabelStyle: PropTypes.object,
  buttonViewStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

class PriceFilter extends React.Component {
  onFilterPrice = (item) => {
    const { changeFilter } = this.props;
    changeFilter('priceRange', item.value);
    changeFilter('priceLabel', item.label);
  }

  renderTitle() {
    const {
      translateLeft, translateRight,
      leftLabel, rightLabel,
      titleViewStyle, leftLabelStyle, rightLabelStyle,
    } = this.props;

    return (
      <FilterTitle
        translateLeft={translateLeft}
        translateRight={translateRight}
        leftLabel={leftLabel}
        rightLabel={rightLabel}
        viewStyle={titleViewStyle}
        leftLabelStyle={leftLabelStyle}
        rightLabelStyle={rightLabelStyle}
      />
    );
  }
  render() {
    const {
      viewStyle, hasTitle,
      options, selectedOption,
      buttonViewStyle, buttonStyle, textStyle,
    } = this.props;
    const otherProps = omitObjBykeyObj(this.props, propTypes);

    return (
      <View style={viewStyle}>
        { hasTitle && this.renderTitle()}
        <FiterBar
          {...otherProps}
          options={options}
          selectedOption={selectedOption}
          onSelect={this.onFilterPrice}
          buttonViewStyle={objectMerge(styles.buttonView, buttonViewStyle)}
          buttonStyle={objectMerge(styles.button, buttonStyle)}
          textStyle={objectMerge(styles.text, textStyle)}
        />
      </View>
    );
  }
}

PriceFilter.defaultProps = {
  hasTitle: true,
  translateLeft: true,
  translateRight: true,
  leftLabel: '',
  rightLabel: '',
  options: [],
  selectedOption: '',
  changeFilter: () => null,
  viewStyle: {},
  titleViewStyle: {},
  leftLabelStyle: {},
  rightLabelStyle: {},
  buttonViewStyle: {},
  buttonStyle: {},
  textStyle: {},
};

PriceFilter.propTypes = propTypes;


export default PriceFilter;
