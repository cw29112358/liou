/**
*
* FilterBar Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Icon,
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
    activeButtonStyle, activeTextStyle,
  } = props;

  const renderOption = (item) => {
    const {
      leftChildren, rightChildren, children: buttonChildren,
      onSelect: buttonOnSelect,
      label, isTranslate, isShowRightChildren,
      buttonStyle: itemButtonStyle, textStyle: itemTextStyle,
      ...otherProps
    } = item;
    const active = label === selectedOption || selectedOptions.includes(label);
    const iconName = active ? 'caret-up' : 'caret-down';
    const iconStyle = active ? styles.iconActiveStyle : styles.iconStyle;
    const newRightChildren = rightChildren
    || (isShowRightChildren && <Icon type="FontAwesome" name={iconName} style={iconStyle} />);
    const newButtonStyle = [styles.button, buttonStyle, itemButtonStyle];
    const newTextStyle = [styles.text, textStyle, itemTextStyle];
    const newOnSelect = buttonOnSelect || onSelect;

    if (active) {
      newButtonStyle.push(styles.activeButton);
      newButtonStyle.push(activeButtonStyle);
      newTextStyle.push(styles.activeText);
      newTextStyle.push(activeTextStyle);
    }

    return (
      <Button
        {...otherProps}
        transparent
        style={newButtonStyle}
        key={label}
        onPress={() => newOnSelect(item, title, active, selectedOption, selectedOptions)}
        leftChildren={leftChildren}
        rightChildren={newRightChildren}
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
        options.map((item) => renderOption(item))
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
  onSelect: nullFunction,
  viewStyle: {},
  filterViewStyle: {},
  titleStyle: {},
  buttonViewStyle: {},
  buttonStyle: {},
  textStyle: {},
  activeButtonStyle: {},
  activeTextStyle: {},
  titleOtherProps: {},
  children: null,
};

FilterBar.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  selectedOptions: PropTypes.array,
  onSelect: PropTypes.func,
  viewStyle: PropTypes.object,
  filterViewStyle: PropTypes.any,
  titleStyle: PropTypes.object,
  buttonViewStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  activeButtonStyle: PropTypes.object,
  activeTextStyle: PropTypes.object,
  titleOtherProps: PropTypes.object,
  children: PropTypes.any,
};

export default FilterBar;
