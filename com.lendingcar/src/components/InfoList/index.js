/**
*
* ListItem Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  List,
  Icon,
  Button,
} from 'native-base';

import InfoListItem from 'components/InfoListItem';
import styles from './styles';

const InfoList = (props) => {
  const {
    titleLabel, hasLabelLine, hasBorder,
    children, list, hasShadow,
    viewStyle, titleViewStyle, titleStyle,
    titleIcon, iconType, listStyle, openTitleModal,
  } = props;
  const newViewStyle = [styles.view, viewStyle];
  if (hasBorder) newViewStyle.push(styles.viewBorder);

  const renderTitleIcon = () => (
    <Button
      style={styles.button}
      transparent
      onPressIn={() => openTitleModal()}
    >
      <Icon
        name={titleIcon}
        type={iconType}
        style={styles.iconStyle}
      />
    </Button>
  );
  const renderTitle = () => {
    if (!titleLabel) return null;

    return (
      <View style={[styles.titleView, titleViewStyle]}>
        <View style={styles.leftTitle}>
          { hasLabelLine && <View style={styles.horizontalLine}></View> }
          <Text style={[styles.title, titleStyle]}>{ translate(titleLabel) }</Text>
        </View>
        {!!titleIcon && renderTitleIcon()}
      </View>
    );
  };
  const renderChildren = () => {
    if (children) return children;

    const shadowStyle = hasShadow ? styles.listWithShadow : {};
    return (
      <List style={[shadowStyle, listStyle]}>
        {
          list.map((item, index) => {
            const key = item.keyLabel || `InfoListItem_${index}`;
            return <InfoListItem key={key} hasMargin={hasShadow} {...item} />;
          })
        }
      </List>
    );
  };

  return (
    <View style={newViewStyle}>
      { renderTitle() }
      { renderChildren() }
    </View>);
};

InfoList.defaultProps = {
  titleLabel: '',
  hasLabelLine: true,
  hasBorder: false,
  children: null,
  list: [],
  hasShadow: false,
  viewStyle: {},
  titleViewStyle: {},
  titleStyle: {},
  titleIcon: '',
  iconType: 'Ionicons',
  openTitleModal: () => null,
  listStyle: {},
};

InfoList.propTypes = {
  titleLabel: PropTypes.string,
  hasLabelLine: PropTypes.bool,
  hasBorder: PropTypes.bool,
  children: PropTypes.node,
  list: PropTypes.array,
  hasShadow: PropTypes.bool,
  viewStyle: PropTypes.object,
  titleViewStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  titleIcon: PropTypes.string,
  iconType: PropTypes.string,
  openTitleModal: PropTypes.func,
  listStyle: PropTypes.object,
};

export default InfoList;
