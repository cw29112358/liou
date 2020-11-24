/**
*
* PreferentialContrast Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  View,
  Button,
  Text,
} from 'native-base';

import arrowImage from 'assets/arrow.png';

import DetailPartTitle from '../DetailPartTitle';
import {
  LEFT_GROUP_LESS, LEFT_GROUP_MORE,
  RIGHT_GROUP_LESS, RIGHT_GROUP_MORE,
  LEFT_GROUP_CONTINUE, RIGHT_GROUP_CONTINUE,
} from './constants';
import styles from './styles';

class PreferentialContrast extends React.Component { // eslint-disable-line
  state = {
    isShowMore: false,
  }

  changeListLength = () => {
    const { isShowMore } = this.state;
    this.setState({ isShowMore: !isShowMore });
  }

  renderContrastTitle = () => (
    <View style={styles.contrastTitleLine}>
      <View style={styles.contrastLeftTag}>
        <Text style={styles.lendingCarText}>{translate('lendingCar')}</Text>
      </View>
      <View style={styles.contrastRightTag}>
        <Text style={styles.buyCarText}>{translate('buyACar')}</Text>
      </View>
    </View>
  );
  renderVS = () => (
    <View style={styles.ellipse}>
      <View style={styles.textView}>
        <Text style={styles.VSText}>VS</Text>
      </View>
    </View>
  )
  renderDefaultList = (leftGroup, rightGroup, isShowPrice) => {
    const { carInfo } = this.props;
    const itemLeft = {
      itemGroup: leftGroup,
      isShowPrice,
      price: carInfo.depositPrice,
      itemStyle: styles.leftText,
      isShowBlankLine: false,
    };
    const itemRight = {
      itemGroup: rightGroup,
      isShowPrice,
      price: carInfo.price,
      itemStyle: styles.rightText,
      isShowBlankLine: true,
    };
    return (
      <View style={styles.cardPart}>
        { this.renderListItemContent(itemLeft) }
        <View style={styles.vertical} />
        { this.renderListItemContent(itemRight) }
      </View>
    );
  }
  renderListItemContent = (item) => (
    <View style={styles.cardPartContent}>
      {item.isShowPrice
          && <Text style={item.itemStyle}>{translate('itemDeposit')} {translate(item.price, 'dollar')}</Text>
      }
      { this.renderText(item)}
    </View>
  )
  renderText = (item) => item.itemGroup.map((itemString, index) => {
    const key = `${itemString}_${index}`;
    const showBlankLine = item.isShowBlankLine && index === 3;
    return <Text style={item.itemStyle} key={key}>{translate(itemString)} {showBlankLine && '\n'}</Text>;
  })
  renderButton = () => {
    const { isShowMore } = this.state;
    const buttonLabel = isShowMore ? 'viewLess' : 'viewMore';
    const arrowImageStyles = [styles.arrowImage];
    if (isShowMore) {
      arrowImageStyles.push(styles.lessArrowImage);
    }
    return (
      <Button style={styles.button} onPress={this.changeListLength}>
        <Text style={styles.text}>{translate(buttonLabel)}</Text>
        <Image source={arrowImage} style={arrowImageStyles} />
      </Button>
    );
  }


  render() {
    const { isShowMore } = this.state;
    let leftGroup = LEFT_GROUP_LESS;
    let rightGroup = RIGHT_GROUP_LESS;
    let leftGroupContinue = [];
    let rightGroupContinue = [];
    if (isShowMore) {
      leftGroup = LEFT_GROUP_LESS.concat(LEFT_GROUP_MORE);
      rightGroup = RIGHT_GROUP_LESS.concat(RIGHT_GROUP_MORE);
      leftGroupContinue = LEFT_GROUP_CONTINUE;
      rightGroupContinue = RIGHT_GROUP_CONTINUE;
    }
    return (
      <View style={styles.content}>
        <DetailPartTitle title="whatIsLendingCar" />
        <View style={styles.contrast}>
          <View style={styles.cardView}>
            { this.renderDefaultList(leftGroup, rightGroup, true) }
            { isShowMore && <Text style={styles.cardPartTitle}>{translate('oneYear')}</Text> }
            { this.renderDefaultList(leftGroupContinue, rightGroupContinue, false) }
            { this.renderButton() }
          </View>
          { this.renderContrastTitle() }
          { this.renderVS() }
        </View>
      </View>
    );
  }
}

PreferentialContrast.defaultProps = {
  carInfo: null,
};

PreferentialContrast.propTypes = {
  carInfo: PropTypes.object,
};

export default PreferentialContrast;
