/**
*
* AprList Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import DisplayColumn from 'components/DisplayColumn';

import styles from './styles';

const { deviceWidth } = styles;

class AprList extends React.Component {
  contentOffsetX = 0;
  itemWidth = 125.5;

  onPressItem = (setInterestRate, interestRate, index, layoutKey) => {
    const { x } = this[layoutKey];
    const diffX = deviceWidth - x + this.contentOffsetX;

    if (index === 0) {
      this.contentRef.scrollTo({ x: 0, y: 0 }, false);
    } else if (index === 4) {
      this.contentRef.scrollToEnd(false);
    } else if (diffX < this.itemWidth || this.contentOffsetX > x) {
      this.contentRef.scrollTo({ x: x - this.itemWidth - 10, y: 0 }, false);
    }

    setInterestRate(interestRate);
  }
  onLayoutItem = (e, layoutKey) => {
    this[layoutKey] = e.nativeEvent.layout;
  }

  componentRef = (ref) => {
    this.contentRef = ref;
  }
  onScrollComponent = (event) => {
    this.contentOffsetX = event.nativeEvent.contentOffset.x;
  }

  render() {
    const { interestRate, setInterestRate } = this.props;

    let aprList = [10, 15, 20, 25, 30];
    aprList = aprList.map((num, index) => {
      const viewStyle = [styles.aprItem];
      const keyStyle = [styles.aprKey];
      const valueStyle = [styles.aprValue];

      const numInterestRate = num * 0.01;
      const isActive = interestRate === numInterestRate;
      if (isActive) viewStyle.push(styles.aprItemActive);
      if (num === 30) viewStyle.push({ marginRight: 30 });
      if (isActive) keyStyle.push(styles.aprKeyActive);
      if (isActive) valueStyle.push(styles.aprValueActive);

      const layoutKey = `itemLayout${index}`;

      return {
        itemComponent: TouchableOpacity,
        onPress: () => this.onPressItem(setInterestRate, numInterestRate, index, layoutKey),
        key: `apr${num}Key`,
        value: `apr${num}Value`,
        viewStyle,
        keyStyle,
        valueStyle,
        onLayout: (e) => this.onLayoutItem(e, layoutKey),
      };
    });

    return (
      <DisplayColumn
        component={ScrollView}
        list={aprList}
        style={styles.aprList}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        componentRef={this.componentRef}
        onScroll={this.onScrollComponent}
      />
    );
  }
}

AprList.defaultProps = {
  interestRate: 0.1,
  setInterestRate: () => null,
};

AprList.propTypes = {
  interestRate: PropTypes.number,
  setInterestRate: PropTypes.func,
};

export default AprList;
