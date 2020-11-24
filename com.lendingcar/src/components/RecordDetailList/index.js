/**
*
* RecordDetailList Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ListItem,
} from 'native-base';
import {
  ScrollView,
} from 'react-native';

import { momentFormat } from 'utils/helpers';
import { DATE_FORMAT, MONEY_UNIT } from 'utils/constants';

import styles from './styles';

const RecordDetailList = (props) => {
  const {
    data,
    scrollViewStyle, listItemStyle, emptyListStyle, contentStyle,
  } = props;

  const renderItem = (item) => {
    const {
      status, amount, createdDate, detail,
    } = item;
    const statusStyles = [styles.noteText, styles.leftText];
    if (status === 'fail') statusStyles.push(styles.errorText);

    let tradingString = `+ ${MONEY_UNIT.unit}`;
    if (status) tradingString = MONEY_UNIT.negativeUnit;

    const explainString = status ? `${translate('transferBank')}`
      : `${translate('userPrefix')} ${detail.username} ${translate(`${detail.level}Purchase`)}`;

    return (
      <ListItem key={item.id} style={[styles.listItem, listItemStyle]}>
        <View style={styles.leftView}>
          <Text style={styles.explainText}>{explainString}</Text>
          <Text style={styles.noteText}>{momentFormat(createdDate, `${DATE_FORMAT} h:mm:ss a`)}</Text>
        </View>
        <View style={styles.rightView}>
          <Text style={[styles.tradingText, styles.leftText]}>{tradingString}{Number(amount).toFixed(2)}</Text>
          {status && <Text style={statusStyles}>{translate(`${status}Withdrawl`)}</Text>}
        </View>
      </ListItem>
    );
  };

  const emptyList = (
    <ListItem style={[styles.emptyList, emptyListStyle]}>
      <Text style={styles.noteText}>{translate('noRecord')}</Text>
    </ListItem>
  );

  return (
    <ScrollView
      style={[styles.srcollView, scrollViewStyle]}
      contentContainerStyle={[styles.list, contentStyle]}
      showsVerticalScrollIndicator={false}
      scrollEnabled={data.length > 4}
    >
      {(data && data.length > 0) ? data.map((item, index) => renderItem(item, index))
        : emptyList}
    </ScrollView>
  );
};

RecordDetailList.defaultProps = {
  data: [],
  scrollViewStyle: {},
  listItemStyle: {},
  emptyListStyle: {},
  contentStyle: {},
};

RecordDetailList.propTypes = {
  data: PropTypes.array,
  scrollViewStyle: PropTypes.object,
  listItemStyle: PropTypes.object,
  emptyListStyle: PropTypes.object,
  contentStyle: PropTypes.object,
};

export default RecordDetailList;
