/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import loader from './loader.gif';
import './loader.scss';

class Loader extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { isLoadImg = true, message } = this.props;
    const imgClassName = classNames({
      'loader-img-hide': !isLoadImg,
    });
    return (
      <div className="loader-global col" >
        <div className="col" >
          <img src={loader} alt="loader" className={imgClassName} />
          <p className="loader-text">{message}</p>
        </div>
      </div>
    );
  }
}

Loader.propTypes = {
  message: PropTypes.string,
  isLoadImg: PropTypes.bool,
};

export default Loader;
