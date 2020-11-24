/**
*
* AgentEcharts Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import {
  View,
  Text,
  Tabs,
  Tab,
} from 'native-base';
import Echarts from 'native-echarts';

import styles from './styles';

class AgentEcharts extends React.Component { // eslint-disable-line
  renderEcharts() {
    const {
      dailyMemberships,
      newUsers,
      yAxisData,
      changeTab,
      seriesName,
      translateX,
    } = this.props;
    const { users, membership } = seriesName;
    const option = {
      tooltip: {
        trigger: 'axis',
        position: ['20%', '20%'],
      },
      xAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        data: yAxisData,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        offset: 0,
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: membership,
          type: 'line',
          data: dailyMemberships,
        },
        {
          name: users,
          type: 'line',
          data: newUsers,
          lineStyle: {
            width: 4,
          },
        },
      ],
      grid: {
        left: '-7%',
        right: '2%',
        top: '4%',
        bottom: '4%',
        containLabel: true,
      },
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0, color: '#F43F78',
            },
            {
              offset: 1, color: '#F2AA5F',
            },
          ],
          globalCoord: false,
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0, color: '#205ADD',
            },
            {
              offset: 1, color: '#4FC3FA',
            },
          ],
          globalCoord: false,
        },
      ],
      textStyle: {
        color: '#000',
      },
    };
    const translatedOneMonth = translate('oneMonth');
    const translatedThreeMonth = translate('threeMonth');
    return (
      <View style={styles.echarts}>
        <View>
          <Tabs
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabContainerStyle={styles.tabsStyle}
            onChangeTab={(value) => changeTab(value)}
            initialPage={0}
          >
            <Tab heading={translatedOneMonth}>
            </Tab>
            <Tab heading={translatedThreeMonth}>
            </Tab>
          </Tabs>
          <Animated.View
            style={[styles.tabBarStyle, {
              transform: [{ translateX }],
            }]}
          >
          </Animated.View>
        </View>
        {<Echarts option={option} height={182} />}
      </View>
    );
  }

  render() {
    const { users, memberships } = this.props;
    return (
      <View style={styles.echartsWrapper}>
        <View style={styles.linearGradient}>
          <View style={styles.userContent}>
            <Text style={styles.newUserNum}>{translate(users, 'number')}</Text>
            <Text style={styles.userText}>{translate('totalUsers')}</Text>
          </View>
          <View style={styles.userContent}>
            <Text style={styles.totalUserNum}>{translate(memberships, 'number')}</Text>
            <Text style={styles.userText}>{translate('allMemberships')}</Text>
          </View>
        </View>
        { this.renderEcharts() }
      </View>
    );
  }
}

AgentEcharts.defaultProps = {
  dailyMemberships: [],
  newUsers: [],
  yAxisData: [],
  users: '',
  memberships: '',
  changeTab: () => null,
  seriesName: {},
  translateX: null,
};

AgentEcharts.propTypes = {
  dailyMemberships: PropTypes.array,
  newUsers: PropTypes.array,
  yAxisData: PropTypes.array,
  users: PropTypes.number,
  memberships: PropTypes.number,
  changeTab: PropTypes.func,
  seriesName: PropTypes.object,
  translateX: PropTypes.any,
};

export default AgentEcharts;
