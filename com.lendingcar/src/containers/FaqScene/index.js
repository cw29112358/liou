/**
 *
 * FaqScene Container
 *
 */

import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Text,
  Icon,
  View,
} from 'native-base';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import AppHeader from 'components/AppHeader';

import { selectLanguage } from 'containers/AppRouter/selectors';

import {
  EN_FAQ_LIST,
  EN_CONTENT,
  ZH_FAQ_LIST,
  ZH_CONTENT,
} from './constants';
import styles from './styles';

export class FaqScene extends React.Component {
  openModal = (item) => {
    Actions.modal({
      children: this.getModalDetail(item),
    });
  }
  getModalDetail = (item) => (
    <View>
      <Text style={styles.title}>{item.label}</Text>
      <Text style={styles.text}>{EN_CONTENT[item.value]}</Text>
    </View>
  )

  renderList = () => (
    <List>
      {
        EN_FAQ_LIST
          .map((item) => (
            <ListItem
              key={item.value}
              onPress={() => this.openModal(item)}
              style={styles.listItem}
            >
              <Left>
                <Text style={styles.labelStyle} numberOfLines={1}>{item.label}</Text>
              </Left>
              <Right>
                <Icon name="ios-arrow-forward" style={styles.iconColor} />
              </Right>
            </ListItem>
          ))
      }
    </List>
  )

  openModalZH = (item) => {
    Actions.modal({
      children: this.getModalDetailZH(item),
    });
  }
getModalDetailZH = (item) => (
  <View>
    <Text style={styles.title}>{item.label}</Text>
    <Text style={styles.text}>{ZH_CONTENT[item.value]}</Text>
  </View>
)

renderListZH = () => (
  <List>
    {
      ZH_FAQ_LIST
        .map((item) => (
          <ListItem
            key={item.value}
            onPress={() => this.openModalZH(item)}
            style={styles.listItem}
          >
            <Left>
              <Text style={styles.labelStyle} numberOfLines={1}>{item.label}</Text>
            </Left>
            <Right>
              <Icon name="ios-arrow-forward" style={styles.iconColor} />
            </Right>
          </ListItem>
        ))
    }
  </List>
)

render() {
  const { language } = this.props;
  return (
    <Container>
      <AppHeader
        title="faq"
        hasRight={false}
        hiddenBorder
      />
      <Content style={styles.contentView}>
        { language === 'zh' ? this.renderListZH() : this.renderList() }
      </Content>
    </Container>
  );
}
}

FaqScene.defaultProps = {
};

FaqScene.propTypes = {
  language: PropTypes.string.isRequired,
};

const mapStateToProps = createPropsSelector({
  language: selectLanguage,
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(FaqScene);

// export default FaqScene;
