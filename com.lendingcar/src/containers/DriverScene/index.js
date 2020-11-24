/**
 *
 * DriverScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { selectIsLoading } from 'containers/AppRouter/selectors';

import FormScene from 'components/FormScene';

import DriverForm from 'forms/DriverForm';

const DriverScene = (props) => {
  const { isLoading } = props;
  return (
    <FormScene
      title="driverTitle"
      isLoading={isLoading}
      component={DriverForm}
      scrollEnabled={false}
      alertTitle="driverSaveTitle"
      alertMessage="driverSave"
    />
  );
};

DriverScene.defaultProps = {
  isLoading: false,
};

DriverScene.propTypes = {
  isLoading: PropTypes.bool,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(DriverScene);
