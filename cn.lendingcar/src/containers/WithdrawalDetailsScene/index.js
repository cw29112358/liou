/**
 *
 * WithdrawalDetailsScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { selectAgentProfit, selectWithdrawal } from 'containers/AgentScene/selectors';

import FullScreenScene from 'components/FullScreenScene';
import MoneyInformation from 'components/MoneyInformation';
import RecordDetailList from 'components/RecordDetailList';

import styles from './styles';

const WithdrawalDetailsScene = (props) => {
  const { profit, withdrawal } = props;
  const hasWithdrawal = withdrawal.length <= 0;
  const totalContentStyles = [styles.totalContent];
  if (hasWithdrawal) {
    totalContentStyles.push(styles.withoutData);
  }
  const setDataList = () => {
    let dataList;
    if (profit) {
      dataList = [
        {
          label: 'pendingWithdrawal',
          value: profit.pendingWithdrawal,
        },
        {
          label: 'successWithdrawal',
          value: profit.successWithdrawal,
        },
      ];
    }
    return dataList;
  };

  return (
    <FullScreenScene
      headerTitle="withdrawalDetailsTitle"
      containerStyle={styles.containerStyle}
      contentContainerStyle={styles.contentContainer}
      contentStyle={styles.content}
      scrollEnabled={false}
    >
      <MoneyInformation
        dataList={setDataList()}
        contentStyle={totalContentStyles}
      />
      <RecordDetailList
        data={withdrawal}
        scrollViewStyle={styles.contentScrollView}
        contentStyle={styles.contentStyle}
        listItemStyle={styles.listItemStyle}
      />
    </FullScreenScene>
  );
};

WithdrawalDetailsScene.defaultProps = {
  profit: {},
  withdrawal: [],
};

WithdrawalDetailsScene.propTypes = {
  profit: PropTypes.object,
  withdrawal: PropTypes.array,
};

const mapStateToProps = createPropsSelector({
  profit: selectAgentProfit,
  withdrawal: selectWithdrawal,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawalDetailsScene);
