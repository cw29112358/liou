/**
*
* TripTabs Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  TabContainer,
  TabHeading,
  Text,
} from 'native-base';
import {
  TouchableOpacity,
} from 'react-native';

import { nullFunction } from 'utils/helpers';

import styles from './styles';

class TripTabs extends React.Component {
  renderTabBar = (props) => (
    <TabContainer>
      {props.tabs.map((name, page) => {
        const isTabActive = props.activeTab === page;
        return this.renderTab(
          name,
          page,
          isTabActive,
          props.goToPage,
          props.tabStyle[page],
          props.activeTabStyle[page],
          props.textStyle[page],
          props.activeTextStyle[page],
          props.tabHeaderStyle[page],
          14,
        );
      })}
    </TabContainer>
  )
  renderTab = (
    name,
    page,
    isTabActive,
    onPressHandler,
    tabStyle,
    activeTabStyle,
    textStyle,
    activeTextStyle,
    tabHeaderStyle,
    tabFontSize// eslint-disable-line
  ) => {
    const { onStopListScroll } = this.props;

    return (
      <TouchableOpacity
        style={styles.button}
        key={name}
        onPressIn={() => {
          onStopListScroll(() => { onPressHandler(page); });
        }}
        activeOpacity={1}
      >
        <TabHeading
          style={isTabActive ? activeTabStyle : tabStyle}
          active={isTabActive}
        >
          <Text
            style={[
              textStyle,
              isTabActive ? activeTextStyle : {},
            ]}
          >
            {name}
          </Text>
        </TabHeading>
      </TouchableOpacity>
    );
  }


  render() {
    const {
      tabs, onChangeTab, children,
    } = this.props;

    return (
      <Tabs
        ref={(ref) => { this.redTabs = ref; }}
        onChangeTab={onChangeTab}
        renderTabBar={this.renderTabBar}
      >
        {
          tabs.map((item) => {
            const { label } = item;

            return (
              <Tab
                key={label}
                heading={translate(label)}
                textStyle={styles.text}
                activeTextStyle={styles.activeText}
              >
                { children }
              </Tab>
            );
          })
        }
      </Tabs>
    );
  }
}

TripTabs.defaultProps = {
  tabs: [],
  onChangeTab: nullFunction,
  onStopListScroll: nullFunction,
  children: null,
};

TripTabs.propTypes = {
  tabs: PropTypes.array,
  onChangeTab: PropTypes.func,
  onStopListScroll: PropTypes.func,
  children: PropTypes.any,
};

export default TripTabs;
