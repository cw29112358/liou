/**
*
* FeedBackScene Component
*
*/
/* global window  */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reset } from 'redux-form/immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { sendContactUsEmail } from 'apis/strapi';
import { selectAuthUserInfo } from 'containers/AppRouter/selectors';
import FormScene from 'components/FormScene';
import FeedBackForm from 'forms/FeedBackForm';

export class FeedBackScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: true,
    };
  }
  onSubmitFeedBack = (formData) => {
    const { userInfo } = this.props;
    const formObject = {
      email: userInfo.email,
      firstName: userInfo.firstName,
      phoneNumber: userInfo.phoneNumber,
      message: formData.get('message'),
    };

    this.setState({ done: false });
    sendContactUsEmail(formObject)
      .then(() => {
        this.onSubmitFeedBackSuccess();
        window.alert('feedBackSuccessTitle', 'feedBackSuccessMessage');
      })
      .catch(() => {
        window.alert('feedBackErrorTitle', 'feedBackErrorMessage');
      });
  }
  onSubmitFeedBackSuccess() {
    const { resetForm } = this.props;
    this.setState({ done: true });
    resetForm();
  }

  render() {
    const { done } = this.state;
    return (
      <FormScene
        isLoading={!done}
        headerTitle="feedBack"
        scrollEnabled={false}
        component={FeedBackForm}
        onSubmit={this.onSubmitFeedBack}
      />
    );
  }
}

FeedBackScene.defaultProps = {
  userInfo: {},
  resetForm: () => null,
};

FeedBackScene.propTypes = {
  userInfo: PropTypes.object,
  resetForm: PropTypes.func,
};
const mapStateToProps = createPropsSelector({
  userInfo: selectAuthUserInfo,
});

const mapDispatchToProps = (dispatch) => ({
  resetForm: () => dispatch(reset('feedBackForm')),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(FeedBackScene);
