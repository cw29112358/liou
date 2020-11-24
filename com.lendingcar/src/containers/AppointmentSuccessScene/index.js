/**
 *
 * AppointmentSuccessScene Container
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
  Text,
  View,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { momentFormat } from 'utils/helpers';

import { selectMemberBenefitsData } from 'containers/MemberBenefitScene/selectors';

import FullScreenScene from 'components/FullScreenScene';
import InfoList from 'components/InfoList';
import CarInfo from 'components/CarInfo';

// ./
// import {} from './constants';
import {
  selectAppointment,
  // selectIsLoading,
} from './selectors';
import { loadAppointmentAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class AppointmentSuccessScene extends React.Component {
  componentWillMount() {
    const { loadAppointment, messageId } = this.props;
    loadAppointment(messageId);
  }

  getCarInfo = () => {
    const { appointment: { type, detail }, carInfo, benefitsData } = this.props;
    const model = detail.name;
    let findCar = carInfo;

    if (!findCar) {
      findCar = benefitsData[type]
        .find((item) => item.name === model) || {};
    }

    const carTypes = {
      supercar: 'supercar',
      pickup: 'areaPrivilege2',
    };
    const carType = translate(carTypes[type]);
    return {
      model,
      carType,
      images: [{ uri: findCar.image }],
      isLocal: true,
      hideWatermark: false,
      imageStyle: findCar.carImageStyle,
    };
  };

  renderPickupList() {
    const { appointment } = this.props;
    const list = [
      {
        keyLabel: 'address',
        valueText: appointment.address,
      },
      {
        keyLabel: 'name',
        valueText: appointment.name,
      },
      {
        keyLabel: 'phone',
        valueText: appointment.phoneNumber,
      },
      {
        keyLabel: 'email',
        valueText: appointment.email,
      },
      {
        keyLabel: 'drivingDate',
        valueText: momentFormat(appointment.date),
      },
    ];

    return (
      <InfoList
        titleLabel="bookingDetail"
        list={list}
      />
    );
  }
  renderNotice() {
    let noticeList = [
      'appointmentNoticeLine1',
      'appointmentNoticeLine2',
      'appointmentNoticeLine3',
      'appointmentNoticeLine4',
      'appointmentNoticeLine5',
    ];
    noticeList = noticeList.map((item) => (
      {
        children: (
          <Text style={styles.noticeText}>{ translate(item) }</Text>
        ),
      }
    ));

    return (
      <InfoList
        titleLabel="notice"
        list={noticeList}
        viewStyle={styles.noticeView}
      />
    );
  }

  render() {
    const { appointment } = this.props;
    return (
      <FullScreenScene
        headerTitle="appointmentSuccess"
        contentProps={{
          bounces: false,
        }}
      >
        {JSON.stringify(appointment) !== '{}' && (
          <CarInfo carInfo={this.getCarInfo()}>
            { this.renderPickupList() }
            <View style={styles.greySeperate} />
            { this.renderNotice() }
          </CarInfo>
        )}
      </FullScreenScene>
    );
  }
}

AppointmentSuccessScene.defaultProps = {
  carInfo: undefined,
  // isLoading: false,
  appointment: null,
  benefitsData: null,
  messageId: '',
  loadAppointment: () => null,
};

AppointmentSuccessScene.propTypes = {
  carInfo: PropTypes.object,
  // isLoading: PropTypes.bool,
  appointment: PropTypes.object,
  benefitsData: PropTypes.object,
  messageId: PropTypes.string,
  loadAppointment: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  appointment: selectAppointment,
  // isLoading: selectIsLoading,
  benefitsData: selectMemberBenefitsData,
});

const mapDispatchToProps = (dispatch) => ({
  loadAppointment: (id) => dispatch(loadAppointmentAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appointmentSuccessScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(AppointmentSuccessScene);
