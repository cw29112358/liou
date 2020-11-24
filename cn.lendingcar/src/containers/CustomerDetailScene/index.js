/**
 *
 * CustomerDetailScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
// import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
  View,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import AppHeader from 'components/AppHeader';
import AvatarListItem from 'components/AvatarListItem';
import InfoList from 'components/InfoList';

import { selectTest } from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class CustomerDetailScene extends React.Component { // eslint-disable-line
  renderAvatarListItem = () => {
    const { customerInfo } = this.props;
    const dataInfo = {
      avatarUrl: customerInfo.logo ? customerInfo.logo.url : '',
      bodyTopText: `${customerInfo.firstName} ${customerInfo.lastName}`,
      bodyBottomText: translate(customerInfo.membershipLevel),
      rightTopText: `$${customerInfo.parentCommissionFee}`,
      rightBottomText: translate('received'),
    };
    return (
      <AvatarListItem
        dataInfo={dataInfo}
        listItemStyle={styles.listItemStyle}
        rightTopStyle={styles.rightTopStyle}
      />
    );
  }
  renderInfoList = (list, viewStyle) => (
    <InfoList
      list={list}
      viewStyle={viewStyle}
    />
  )
  render() {
    const { customerInfo } = this.props;
    const list = [
      {
        keyLabel: 'membershipSince',
        valueText: customerInfo.membershipSince,
        itemStyle: styles.itemStyle,
      },
      {
        keyLabel: 'referralId',
        valueText: customerInfo.refId,
        itemStyle: styles.itemStyle,
      },
      {
        keyLabel: 'rate',
        valueText: customerInfo.commissionRate,
        itemStyle: styles.itemStyle,
      },
      {
        keyLabel: 'customerCount',
        valueText: customerInfo.customerCount,
        itemStyle: styles.itemStyle,
      },
    ];
    const otherList = [
      {
        keyLabel: 'createdDate',
        valueText: customerInfo.createdDate,
        itemStyle: styles.itemStyle,
      },
      {
        keyLabel: 'referredDate',
        valueText: customerInfo.referredDate,
        itemStyle: styles.itemStyle,
      },
      {
        keyLabel: 'phone',
        valueText: customerInfo.phoneNumber,
        itemStyle: styles.itemStyle,
      },
      {
        keyLabel: 'email',
        valueText: customerInfo.email,
        itemStyle: styles.itemStyle,
      },
    ];
    return (
      <Container>
        <AppHeader title="customerDetails" />

        <Content
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
        >
          <View style={styles.AvatarListStyle}>
            { this.renderAvatarListItem() }
          </View>
          { this.renderInfoList(list, styles.infoListStyle) }
          <View style={styles.divisionLine}></View>
          { this.renderInfoList(otherList, styles.infoListOtherStyle) }
        </Content>
      </Container>
    );
  }
}

CustomerDetailScene.defaultProps = {
  customerInfo: {},
};

CustomerDetailScene.propTypes = {
  customerInfo: PropTypes.object,
};

const mapStateToProps = createPropsSelector({
  test: selectTest,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'customerDetailScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(CustomerDetailScene);
