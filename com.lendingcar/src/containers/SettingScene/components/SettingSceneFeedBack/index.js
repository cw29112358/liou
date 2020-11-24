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
import { Container, Content } from 'native-base';

import { sendContactUsEmail } from 'apis/strapi';


import {
  selectAuthUserInfo,
} from 'containers/AppRouter/selectors';

import Feedback from 'components/Feedback';
import Loader from 'components/Loader';
import AppHeader from 'components/AppHeader';

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
      name: userInfo.firstName,
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
    const feedbackProps = {
      title: 'feedBackQuestions',
      textArray: [
        {
          label: 'feedBackText',
        },
      ],
      hasLink: false,
      titleStyle: styles.titleStyle,
      textStyle: styles.textStyle,
    };
    const { done } = this.state;
    return (
      <Container>
        { !done && <Loader /> }
        <AppHeader
          hasTitle
          hasShadow
          title="feedBack"
          titleStyle={styles.headerTitleStyle}
          iconName="ios-arrow-back"
          headerContainer={styles.headerContainer}
        />
        <Content
          keyboardDismissMode={styles.isIOS ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="never"
        >
          <Feedback {...feedbackProps}>
            <FeedBackForm onSubmit={this.onSubmitFeedBack} />
          </Feedback>
        </Content>
      </Container>
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
