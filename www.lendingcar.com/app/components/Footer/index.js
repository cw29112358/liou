/**
*
* Footer
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import './style.scss';

function Footer(props) {
  return (

    <footer className="footer footerStyle" style={props.footerStyle}>

      <div className="container text-center">
        <span>Copyright &copy; LendingCar, Inc. 2018 All Rights Reserved.</span>
      </div>

    </footer>

  );
}

Footer.propTypes = {
  footerStyle: PropTypes.object,
};

export default Footer;
