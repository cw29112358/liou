/*
 *
 * ProfilePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { selectIsLoading } from 'containers/App/selectors';
import AccountLayout from 'components/AccountLayout';
import Loader from 'components/Loader';
import ProfileForm from 'forms/ProfileForm';
import messages from './messages';
import './style.scss';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render = () =>
    <div className="profile-page">
      <AccountLayout {...this.props} messages={messages} >
        <ProfileForm {...this.props} />
      </AccountLayout>
      { this.props.isLoading && <Loader isLoadImg={false} /> }
    </div>;
}

ProfilePage.defaultProps = {
  menuKey: 'profile',
  helmetContent: 'Description of ProfilePage',
};

ProfilePage.propTypes = {
  isLoading: PropTypes.bool,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
