/**
*
* MyConnectionScene Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import chunk from 'lodash/chunk';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Image,
  SectionList,
  Animated,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import {
  View,
  Icon,
  Text,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  getUserLogoUrl,
} from 'utils/helpers';

import FullScreenScene from 'components/FullScreenScene';
import Avatar from 'components/Avatar';

import reducer from './reducer';
import sagas from './sagas';
import {
  loadConnectionsAction,
  loadRecommendsAction,
} from './actions';
import {
  selectIsLoading,
  selectMyConnectionGroup,
} from './selectors';
import addPersonImage from './assets/addPerson.png';
import {
  GROUP_IMAGES,
} from './constants';
import styles from './styles';

class MyConnectionScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);

    this.state = {
      arrowStatus: this.initArrowStatus(props.connectionGroup),
    };
  }
  componentWillMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    this.loadConnections();
    this.loadRecoments();
  }
  loadConnections = () => {
    const { loadConnections } = this.props;
    loadConnections({ forceReload: true });
  }
  loadRecoments = () => {
    const { loadRecommends } = this.props;
    loadRecommends();
  }
  onPressArrow = (key) => {
    const { arrowStatus, arrowStatus: { [key]: { deg, isShow } } } = this.state;
    this.setState({
      arrowStatus: {
        ...arrowStatus,
        [key]: {
          deg,
          isShow: !isShow,
        },
      },
    });
    Animated.timing(deg, {
      toValue: isShow ? 0 : 1,
      duration: 100,
    }).start();
  }

  initArrowStatus = (obj) => (
    Object.keys(obj)
      .reduce((result, key) => {
        result[key] = { //eslint-disable-line
          deg: new Animated.Value(0),
          isShow: false,
        };
        return result;
      }, {})
  )
  getListSections = (connectionGroup, arrowStatus) => (
    Object.entries(connectionGroup)
      .map(([key, list]) => ({
        key,
        title: key,
        data: arrowStatus[key].isShow ? chunk(list, 2) : [],
        dataLength: list.length,
        arrowStyle: this.getArrowStyles(arrowStatus, key),
      }))
  );
  getArrowStyles = (arrowStatus, key) => {
    const { [key]: { deg } } = arrowStatus;
    const rotateZ = deg.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });
    return {
      transform: [{ rotateZ }],
    };
  }

  addFriends = () => {
    Actions.push('addConnection');
  }
  goToProfile = (itemContent) => {
    Actions.push('profile', { profile: itemContent });
  }

  renderChatHeaderLeft = ({ title, dataLength }) => (
    <View style={styles.chatItemLeft}>
      <Image source={GROUP_IMAGES[title]} style={styles.chatImage} />
      <Text style={styles.chatLabel}>{translate(title)}（{dataLength}）</Text>
    </View>
  )
  renderChatHeaderRight = ({ arrowStyle }) => (
    <Animated.View style={arrowStyle}>
      <Icon name="ios-arrow-forward" style={styles.forwardIcon} />
    </Animated.View>
  )
  renderChatHeader = ({ section }) => {
    const chatHeaderStyles = [styles.chatHeaderContent];
    const chatItemStyles = [styles.chatItem];
    if (section.data.length > 0) {
      chatHeaderStyles.push(styles.chatHeaderShadow);
      chatItemStyles.push(styles.chatItemIsShown);
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => { this.onPressArrow(section.title); }}
      >
        {/* 双 View 原因
          1. 当粘性 header 位于 ScrollView 顶部时，遮罩其下的内容
          2. 根据设计下划线距屏幕左侧有边距
          */}
        <View style={chatHeaderStyles}>
          <View style={chatItemStyles}>
            { this.renderChatHeaderLeft(section) }
            { this.renderChatHeaderRight(section) }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderConnectionCard = ({ item }) => (
    <View style={styles.listContent}>
      {
        item.map((itemContent) => (
          <TouchableWithoutFeedback
            key={itemContent.id}
            onPress={() => this.goToProfile(itemContent)}
          >
            <View style={styles.connectionCard}>
              <Avatar url={getUserLogoUrl(itemContent.avatar)} avatarStyle={styles.avatar} />
              <Text style={styles.name}>{itemContent.verifiedName || itemContent.username}
                <Text style={styles.position}>/{itemContent.verifiedOccupation}</Text>
              </Text>
              <Text style={styles.company}>{itemContent.verifiedCompany}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))
      }
    </View>
  )
  renderSectionList = (isLoading, connectionGroup, arrowStatus) => (
    <SectionList
      stickySectionHeadersEnabled
      renderItem={this.renderConnectionCard}
      renderSectionHeader={this.renderChatHeader}
      sections={this.getListSections(connectionGroup, arrowStatus)}
      keyExtractor={(item, index) => item + index}
      extraData={arrowStatus}
      refreshControl={(
        <RefreshControl
          refreshing={isLoading}
          onRefresh={this.onRefresh}
          title={translate('loading')}
        />
      )}
    />
  )

  render() {
    const { isLoading, connectionGroup } = this.props;
    const { arrowStatus } = this.state;

    return (
      <FullScreenScene
        headerTitle="connection"
        scrollEnabled={false}
        contentContainerStyle={styles.content}
        headerProps={{
          hasLeft: false,
          hasRight: true,
          rightPress: this.addFriends,
          rightImage: addPersonImage,
          rightIconStyle: styles.connectionRightIcon,
        }}
      >
        { this.renderSectionList(isLoading, connectionGroup, arrowStatus) }
      </FullScreenScene>
    );
  }
}

MyConnectionScene.defaultProps = {
};

MyConnectionScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  connectionGroup: PropTypes.object.isRequired,
  loadConnections: PropTypes.func.isRequired,
  loadRecommends: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
  connectionGroup: selectMyConnectionGroup,
});

const mapDispatchToProps = (dispatch) => ({
  loadConnections: (params) => dispatch(loadConnectionsAction(params)),
  loadRecommends: () => dispatch(loadRecommendsAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'myConnectionScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MyConnectionScene);
