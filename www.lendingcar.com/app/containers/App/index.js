/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { push } from 'react-router-redux';
import { injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import * as _ from 'lodash';
import classNames from 'classnames';
import { Button } from 'antd';
import TranslatedMessage from 'components/TranslatedMessage';

import * as FirebaseApi from 'apis/firebase';
import { getSameBoolean, getCurrentRoute } from 'utils/helpers';
import { FAQ_LINK } from 'utils/constants';

import NavBar from 'components/NavBar';
import Loader from 'components/Loader';
import Footer from 'components/Footer';
import MobileSideBar from 'components/MobileSideBar';
import ModalFramework from 'components/ModalFramework';
import { selectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectAuthUserInfo,
  selectIsLoggedIn,
  selectAuthUserId, selectIsLogoutDone,
  selectSignUpForm,
  selectIsLimited, selectIsHome, selectRedirectUrl } from 'containers/App/selectors';
import { changeLocaleAction } from 'containers/LanguageProvider/actions';
import { updateSignUpFormAction, logoutByUserAction,
  loggedInByUserAction, showProfileModalAction, loadAreaConfigAction,
} from 'containers/App/actions';
import './style.scss';
import messages from './messages';

const surveyLink = 'https://www.surveymonkey.com/r/WJHYS79';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const isShowSurvey = localStorage.getItem('isShowSurvey');
    this.state = {
      sideBarOpen: false,
      navbarFixed: false,
      isLanding: true,
      isShowSurveyModal: isShowSurvey === 'true',
    };
  }
  componentWillMount() {
    const path = this.props.location.pathname;
    if (path !== '/') this.setState({ isLanding: false });
    else this.setState({ isLanding: true });
    this.props.loadAreaConfig();
  }
  componentDidMount() {
    try {
      window.Intercom('update', {
        referralCode: window.localStorage.referralCode,
        locale: window.localStorage.DEFAULT_LOCALE,
      });
    } catch (e) {
      window.alert('Error', 'Please note, lendingcar.com will not work properly under Privacy Mode.\n\n温馨提示：LendingCar网站在隐私浏览模式下将无法提供最好的服务。', 'error'); // eslint-disable-line no-alert
    }

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.refreshSecurityToken();
      this.securityTimer = setInterval(this.refreshSecurityToken, (1000 * 60 * 50));
    }

    if (isMobile) window.addEventListener('scroll', this.onScroll);
  }
  componentWillReceiveProps(nextProps) {
    const nextPath = nextProps.location.pathname;
    if (nextPath !== '/') this.setState({ isLanding: false });
    else this.setState({ isLanding: true });
  }
  componentWillUnmount() {
    if (isMobile) window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (this.state.navbarFixed && scrollTop < 80) {
      this.setState({
        navbarFixed: false,
      });
    } else if (!this.state.navbarFixed && scrollTop > 80) {
      this.setState({
        navbarFixed: true,
      });
    }
  };
  onClickBack = () => {
    const { linkTo, routes, router } = this.props;
    const parents = _.last(routes).parents;
    if (!parents || !parents.length) return linkTo('/');

    const parentName = _.last(parents);
    if (parentName === 'carPage') return router.goBack();

    const parentRoute = getCurrentRoute(routes[0].childRoutes, parentName);
    return linkTo(parentRoute.path);
  };

  refreshSecurityToken = () => {
    FirebaseApi.initAuth()
      .then((user) => {
        if (user) {
          if (!getSameBoolean(user.emailVerified)) {
            // TODO: email not verified error message
            window.alert('Warning', 'Email is not verified, please contact support', 'info'); // TODO: why this.container is undefined
          }
          this.props.loggedIn(user);
        } else {
          this.props.logout();
        }
        return user;
      });
  }
  refreshMobileStatus = () => {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  }
  changeLocaleLanguage = () => {
    const newLocale = (this.props.locale === 'en') ? 'zh' : 'en';
    this.props.changeLocale(newLocale);
  };

  showLinkAndRefreshMobileSideBar = (fn) => () => {
    fn();
    this.refreshMobileStatus();
  }
  showProfile = () => {
    this.props.showProfileModal(this.props.authUserId);
    this.props.linkTo('/profile');
  };
  showMyTrip = () => {
    this.props.linkTo('/myTrip');
  };
  showMyDocuments = () => {
    this.props.linkTo('/myDocuments');
  };
  showChangePassword = () => {
    this.props.linkTo('/changePassword');
  };
  showLogin = () => {
    this.props.linkTo('/login');
  }
  showSignUp = () => {
    this.props.linkTo('/signUp');
  };
  showSurveyModal = () => {
    this.setState({
      isShowSurveyModal: true,
    });
  }
  hideSurveyModal = () => {
    this.setState({
      isShowSurveyModal: false,
    });
  }
  hideSurvey = () => {
    localStorage.setItem('isShowSurvey', false);
    this.setState({
      isShowSurveyModal: false,
    });
  }
  enterSurvey = () => {
    window.open(surveyLink, '_blank');
  }
  renderNavBar() {
    const { locale } = this.props;
    const faq = (locale === 'en') ? FAQ_LINK.en : FAQ_LINK.zh;
    const lanText = (locale === 'en') ? '中文' : 'English';
    return (
      <div>
        <a role="button" className="scrollToTop">
          <i className="material-icons keyboard-arrow-up 48dp"></i>
        </a>
        <NavBar
          isFixed={this.state.navbarFixed}
          isLanding={this.state.isLanding}
          onClickBack={this.onClickBack}
          refreshMobileStatus={this.refreshMobileStatus}
          faq={faq}
          lanText={lanText}
          changeLocaleLanguage={this.changeLocaleLanguage}
          showProfile={this.showProfile}
          showChangePassword={this.showChangePassword}
          showMyTrip={this.showMyTrip}
          showMyDocuments={this.showMyDocuments}
          showSurveyModal={this.showSurveyModal}
          {...this.props}
        />
        <MobileSideBar
          open={this.state.sideBarOpen}
          refreshMobileStatus={this.refreshMobileStatus}
          faq={faq}
          lanText={lanText}
          changeLocaleLanguage={this.showLinkAndRefreshMobileSideBar(this.changeLocaleLanguage)}
          showProfile={this.showLinkAndRefreshMobileSideBar(this.showProfile)}
          showChangePassword={this.showLinkAndRefreshMobileSideBar(this.showChangePassword)}
          showMyTrip={this.showLinkAndRefreshMobileSideBar(this.showMyTrip)}
          showMyDocuments={this.showLinkAndRefreshMobileSideBar(this.showMyDocuments)}
          showLogin={this.showLinkAndRefreshMobileSideBar(this.showLogin)}
          showSignUp={this.showLinkAndRefreshMobileSideBar(this.showSignUp)}
          userLogout={this.showLinkAndRefreshMobileSideBar(this.props.logout)}
          showSurveyModal={this.showSurveyModal}
          {...this.props}
        />
      </div>
    );
  }

  renderModal() {
    const height = isMobile ? window.innerHeight * 0.3 : window.innerHeight * 0.7;
    const body = isMobile ?
      (<div>
        <div className="button-wrapper">
          <div className="surveyTitle">$0 Down $0 Monthly Used Vehicle Lease!</div>
        </div>
        <div className="surveyBody">
          <Button type="primary" onClick={this.enterSurvey} size="large">
            <TranslatedMessage messages={messages} messageId="enterToWin" />
          </Button>
        </div>
      </div>)
       :
      (<iframe
        src={surveyLink}
        width="100%" height={height}
        frameBorder="0"
      ></iframe>);
    return (
      <ModalFramework
        visible={this.state.isShowSurveyModal}
        wrapClassName="survey-modal"
        onClose={this.hideSurveyModal}
      >
        <div style={{ height }}>
          { body }
        </div>
        <div className="button-wrapper">
          <Button type="primary" onClick={this.hideSurveyModal} className="ignore">
            <TranslatedMessage messages={messages} messageId="ignore" />
          </Button>
          <Button onClick={this.hideSurvey} className="noPrompt">
            <TranslatedMessage messages={messages} messageId="noPrompt" />
          </Button>
        </div>
      </ModalFramework>
    );
  }

  render() {
    const { children, isLogoutDone } = this.props;
    const footerStyle = this.props.location.pathname.split('/')[1] === 'notfound' ? { position: 'fixed' } : {};
    const appClassName = classNames({
      app: true,
      'footer-hidden': (this.props.location.pathname.indexOf('inventory') === 1) && isMobile,
    });
    // const width = isMobile ? '100%' : '820';
    return (
      <div className={appClassName}>
        <div className="app-wrap">
          <div className="app-main">
            { this.renderNavBar() }
            { !isLogoutDone && <Loader /> }
            <div className="app-page">
              { React.Children.toArray(children) }
            </div>
          </div>
        </div>
        <div className="app-footer">
          <Footer footerStyle={footerStyle} />
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

App.propTypes = {
  routes: PropTypes.array,
  router: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.node,
  // signUpFormInitialValues: PropTypes.object,
  // redirectUrl: PropTypes.any,
  locale: PropTypes.string,
  // isLimited: PropTypes.bool,
  // isHome: PropTypes.bool,
  // isLoggedIn: PropTypes.bool,
  isLogoutDone: PropTypes.bool,
  authUserId: PropTypes.string,
  linkTo: PropTypes.func,
  // onSubmit: PropTypes.func,
  loadAreaConfig: PropTypes.func,
  changeLocale: PropTypes.func,
  loggedIn: PropTypes.func,
  logout: PropTypes.func,
  showProfileModal: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  signUpFormInitialValues: selectSignUpForm,
  redirectUrl: selectRedirectUrl,
  locale: selectLocale,
  isLimited: selectIsLimited,
  isHome: selectIsHome,
  isLoggedIn: selectIsLoggedIn,
  isLogoutDone: selectIsLogoutDone,
  authUser: selectAuthUserInfo,
  authUserId: selectAuthUserId,
});

function mapDispatchToProps(dispatch) {
  return {
    linkTo: (url) => dispatch(push(url)),
    onSubmit: (formDataMap) => dispatch(updateSignUpFormAction(formDataMap)),
    loadAreaConfig: () => dispatch(loadAreaConfigAction()),
    changeLocale: (languageLocale) => dispatch(changeLocaleAction(languageLocale)),
    loggedIn: (user) => dispatch(loggedInByUserAction(user)),
    logout: () => dispatch(logoutByUserAction()),
    showProfileModal: (userId) => dispatch(showProfileModalAction(userId)),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(App));
