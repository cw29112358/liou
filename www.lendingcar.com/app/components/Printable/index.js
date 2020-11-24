/**
*
* Printable
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import url from 'assets/car.png';

import messages from './messages';
import './style.scss';

class Printable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onClick = () => {
    window.print();
  }

  render() {
    return (
      <div className="printable">
        <button onClick={this.onClick} className="print-button no-print">Print</button>
        <div id="printable-body">
          <img src={url} alt="" />
          <div className="printable-area">
            <FormattedMessage {...messages.header} />
          </div>
          <div className="grey-area">
            Grey
          </div>
          <div className="black-area">
            Black
          </div>
          <div className="no-print">
            noprint
          </div>
          <div className="large">
            large
          </div>
          <div className="small">
            small
          </div>
        </div>
      </div>
    );
  }
}

Printable.propTypes = {

};

export default Printable;
