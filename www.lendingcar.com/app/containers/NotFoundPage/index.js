/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';
import imgSrc from './unfound.png';
export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {


  }
  render() {
    return (
      <div className="notFoundBackground container page-container page-center" >
        <div className="nf-main">
          <img className="nf-img" src={imgSrc} alt="" />
          <h1 className="nf-status">404</h1>
          <p className="nf-tips font-light">
            <FormattedMessage {...messages.tips} />
          </p>
        </div>
      </div>
    );
  }
}
