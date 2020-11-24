/**
*
* FilterBar Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';

import {
  nullFunction,
} from 'utils/helpers';

import TranslateText from 'components/TranslateText';
import Button from 'components/Button';

import styles from './styles';

const FilterBar = (props) => {
  const {
    title, titleOtherProps,
    options, onSelect, children,
    selectedOption, selectedOptions,
    viewStyle, filterViewStyle, titleStyle,
    buttonViewStyle, buttonStyle, textStyle,
    activeButtonStyle, activeTextStyle, disabled,
  } = props;

  const renderOption = (item, index) => {
    const {
      leftChildren, rightChildren, children: buttonChildren,
      onSelect: buttonOnSelect,
      label, isTranslate,
      buttonStyle: itemButtonStyle, textStyle: itemTextStyle,
      ...otherProps
    } = item;
    const newButtonStyle = [styles.button, buttonStyle, itemButtonStyle];
    const newTextStyle = [styles.text, textStyle, itemTextStyle];
    const newOnSelect = buttonOnSelect || onSelect;

    const active = label === selectedOption || selectedOptions.includes(label);
    if (active) {
      newButtonStyle.push(styles.activeButton);
      newButtonStyle.push(activeButtonStyle);
      newTextStyle.push(styles.activeText);
      newTextStyle.push(activeTextStyle);
    }

    return (
      <Button
        {...otherProps}
        disabled={disabled}
        transparent
        style={newButtonStyle}
        key={label}
        onPress={() => newOnSelect({
          item, index, title, active, selectedOption, selectedOptions,
        })}
        leftChildren={leftChildren}
        rightChildren={rightChildren}
        textLabel={label}
        textStyle={newTextStyle}
        textTranslate={isTranslate}
      >
        { buttonChildren }
      </Button>
    );
  };
  const renderOptions = () => (
    <View style={[styles.buttonView, buttonViewStyle]}>
      {
        options.map((item, index) => renderOption(item, index))
      }
    </View>
  );
  const renderChildren = () => (
    <View>
      { children }
    </View>
  );

  return (
    <View style={viewStyle}>
      <View style={[styles.filterView, filterViewStyle]}>
        { !!title && <TranslateText {...titleOtherProps} style={[styles.title, titleStyle]} label={title} /> }
        { !!options && renderOptions() }
      </View>
      { children && renderChildren() }
    </View>
  );
};

FilterBar.defaultProps = {
  title: undefined,
  options: undefined,
  selectedOption: '',
  selectedOptions: [],
  disabled: false,
  onSelect: nullFunction,
  viewStyle: {},
  filterViewStyle: {},
  titleStyle: {},
  titleOtherProps: {},
  buttonViewStyle: {},
  buttonStyle: {},
  textStyle: {},
  activeButtonStyle: {},
  activeTextStyle: {},
  children: null,
};

FilterBar.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  selectedOptions: PropTypes.array,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  viewStyle: PropTypes.object,
  filterViewStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  titleOtherProps: PropTypes.object,
  buttonViewStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  activeButtonStyle: PropTypes.object,
  activeTextStyle: PropTypes.object,
  children: PropTypes.any,
};

export default FilterBar;
