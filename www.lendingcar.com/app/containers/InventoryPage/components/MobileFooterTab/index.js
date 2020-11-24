/**
*
* MobileFooterTab
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import './style.scss';

function MobileFooterTab() {
  return (
    <div className="mobile-footer-tab">
      <Link to="/inventory"> Cars </Link>
      <Link to="/aboutUs"> AboutUs </Link>
      <Link to="/acount"> Acount </Link>
    </div>
  );
}

MobileFooterTab.propTypes = {
};

export default MobileFooterTab;
