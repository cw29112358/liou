/**
*
* AvatarListItem Stateless Component
*
*/

// /* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  Left,
  Body,
  Right,
  Text,
} from 'native-base';
import Avatar from 'components/Avatar';
import styles from './styles';

const AvatarListItem = (props) => {
  const {
    dataInfo,
    listItemStyle,
    rightTopStyle,
    ...otherProps
  } = props;
  return (
    <ListItem
      avatar
      style={[styles.listItemStyle, listItemStyle]}
      {...otherProps}
    >
      <Left>
        <Avatar
          avatarStyle={styles.avatarStyle}
          url={dataInfo.avatarUrl}
          showUserName={false}
        />
      </Left>
      <Body style={styles.bodyStyle}>
        <Text style={styles.bodyTextStyle}>{dataInfo.bodyTopText}</Text>
        <Text style={styles.noteStyle}>{dataInfo.bodyBottomText}</Text>
      </Body>
      <Right style={styles.rightStyle}>
        <Text style={[styles.rightTextStyle, rightTopStyle]}>{dataInfo.rightTopText}</Text>
        <Text style={styles.noteStyle}>{dataInfo.rightBottomText}</Text>
      </Right>
    </ListItem>
  );
};

AvatarListItem.defaultProps = {
  dataInfo: {},
  listItemStyle: {},
  rightTopStyle: {},
};

AvatarListItem.propTypes = {
  dataInfo: PropTypes.object,
  listItemStyle: PropTypes.object,
  rightTopStyle: PropTypes.object,
};

export default AvatarListItem;
