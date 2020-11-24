/**
 *
 * FaqScene Container
 *
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Right,
  View,
  Icon,
} from 'native-base';

import AppHeader from 'components/AppHeader';

import ServiceItem from './components/ServiceItem';
import RentingStrategy from './components/RentingStrategy';
import RentingInsurance from './components/RentingInsurance';
import NewbieGuide from './components/NewbieGuide';

import { ZH_FAQ_LIST } from './constants';

import styles from './styles';

export class FaqScene extends React.Component {
  onSelectItem = (item) => {
    Actions.modal({
      children: this.renderChilden(item),
      scrollEnabled: true,
    });
  }

  renderChilden = (item) => {
    switch (item.value) {
      case 'service':
        return <ServiceItem item={item} />;
      case 'strategy':
        return <RentingStrategy item={item} />;
      case 'insurance':
        return <RentingInsurance item={item} />;
      case 'guide':
        return <NewbieGuide item={item} />;
      default:
        return null;
    }
  }
  renderItems = () => {
    const dataSource = ZH_FAQ_LIST;
    return dataSource.map((item, index) => {
      const itemStyle = [styles.listItem];
      if (index === dataSource.length - 1) itemStyle.push(styles.lastItem);

      return (
        <ListItem
          key={item.value}
          onPress={() => this.onSelectItem(item)}
          style={itemStyle}
        >
          <Left>
            <Text style={styles.labelStyle} numberOfLines={1}>{item.label}</Text>
          </Left>
          <Right>
            <Icon name="ios-arrow-forward" style={styles.iconColor} />
          </Right>
        </ListItem>
      );
    });
  }
  renderContent = () => (
    <View style={styles.contentView}>
      <List style={styles.list}>
        {this.renderItems()}
      </List>
    </View>
  )
  render() {
    return (
      <Container>
        <AppHeader
          title="faq"
          hasRight={false}
          hiddenBorder
        />

        <Content>
          {this.renderContent()}
        </Content>
      </Container>
    );
  }
}

FaqScene.defaultProps = {
};

FaqScene.propTypes = {
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(FaqScene);
