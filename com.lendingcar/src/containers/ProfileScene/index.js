/**
 *
 * ProfileScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { selectIsLoading } from 'containers/AppRouter/selectors';

import FormScene from 'components/FormScene';

import ProfileForm from 'forms/ProfileForm';

export class ProfileScene extends React.Component {
  state = {
    showNull: true,
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ showNull: false });
    }, 1);
  }

  render() {
    const { isLoading } = this.props;
    const { showNull } = this.state;

    return (
      <FormScene
        title="personalCenter"
        isLoading={showNull || isLoading}
        component={showNull ? undefined : ProfileForm}
        alertTitle="profileSaveTitle"
        alertMessage="profileSave"
      />
    );
  }
}

ProfileScene.defaultProps = {
};

ProfileScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(ProfileScene);
