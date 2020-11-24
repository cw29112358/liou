/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { getParentsRoute } from 'utils/helpers';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import './style.scss';

function PathBar(props) {
  const { routes, route } = props;
  const parentsRoutes = getParentsRoute(routes[0].childRoutes, route.name);

  return (
    <div className="path-bar-component">
      <div className="container page-container">
        {parentsRoutes.map((current, index) =>
          <span key={index}>
            {
              index === parentsRoutes.length - 1
              ?
                <span className="current-text-color">
                  <TranslatedMessage messages={messages} messageId={current.name} tagName="span" />
                </span>
              :
                <Link to={current.path} className="link-text-color">
                  <TranslatedMessage messages={messages} messageId={current.name} tagName="span" />
                  <span className="arrow">&nbsp;{'>'}&nbsp;</span>
                </Link>
            }
          </span>
        )}
      </div>
    </div>
  );
}

PathBar.propTypes = {
  routes: PropTypes.array,
  route: PropTypes.object,
};

export default PathBar;
