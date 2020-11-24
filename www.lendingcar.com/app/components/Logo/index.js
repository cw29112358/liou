/* eslint-disable global-require */
import React, { Component } from 'react';
// import { Image } from 'semantic-ui-react';

class Logo extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="logo" >
        <img src={require('./banner-logo-icon01.png')} alt="logo" height="34px" />
      </div>
    );
  }
}

export default Logo;
