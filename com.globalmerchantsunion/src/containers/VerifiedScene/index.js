/**
 *
 * VerifiedScene Stateless Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  selectIsLoading,
} from 'containers/AppRouter/selectors';

import FormScene from 'components/FormScene';

import Verified from 'forms/VerifiedForm';

function VerifiedScene(props) {
  const { isLoading } = props;

  return (
    <FormScene
      validBack={false}
      hasRight={false}
      title="userVerification"
      isLoading={isLoading}
      component={Verified}
    />
  );
}

VerifiedScene.defaultProps = {
};

VerifiedScene.propTypes = {
};

VerifiedScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(VerifiedScene);
