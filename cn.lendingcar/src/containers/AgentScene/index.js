/**
 *
 * AgentScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { RefreshControl, Animated } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Button,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  selectAuthUserAgent,
  selectAuthUserInfo,
  selectToBeAgentTime,
} from 'containers/AppRouter/selectors';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';
import MoneyInformation from 'components/MoneyInformation';
import Mask from 'components/Mask';

import AgentModal from './components/AgentModal';
import AgentBaseInfo from './components/AgentBaseInfo';
import CurrentMonthIncome from './components/CurrentMonthIncome';
import CustomerInformation from './components/CustomerInformation';
import AgentEcharts from './components/AgentEcharts';
import {
  selectIsLoading,
  selectOneMonNewUsers,
  selectOneMonDailyMemberships,
  selectOneMonthDays,
  selectThreeMonNewUsers,
  selectThreeMonDailyMemberships,
  selectThreeMonthDays,
  selectAgentProfit,
  selectAgentPerformance,
} from './selectors';
import { agentLoadAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class AgentScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      dailyMemberships: [],
      newUsers: [],
      yAxisData: [],
      seriesName: {},
      modalVisible: false,
      isFirstLoading: true,
      translateX: new Animated.Value(0),
    };
  }

  componentWillMount() {
    const {
      agentLoad,
      oneMonNewUsers,
      oneMonDailyMemberships,
      oneMonthDays,
    } = this.props;
    agentLoad();
    this.setState({
      dailyMemberships: oneMonDailyMemberships,
      newUsers: oneMonNewUsers,
      yAxisData: oneMonthDays,
      seriesName: {
        users: translate('lastWeekUsers'),
        membership: translate('lastWeekMemberships'),
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      oneMonNewUsers,
      oneMonDailyMemberships,
      oneMonthDays,
    } = nextProps;
    if (oneMonNewUsers[0] !== 'undefined') {
      this.setState({
        dailyMemberships: oneMonDailyMemberships,
        newUsers: oneMonNewUsers,
        yAxisData: oneMonthDays,
      });
    }
  }
  linkToAgentModal = () => {
    const { authUserAgent } = this.props;
    Actions.modal({
      headerProps: {
        title: 'agentIdTitle',
        hiddenBorder: false,
        hasShadow: true,
      },
      component: AgentModal,
      componentProps: {
        agentId: authUserAgent.agentId,
      },
    });
  };
  rightButton = () => (
    <Button
      transparent
      onPress={() => this.linkToAgentModal()}
      style={styles.buttonStyle}
    >
      <Text style={styles.buttonText}>{ translate('agentId') }</Text>
    </Button>
  )
  changeTab = (value) => {
    const tab = value.i;
    const {
      oneMonNewUsers,
      oneMonDailyMemberships,
      threeMonNewUsers,
      threeMonDailyMemberships,
      oneMonthDays,
      threeMonthDays,
    } = this.props;
    const { translateX } = this.state;
    if (tab === 0) {
      Animated.timing(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      this.setState({
        dailyMemberships: oneMonDailyMemberships,
        newUsers: oneMonNewUsers,
        yAxisData: oneMonthDays,
        seriesName: {
          users: translate('lastWeekUsers'),
          membership: translate('lastWeekMemberships'),
        },
      });
    } else if (tab === 1) {
      Animated.timing(translateX, {
        toValue: styles.deviceWidth / 2,
        useNativeDriver: true,
      }).start();
      this.setState({
        dailyMemberships: threeMonDailyMemberships,
        newUsers: threeMonNewUsers,
        yAxisData: threeMonthDays,
        seriesName: {
          users: translate('lastMonthUsers'),
          membership: translate('lastMonthMemberships'),
        },
      });
    }
  }
  linkToBalance = () => {
    Actions.push('balance');
  }
  linkToIncome = () => {
    Actions.push('incomeDetails');
  }
  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  }
  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  }
  setDataList = () => {
    const { agentProfit } = this.props;
    let dataList;
    if (agentProfit) {
      dataList = [
        {
          label: 'balance',
          value: agentProfit.balance,
          linkTo: this.linkToBalance,
        },
        {
          label: 'totalProfit',
          value: agentProfit.totalProfit,
          linkTo: this.linkToIncome,
        },
      ];
    }
    return dataList;
  }
  renderModal = () => {
    const {
      authUserAgent,
    } = this.props;
    const {
      modalVisible,
    } = this.state;
    return (
      <AgentModal
        agentId={authUserAgent.agentId}
        modalVisible={modalVisible}
        closeModal={this.closeModal}
      />
    );
  }
  onRefresh = () => {
    const { agentLoad } = this.props;
    this.setState({ isFirstLoading: false });
    agentLoad({ forceReload: true });
  }
  renderContent = () => {
    const {
      authUser, agentProfit, agentPerformance, toBeAgentTime,
      isLoading,
    } = this.props;
    const {
      dailyMemberships, newUsers, yAxisData, seriesName, isFirstLoading, translateX,
    } = this.state;
    const { lifetime } = agentPerformance;
    const users = lifetime ? lifetime.users : 0;
    const memberships = lifetime ? lifetime.memberships : 0;
    return (
      <Content
        contentContainerStyle={styles.contentContainer}
        refreshControl={(
          <RefreshControl
            refreshing={isLoading && !isFirstLoading}
            onRefresh={this.onRefresh}
            title={translate('loading')}
          />
        )}
        style={styles.content}
      >
        <View>
          <AgentBaseInfo
            authUser={authUser}
            openModal={this.openModal}
            toBeAgentTime={toBeAgentTime}
          />
          <MoneyInformation dataList={this.setDataList()} />
          <CurrentMonthIncome {...agentProfit} />
          <CustomerInformation title="customerInformation" />
          <AgentEcharts
            dailyMemberships={dailyMemberships}
            newUsers={newUsers}
            yAxisData={yAxisData}
            users={users}
            memberships={memberships}
            changeTab={this.changeTab}
            seriesName={seriesName}
            translateX={translateX}
          />
        </View>
      </Content>
    );
  }
  render() {
    const { isLoading } = this.props;
    const { modalVisible, isFirstLoading } = this.state;
    return (
      <Container>
        <AppHeader title="agent" />

        { (!isLoading || !isFirstLoading) && this.renderContent()}
        { modalVisible && <Mask />}
        { this.renderModal() }
        { (isLoading && isFirstLoading) && <Loader />}
      </Container>
    );
  }
}

AgentScene.defaultProps = {
  isLoading: false,
  oneMonNewUsers: [],
  oneMonDailyMemberships: [],
  threeMonNewUsers: [],
  threeMonDailyMemberships: [],
  authUserAgent: {},
  oneMonthDays: [],
  threeMonthDays: [],
  agentProfit: {},
  authUser: {},
  agentPerformance: {},
  toBeAgentTime: 0,
  agentLoad: () => null,
};

AgentScene.propTypes = {
  isLoading: PropTypes.bool,
  oneMonNewUsers: PropTypes.array,
  oneMonDailyMemberships: PropTypes.array,
  threeMonNewUsers: PropTypes.array,
  threeMonDailyMemberships: PropTypes.array,
  authUserAgent: PropTypes.object,
  oneMonthDays: PropTypes.array,
  threeMonthDays: PropTypes.array,
  agentProfit: PropTypes.object,
  authUser: PropTypes.object,
  agentPerformance: PropTypes.object,
  toBeAgentTime: PropTypes.number,
  agentLoad: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
  oneMonNewUsers: selectOneMonNewUsers,
  oneMonDailyMemberships: selectOneMonDailyMemberships,
  threeMonNewUsers: selectThreeMonNewUsers,
  threeMonDailyMemberships: selectThreeMonDailyMemberships,
  authUserAgent: selectAuthUserAgent,
  oneMonthDays: selectOneMonthDays,
  threeMonthDays: selectThreeMonthDays,
  agentProfit: selectAgentProfit,
  authUser: selectAuthUserInfo,
  agentPerformance: selectAgentPerformance,
  toBeAgentTime: selectToBeAgentTime,
});

const mapDispatchToProps = (dispatch) => ({
  agentLoad: () => dispatch(agentLoadAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'agentScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(AgentScene);
