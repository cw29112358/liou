/**
 *
 * MemberBenefitScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { ImageBackground } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import LuxuryCarBgImage from 'assets/luxuryCar.png';

import { selectUserCouponsStatus } from 'containers/MemberScene/selectors';
import AppHeader from 'components/AppHeader';

import MemberCard from './components/MemberCard';

import {
  loadBenefitsAction,
  loadUserAppointmentAction,
} from './actions';
import {
  selectMemberBenefitsData,
  // selectUserAppointments,
  selectSuperCarAppointment,
  selectPickupAppointment,
  // selectisLoading,
} from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class MemberBenefitScene extends React.Component {
  // TODO: 卡片加载特效
  // state = {
  //   isShowCard: false,
  // }
  componentWillMount() {
    const { loadBenefits, loadUserAppointment } = this.props;
    loadBenefits();
    loadUserAppointment();
  }

  getPrivilege() {
    const { privilege } = this.props;
    const titleKeys = {
      supercar: ['superCarTitle', 'freeHourTitle'],
      pickup: ['truckTitle', 'freeTimesTitle'],
    };
    const titleKey = titleKeys[privilege.type];

    return {
      ...privilege,
      ...{
        headTitle: translate(titleKey[0]),
        freeTitle: translate(titleKey[1]),
      },
    };
  }
  renderTitle = (privilege) => (
    <View style={styles.titleWrappper}>
      <Text style={styles.largeFont}>{privilege.headTitle}</Text>
      <Text style={styles.largeFont}>{privilege.freeTitle}</Text>
      <Text style={styles.smallFont}>{translate('onlyMember')}</Text>
    </View>
  )
  render() {
    const {
      authUserMembership: { isMembership }, memberCardInfo, userCoupons,
      benefitsData, supercarAppointment, pickupAppointments,
    } = this.props;

    const privilege = this.getPrivilege();
    const appoinments = privilege.type === 'supercar' ? supercarAppointment : pickupAppointments;
    const carList = benefitsData[privilege.type];
    return (
      <Container>
        <AppHeader title={privilege.text} />

        <Content scrollEnabled={false}>
          <ImageBackground source={LuxuryCarBgImage} style={styles.bgImage}>
            {this.renderTitle(privilege)}
            <MemberCard
              isMembership={isMembership}
              privilege={privilege}
              appoinments={appoinments}
              memberCardInfo={memberCardInfo}
              list={carList}
              userCoupons={isMembership ? userCoupons[privilege.type] : null}
            />
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

MemberBenefitScene.defaultProps = {
  authUserMembership: {},
  privilege: {},
  memberCardInfo: null,
  userCoupons: null,
  benefitsData: null,
  // appointments: [],
  supercarAppointment: [],
  pickupAppointments: [],
  // isLoading: false,
  loadBenefits: () => null,
  loadUserAppointment: () => null,
};

MemberBenefitScene.propTypes = {
  authUserMembership: PropTypes.object,
  privilege: PropTypes.object,
  memberCardInfo: PropTypes.any,
  userCoupons: PropTypes.object,
  benefitsData: PropTypes.object,
  // appointments: PropTypes.array,
  supercarAppointment: PropTypes.array,
  pickupAppointments: PropTypes.array,
  // isLoading: PropTypes.bool,
  loadBenefits: PropTypes.func,
  loadUserAppointment: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  userCoupons: selectUserCouponsStatus,
  benefitsData: selectMemberBenefitsData,
  // appointments: selectUserAppointments,
  supercarAppointment: selectSuperCarAppointment,
  pickupAppointments: selectPickupAppointment,
  // isLoading: selectisLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadBenefits: () => dispatch(loadBenefitsAction()),
  loadUserAppointment: () => dispatch(loadUserAppointmentAction()),
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'memberBenefitScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MemberBenefitScene);
