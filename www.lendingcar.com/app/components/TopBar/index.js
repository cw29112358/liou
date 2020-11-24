/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
// import chineseFlag from './china.png';
// import usFlag from './us.png';

function TopBar() {
  return (
    <div className="top-bar" style={{ backgroundColor: '#28d89d' }}>
      <div className="container">
        <div className="row" >
          <div className="col-sm-6 hidden-xs">
            <span><TranslatedMessage messages={messages} messageId="welcome" tagName="span" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

TopBar.propTypes = {
  changeLocale: PropTypes.func,
  locale: PropTypes.string,
};

export default TopBar;
