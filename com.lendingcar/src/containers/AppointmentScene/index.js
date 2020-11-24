/**
 *
 * AppointmentScene Container
 *
 */
/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { selectIsLoading } from 'containers/AppRouter/selectors';

import FullScreenScene from 'components/FullScreenScene';
import AppointmentForm from 'forms/AppointmentForm';

import Card from './components/Card';

function AppointmentScene(props) {
  const {
    isLoading, carInfo, privilege, ...otherProps
  } = props;
  const leftPress = () => {
    window.alert(
      'appointmentAlertTitle',
      'appointmentAlertMessage',
      [
        {
          text: 'confirm',
          onPress: () => Actions.pop(),
        },
        {
          text: 'cancel',
          onPress: () => null,
        },
      ],
    );
  };
  return (
    <FullScreenScene
      headerTitle={`${privilege.type}Appointment`}
      isLoading={isLoading}
      headerProps={{ leftPress }}
    >
      <Card carInfo={carInfo} privilege={privilege} />
      <AppointmentForm privilege={privilege} carInfo={carInfo} {...otherProps} />
    </FullScreenScene>
  );
}

AppointmentScene.defaultProps = {
};

AppointmentScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  carInfo: PropTypes.object.isRequired,
  privilege: PropTypes.object.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(AppointmentScene);
