/**
*
* FriendsNews Stateless Component
*
*/
/* global window translate */
import React from 'react';
import PropTypes from 'prop-types';
import {
  SwipeRow,
  View,
} from 'native-base';
import {
  TouchableOpacity,
} from 'react-native';

import {
  getUserLogoUrl,
  getUserDisplayName,
  executeFunction,
} from 'utils/helpers';

import ProfileCard from 'components/ProfileCard';
import Button from 'components/Button';
import TranslateText from 'components/TranslateText';

import styles from './styles';

class FriendsNews extends React.Component {
  refRow = {};
  openRowIndex = undefined;
  state = {
    openRowIndex: undefined,
  };

  formatUser = (invitation) => {
    const {
      profile, message, updatedAt, status, type,
    } = invitation;
    const isConversations = type === 'conversations';
    const blackText = isConversations
      ? getUserDisplayName(profile)
      : `${translate('newFriend')} — ${getUserDisplayName(profile)}`;
    return {
      url: getUserLogoUrl(profile.avatar),
      blackText,
      greyText: message,
      timeText: window.momentFormat(updatedAt),
      avatarRowStyle: styles.avatarRow,
      avatarRightStyle: styles.avatarRight,
      row1Style: styles.row1Style,
      blackTextStyle: styles.blackText,
      greyTextStyle: styles.greyText,
      row2RightChildren: isConversations ? undefined : this.renderStatus(status, invitation),
    };
  }
  refSwipeRow = (ref, index) => {
    this.refRow[index] = ref;
  }
  onRowOpen = (index) => {
    this.closeOpenRowAndSetState(index, index);
  }
  onRowClose = (index) => {
    this.closeOpenRowAndSetState(index, undefined);
  }

  isNumber = (number) => typeof number === 'number'
  // 关闭当前打开 + 设定下一个index
  closeOpenRowAndSetState = (operationalIndex, nextIndex) => {
    if (this.openRowIndex !== operationalIndex) this.closeOpenRow();
    this.setStateOpenRowIndex(nextIndex);
  }
  // 关闭当前打开
  closeOpenRow = () => {
    if (this.isNumber(this.openRowIndex) && this.refRow[this.openRowIndex]) {
      this.refRow[this.openRowIndex]._root.closeRow(); //eslint-disable-line
      this.openRowIndex = undefined;
      this.setStateOpenRowIndex(undefined, true);
    }
  }
  // undefined number / number undefined
  setStateOpenRowIndex = (nextOpenIndex, noValid = false) => {
    const isPreNumber = this.isNumber(this.openRowIndex);
    const isNextNumber = this.isNumber(nextOpenIndex);
    if (noValid || isPreNumber !== isNextNumber) {
      this.openRowIndex = nextOpenIndex;
      this.setState({ openRowIndex: nextOpenIndex });
    }
  }
  // 如果当前打开Row,关闭,
  onValidOpen = (callbackName, item) => {
    const { [callbackName]: callback } = this.props;
    if (typeof this.openRowIndex === 'number') {
      this.closeOpenRow();
    } else {
      executeFunction(callback, item);
    }
  }

  onPressRowBody = (item) => {
    this.onValidOpen('onPress', item);
  }
  /* render */
  renderItem = (item, index) => {
    const { onDelete } = this.props;
    const { openRowIndex } = this.state;

    return (
      <View
        key={item.id}
        style={styles.item}
      >
        <SwipeRow
          body={this.renderRowBody(item)}
          disableRightSwipe
          disableLeftSwipe={this.isNumber(openRowIndex) && openRowIndex !== index}
          rightOpenValue={-90}
          right={this.renderDeleteButton(() => onDelete(item))}
          style={styles.swipeRow}
          ref={(ref) => this.refSwipeRow(ref, index)}
          onRowOpen={() => this.onRowOpen(index)}
          onRowClose={() => this.onRowClose(index)}
        />
        <View style={styles.line} />
      </View>

    );
  }

  renderRowBody = (item) => (
    <TouchableOpacity
      style={styles.avatarTouch}
      onPress={() => this.onPressRowBody(item)}
      activeOpacity={1}
    >
      <ProfileCard
        onlyAvatar
        user={item}
        format={this.formatUser}
        avatarProps={{
          avatarStyle: styles.avatarImage,
          children: !item.isRead ? <View style={styles.redDot} /> : undefined,
        }}
      />
    </TouchableOpacity>
  )
  renderStatus = (status, item) => {
    if (!['success', 'fail'].includes(status)) return this.renderAgreeButton(item);
    return (
      <TranslateText
        label={status === 'success' ? 'agreed' : 'refused'}
        style={styles.rejectedText}
      />
    );
  }
  renderAgreeButton = (item) => (
    <Button
      {...styles.linearProps}
      shadowStyle={styles.linearShadow}
      style={styles.linearButton}
      textLabel="agree"
      textStyle={styles.linearButtonText}
      onPress={() => this.onValidOpen('onAgree', item)}
    />
  )

  renderDeleteButton = (onPress) => (
    <Button
      danger
      style={styles.deleteButton}
      onPress={onPress}
      textLabel="delete"
      textStyle={styles.deleteText}
    />
  )

  render() {
    const { list = [], onLayoutList } = this.props;
    return (
      <View
        onLayout={onLayoutList}
        style={styles.list}
      >
        { list.map((item, index) => this.renderItem(item, index)) }
      </View>
    );
  }
}

FriendsNews.defaultProps = {
  list: [],
  onLayoutList: () => null,
  onPress: () => null,
  onDelete: () => null,
  onAgree: () => null,
};

FriendsNews.propTypes = {
  list: PropTypes.array,
  onLayoutList: PropTypes.func,
  onPress: PropTypes.func,
  onDelete: PropTypes.func,
  onAgree: PropTypes.func,
};

export default FriendsNews;
