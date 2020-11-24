/**
 *
 * LeaseTypeScene Container
 *
 */

/* global translate */

import React from 'react';
// import PropTypes from 'prop-types';
// import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import {
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Container,
  Content,
  Text,
  View,
} from 'native-base';

// utils => ... => containers => components => form
import injectReducer from 'utils/injectReducer';

import { selectTest } from './selectors';
// import { defaultAction } from './actions';
import reducer from './reducer';

import {
  TITLE_LEASETYPE,
  FOOTER_LEASETYPETIPS,
  LEASETYPECARDS,
} from './constants';
import styles from './styles';

export class LeaseTypeScene extends React.Component { // eslint-disable-line
  renderTitle = () => (
    <View style={styles.topTitle}>
      <Text style={styles.title}>{translate(TITLE_LEASETYPE)}</Text>
    </View>
  )
  renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.text}>{translate(FOOTER_LEASETYPETIPS)}</Text>
    </View>
  )
  renderContent = () => (
    <View style={styles.carPart}>
      {this.renderLeaseTypeCard()}
    </View>
  )
  // 短租和长租卡片
  renderLeaseTypeCard = () => LEASETYPECARDS.map((type) => (
    <View key={type.key} style={styles.contentView}>
      <TouchableOpacity onPress={type.action}>
        <View style={styles.typeContent}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.carTitle}>
              {translate(type.key)}
            </Text>
            {type.tips ? <View><Text style={styles.tips}>{translate(type.tips)}</Text></View> : null}
          </View>
          <Text style={styles.carDesc}>{translate(type.desc)}</Text>
          <Image style={styles.images} source={type.imgname} resizeMode="contain" />
        </View>
      </TouchableOpacity>
    </View>
  ))
  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
        >
          {this.renderTitle()}
          {this.renderContent()}
          {this.renderFooter()}
        </Content>
      </Container>
    );
  }
}

LeaseTypeScene.defaultProps = {
  test: '',
};

// 父级props
// 自身 mapStateToProps => other selectors => self selectors
// 自身 mapDispatchToProps
LeaseTypeScene.propTypes = {
};

const mapStateToProps = createPropsSelector({
  // write your code like this
  test: selectTest,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'leaseTypeScene', reducer });

export default compose(
  withReducer,
  withConnect,
)(LeaseTypeScene);
