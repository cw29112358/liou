/**
*
* MobileSideBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

import TranslatedMessage from 'components/TranslatedMessage';
import Avatar from 'components/Avatar';
import messages from './messages';
import './style.scss';

function MobileSideBar(props) {
  const { faq, lanText, open, refreshMobileStatus,
    isLoggedIn, isLogoutDone, authUser, changeLocaleLanguage,
    showProfile, showChangePassword, showMyTrip, showSignUp, showLogin, userLogout,
    showSurveyModal } = props;
  const sideBarClassName = open ? 'mobile-side-bar open' : 'mobile-side-bar';
  const goToFAQ = () => { window.open(faq, '_blank'); refreshMobileStatus(); };
  const avatar = isLoggedIn
    ? (<li className="avatar-line">
      { !isLogoutDone && <Loader active inverted /> }
      { isLogoutDone && <Avatar url={authUser.logo} height={30} width={30} /> }
      <span className="user-name">{authUser.firstName}&nbsp;{authUser.lastName}</span>
    </li>)
    : (
      <li className="avatar-line">
        <Avatar height={30} width={30} />
        <span className="user-name">
          <TranslatedMessage messages={messages} messageId="notLogIn" />
        </span>
      </li>
    );

  return (
    <div className={sideBarClassName}>
      <div className="mobile-side-div" >
        <ul className="nav navbar-nav navbar-right">
          {/* {!isLogoutDone && <Loader active inverted />} */}
          { avatar }
          { isLoggedIn &&
            <li className="menu-line">
              <div onClick={showProfile}>
                <i className="fa fa-user" aria-hidden="true"></i>
                <TranslatedMessage messages={messages} messageId="profile" />
              </div>
            </li>
          }
          {isLoggedIn &&
            <li className="menu-line">
              <div onClick={showMyTrip}>
                <i className="fa fa-clock-o" aria-hidden="true"></i>
                <TranslatedMessage messages={messages} messageId="myTrip" />
              </div>
            </li>
          }
          {isLoggedIn &&
            <li className="menu-line bottom-line">
              <div onClick={showChangePassword}>
                <i className="fa fa-lock" aria-hidden="true"></i>
                <TranslatedMessage messages={messages} messageId="changePassword" />
              </div>
            </li>
          }
          <li className="menu-line">
            <div onClick={goToFAQ}>
              <i className="fa fa-question-circle" aria-hidden="true"></i>
              <TranslatedMessage messages={messages} messageId="faq" tagName="span" />
            </div>
          </li>
          <li className="menu-line">
            <div onClick={changeLocaleLanguage}>
              <i className="fa fa-globe" aria-hidden="true"></i>
              {lanText}
            </div>
          </li>
          {!isLoggedIn
            && <li className="menu-line">
              <div onClick={showSignUp}>
                <i className="fa fa-user-plus" aria-hidden="true"></i>
                <TranslatedMessage messages={messages} messageId="signUp" tagName="span" />
              </div>
            </li>
          }
          {!isLoggedIn
            && <li className="login-line">
              <div onClick={showLogin}>
                <i className="fa fa-sign-in" aria-hidden="true"></i>
                <TranslatedMessage messages={messages} messageId="login" tagName="span" />
              </div>
            </li>
          }
          {isLoggedIn &&
            <li className="login-line">
              <div onClick={userLogout}>
                <i className="fa fa-power-off" aria-hidden="true"></i>
                <TranslatedMessage messages={messages} messageId="logout" />
              </div>
            </li>
          }
          <li className="menu-line" >
            <div onClick={showSurveyModal}>
              <i className="anticon anticon-form"></i>
              <TranslatedMessage messages={messages} messageId="survey" tagName="span" />
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-shadow" onClick={refreshMobileStatus} />
    </div>
  );
}

MobileSideBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  isLogoutDone: PropTypes.bool,
  authUser: PropTypes.any,
  open: PropTypes.bool,
  refreshMobileStatus: PropTypes.func,
  faq: PropTypes.string,
  lanText: PropTypes.string,
  changeLocaleLanguage: PropTypes.func,
  showProfile: PropTypes.func,
  showChangePassword: PropTypes.func,
  showMyTrip: PropTypes.func,
  showLogin: PropTypes.func,
  showSignUp: PropTypes.func,
  userLogout: PropTypes.func,
  showSurveyModal: PropTypes.func,
};

export default MobileSideBar;
