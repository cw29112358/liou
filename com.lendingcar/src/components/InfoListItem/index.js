/**
*
* ListItem Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  View,
  Text,
  Icon,
} from 'native-base';
import {
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

const InfoListItem = (props) => {
  const {
    keyLabel, leftIcon, leftPress,
    valueLabel, valueText, hasRightArrow, rightChildren,
    onPress, hasMargin, hasBorder, children,
    itemStyle, keyLabelStyle, valueTextStyle, isThead,
  } = props;

  const newItemStyle = [styles.item];
  if (hasMargin) newItemStyle.push(styles.itemWithMargin);
  if (hasBorder) newItemStyle.push(styles.itemWithBorder);
  if (children) newItemStyle.push(styles.itemChildren);
  if (itemStyle) newItemStyle.push(itemStyle);

  const renderDefaultLeft = () => {
    const leftTextStyle = [styles.label, keyLabelStyle];
    if (isThead) leftTextStyle.push(styles.theadText);
    return (
      <TouchableOpacity onPressIn={leftPress} activeOpacity={leftIcon ? 0.8 : 1}>
        <View style={styles.row}>
          <Text style={leftTextStyle} numberOfLines={1}>
            { translate(keyLabel) }
          </Text>
          { leftIcon }
        </View>
      </TouchableOpacity>
    );
  };
  const renderRightContent = () => {
    if (rightChildren) return rightChildren;

    const rightTextStyle = [styles.rightText];
    if (hasRightArrow) rightTextStyle.push(styles.rightTextWithIcon);
    if (valueTextStyle) rightTextStyle.push(valueTextStyle);
    if (isThead) rightTextStyle.push(styles.theadText);
    return (
      <Text style={rightTextStyle}>
        { valueLabel ? translate(valueLabel) : valueText }
      </Text>
    );
  };
  const renderDefaultRight = () => (
    <View style={[styles.row, styles.rightView]}>
      { renderRightContent() }
      { hasRightArrow && <Icon style={styles.rightIcon} name="ios-arrow-forward" />}
    </View>
  );

  return (
    <ListItem underlayColor="white" style={newItemStyle} onPress={onPress}>
      { children }
      { !children && renderDefaultLeft() }
      { !children && renderDefaultRight() }
    </ListItem>
  );
};

InfoListItem.defaultProps = {
  keyLabel: '',
  leftIcon: null,
  leftPress: null,
  valueLabel: '',
  valueText: '',
  hasRightArrow: false,
  rightChildren: null,
  onPress: null,
  hasMargin: false,
  hasBorder: false,
  children: null,
  itemStyle: {},
  keyLabelStyle: {},
  valueTextStyle: null,
  isThead: false,
};

InfoListItem.propTypes = {
  keyLabel: PropTypes.string,
  leftIcon: PropTypes.node,
  leftPress: PropTypes.func,
  valueLabel: PropTypes.string,
  valueText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  hasRightArrow: PropTypes.bool,
  rightChildren: PropTypes.node,
  onPress: PropTypes.func,
  hasMargin: PropTypes.bool,
  hasBorder: PropTypes.bool,
  children: PropTypes.node,
  itemStyle: PropTypes.object,
  keyLabelStyle: PropTypes.object,
  valueTextStyle: PropTypes.object,
  isThead: PropTypes.bool,
};

export default InfoListItem;
