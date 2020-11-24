/**
 *
 * IncomeDetailsScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { selectAgentProfit, selectProfits } from 'containers/AgentScene/selectors';

import FullScreenScene from 'components/FullScreenScene';
import MoneyInformation from 'components/MoneyInformation';
import RecordDetailList from 'components/RecordDetailList';

import styles from './styles';

const IncomeDetailsScene = (props) => {
  const { profit, profitsList } = props;

  const setDataList = () => {
    let dataList;
    if (profit) {
      dataList = [
        {
          label: 'currentMonthProfit',
          value: profit.currentMonthProfit,
        },
        {
          label: 'DetailstotalProfit',
          value: profit.totalProfit,
        },
      ];
    }
    return dataList;
  };

  return (
    <FullScreenScene
      headerTitle="incomeDetailsTitle"
      containerStyle={styles.containerStyle}
      contentContainerStyle={styles.contentContainer}
      contentStyle={styles.content}
      scrollEnabled={false}
    >
      <MoneyInformation
        dataList={setDataList()}
        contentStyle={styles.totalContent}
      />
      <RecordDetailList
        data={profitsList}
        scrollViewStyle={styles.contentScrollView}
        contentStyle={styles.contentStyle}
        listItemStyle={styles.listItemStyle}
      />
    </FullScreenScene>
  );
};

IncomeDetailsScene.defaultProps = {
  profit: {},
  profitsList: [],
};

IncomeDetailsScene.propTypes = {
  profit: PropTypes.object,
  profitsList: PropTypes.array,
};

const mapStateToProps = createPropsSelector({
  profit: selectAgentProfit,
  profitsList: selectProfits,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomeDetailsScene);
