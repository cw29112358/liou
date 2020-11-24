import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import moment from 'moment';

import { DATE_FORMAT } from 'utils/constants';

export const selectAgentSceneReducer = (state) => state.get('agentScene', Immutable.Map());

export const selectAgentPerformance = createGetSelector(
  selectAgentSceneReducer, 'agentPerformance', Immutable.Map(),
);
export const selectAgentProfit = createGetSelector(
  selectAgentSceneReducer, 'agentProfit', Immutable.Map(),
);

export const selectProfits = createSelector(
  selectAgentProfit,
  (profits) => {
    const profitsList = profits.get('profits');
    if (!profitsList) return Immutable.List();
    return profitsList.sortBy((item) => {
      const createdDate = item.get('createdDate');
      const unix = moment(createdDate).unix();
      return -unix;
    });
  }
);
export const selectWithdrawal = createSelector(
  selectAgentProfit,
  (profits) => {
    const withdrawalList = profits.get('withdrawal');
    if (!withdrawalList) return Immutable.List();
    return withdrawalList.sortBy((item) => {
      const createdDate = item.get('createdDate');
      const unix = moment(createdDate).unix();
      return -unix;
    });
  }
);
export const selectWithdrawalAndProfits = createSelector(
  selectProfits,
  selectWithdrawal,
  (profitsList, withdrawalList) => withdrawalList
    .concat(profitsList).sortBy((item) => {
      const createdDate = item.get('createdDate');
      const unix = moment(createdDate).unix();
      return -unix;
    })
);

export const selectWithdrawalTimes = createSelector(
  selectAgentProfit,
  (profits) => {
    const withdrawalList = profits.get('withdrawal');
    return Immutable.List()
      .merge(withdrawalList)
      .filter((item) => {
        const createdDate = item.get('createdDate');
        return moment(createdDate).month() === moment().month();
      }).size;
  }
);

export const selectIsLoading = createGetSelector(
  selectAgentSceneReducer, 'isLoading', false,
);
export const selectNewUsers = createGetSelector(
  selectAgentPerformance, 'newUsersThisWeek', 0
);

export const selectTotalUsers = createGetSelector(
  selectAgentPerformance, 'totalUsers', 0
);

export const selectDailyNewsUsers = createGetSelector(
  selectAgentPerformance, 'dailyNewUsers', Immutable.Map()
);
export const selectDailyMemberships = createGetSelector(
  selectAgentPerformance, 'dailyMemberships', Immutable.Map()
);
export const selectPerformance = createGetSelector(
  selectAgentPerformance, 'performance', Immutable.Map()
);

const createUserSelector = (selector, returnUsersNum, isThreeMonth, timeInterval, returnDays) => (createSelector(
  selector,
  (users) => {
    const result = Immutable.List(new Array(returnUsersNum).fill(0)).map((key, index) => {
      let date = moment().startOf('month').add((index * timeInterval), 'days');
      if (isThreeMonth) {
        date = moment().subtract((1 + index * timeInterval), 'days');
      }
      if (returnDays) {
        return date.format('DD/MM');
      }
      let i = 1;
      let userSum = 0;
      while (i <= timeInterval) {
        const formatDate = date.subtract(1, 'days').format(DATE_FORMAT);
        const value = users.get(formatDate);
        userSum = value ? (userSum + value) : userSum;
        i += 1;
      }
      return userSum;
    });
    if (isThreeMonth) {
      return result.reverse();
    }
    return result;
  }
));
const curry = (returnUsersNum) => (isThreeMonth) => (timeInterval) => (returnDays, selector) => createUserSelector(selector, returnUsersNum, isThreeMonth, timeInterval, returnDays);
const oneMonthNews = curry(5)(false)(7);
const threeMonthNews = curry(6)(true)(15);

export const selectOneMonNewUsers = oneMonthNews(false, selectDailyNewsUsers);
export const selectOneMonDailyMemberships = oneMonthNews(false, selectDailyMemberships);
export const selectOneMonthDays = oneMonthNews(true, selectDailyMemberships);

export const selectThreeMonNewUsers = threeMonthNews(false, selectDailyNewsUsers);
export const selectThreeMonDailyMemberships = threeMonthNews(false, selectDailyMemberships);
export const selectThreeMonthDays = threeMonthNews(true, selectDailyMemberships);
