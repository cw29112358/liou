/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';
import classNames from 'classnames';
import { MenuItem, Dropdown, Navbar as RBNavBar, Button } from 'react-bootstrap';
import { Loader } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import LogoBrandImage from 'assets/logo.png';
import LogoWhiteImage from 'assets/logo-white.png';
import Avatar from 'components/Avatar';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import './style.scss';

const Logo = styled.img`
  width: 130px;
  margin-top: -6px !important;
`;

// const LogoImage = location.pathname === '/' ? LogoWhiteImage : LogoBrandImage;

const DropdownMenu = ({ isLogoutDone, authUser, showProfile, showMyTrip, showChangePassword, logout }) => {
  const avatar = isLogoutDone ? <Avatar url={authUser.logo} height={30} width={30} /> : null;
  return (
    <Dropdown id="dropdown-custom-1">
      <Dropdown.Toggle className="dropdown-logo" noCaret>
        { !isLogoutDone && <Loader active inverted /> }
        { avatar }
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem header className="text-center">
          { authUser.firstName }&nbsp;{ authUser.lastName }
        </MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="1" onClick={showProfile} >
          <TranslatedMessage messages={messages} messageId="profile" />
        </MenuItem>
        <MenuItem eventKey="2" onClick={showMyTrip} >
          <TranslatedMessage messages={messages} messageId="myTrip" />
        </MenuItem>
        {/* <MenuItem eventKey="5" onClick={showMyDocuments} >
          <TranslatedMessage messages={messages} messageId="myDocuments" />
        </MenuItem> */}
        <MenuItem eventKey="3" onClick={showChangePassword} >
          <TranslatedMessage messages={messages} messageId="changePassword" />
        </MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4" onClick={logout} >
          <TranslatedMessage messages={messages} messageId="logout" />
        </MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownMenu.propTypes = {
  isLogoutDone: PropTypes.bool,
  authUser: PropTypes.object,
  showProfile: PropTypes.func,
  showChangePassword: PropTypes.func,
  showMyTrip: PropTypes.func,
  // showMyDocuments: PropTypes.func,
  logout: PropTypes.func,
};

function NavBar(props) {
  const {
    isHome, isLoggedIn, isLanding, faq, lanText,
    isFixed, onClickBack, refreshMobileStatus,
    changeLocaleLanguage, showProfile, showChangePassword, showMyTrip,
    showMyDocuments,
    showSurveyModal,
   } = props;

  const renderMobileBackButton = () => (
    <RBNavBar.Brand>
      <div role="button" className="navbar-back" onClick={onClickBack}>
        <i className="fa fa-chevron-left"></i>
      </div>
    </RBNavBar.Brand>
  );

  const renderMenuButton = () => (
    <RBNavBar.Brand>
      <Button className="mobile-menu" bsSize="small" onClick={refreshMobileStatus} >
        <i className="fa fa-bars" aria-hidden="true" ></i>
      </Button>
    </RBNavBar.Brand>
  );
  const LogoImage = isLanding ? LogoWhiteImage : LogoBrandImage;
  const LogoImageFixed = isFixed ? LogoBrandImage : LogoImage;
  const renderLogo = () => (
    <RBNavBar.Brand>
      <Link to="/" className="navbar-logo" >
        <Logo src={LogoImageFixed} alt="" />
      </Link>
    </RBNavBar.Brand>
  );

  const renderNavBar = () =>
    <ul className="nav navbar-nav navbar-right">
      {/* <li>
        <Link to="/aboutUs">
          <TranslatedMessage messages={messages} messageId="aboutUs" tagName="span" />
        </Link>
      </li> */}
      <li onClick={showSurveyModal}>
        <a>
          <TranslatedMessage messages={messages} messageId="survey" tagName="span" />
        </a>
      </li>
      <li>
        <Link to="#contactUs" style={{ width: 'auto' }}>
          <TranslatedMessage messages={messages} messageId="contactUs" tagName="span" />
        </Link>
      </li>
      <li>
        <Link to="#howItWorks" style={{ width: 'auto' }}>
          <TranslatedMessage messages={messages} messageId="learnMore" tagName="span" />
        </Link>
      </li>
      <li>
        <Link target="_blank" to={faq} style={{ width: 'auto' }}>
          <TranslatedMessage messages={messages} messageId="faq" tagName="span" />
        </Link>
      </li>
      { isLoggedIn
        && <li>
          <DropdownMenu
            {...props}
            showProfile={showProfile} showChangePassword={showChangePassword}
            showMyTrip={showMyTrip} showMyDocuments={showMyDocuments}
          />
        </li>
      }
      { !isLoggedIn
        && <li>
          <Link to="/login" style={{ width: 'auto' }}>
            <TranslatedMessage messages={messages} messageId="login" tagName="span" />
          </Link>
        </li>
      }
      {/* { !isLoggedIn
        && <li>
          <Link to="/signup" >
            <TranslatedMessage messages={messages} messageId="signUp" tagName="span" />
          </Link>
        </li>
      } */}
      <li>
        <a role="button" className="lan-text" onClick={changeLocaleLanguage}>
          {lanText}
        </a>
      </li>
    </ul>;

  const navbarClassName = classNames({
    'is-landing': isLanding,
    'navbar-mobile': isMobile,
    'navbar-fixed': isFixed,
  });

  return (
    <div className="navbar-page">
      <RBNavBar className={navbarClassName} collapseOnSelect >
        <RBNavBar.Header >
          { !isHome && renderMobileBackButton() }
          { renderLogo() }
          { renderMenuButton() }
        </RBNavBar.Header>
        <RBNavBar.Collapse>
          { renderNavBar() }
        </RBNavBar.Collapse>
      </RBNavBar>
    </div>
  );
}

NavBar.propTypes = {
  isHome: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isFixed: PropTypes.bool,
  isLanding: PropTypes.bool,
  onClickBack: PropTypes.func,
  refreshMobileStatus: PropTypes.func,
  faq: PropTypes.string,
  lanText: PropTypes.string,
  changeLocaleLanguage: PropTypes.func,
  showProfile: PropTypes.func,
  showMyTrip: PropTypes.func,
  showMyDocuments: PropTypes.func,
  showChangePassword: PropTypes.func,
  showSurveyModal: PropTypes.func,
};

export default NavBar;
