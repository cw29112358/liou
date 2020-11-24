/**
*
* SettingSceneFeedBack Component
*
*/
/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reset } from 'redux-form/immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { sendContactUsEmail } from 'apis/strapi';

import {
  selectAuthUserInfo,
} from 'containers/AppRouter/selectors';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';

import FeedBackForm from 'forms/FeedBackForm';

import styles from './styles';
export class SettingSceneFeedBack extends React.Component {
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
      <FullScreenScene
        isLoading={!done}
        headerTitle="feedBack"
        contentProps={{
          keyboardDismissMode: styles.isIOS ? 'on-drag' : 'none',
          keyboardShouldPersistTaps: 'never',
        }}
        contentStyle={styles.content}
      >
        <TranslateText label="feedBackQuestions" style={styles.titleStyle} />
        <TranslateText label="feedBackText" style={styles.textStyle} numberOfLines={3} />
        <FeedBackForm onSubmit={this.onSubmitFeedBack} />
      </FullScreenScene>
    );
  }
}

SettingSceneFeedBack.defaultProps = {
  userInfo: {},
  resetForm: () => null,
};

SettingSceneFeedBack.propTypes = {
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
)(SettingSceneFeedBack);
