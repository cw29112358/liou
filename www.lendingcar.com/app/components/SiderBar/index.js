/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import './style.scss';

function SiderBar(props) {
  const { title, menus, currentSelect } = props;
  return (
    <div className="sider-bar">
      <h3 className="menu-title font-regular">
        <TranslatedMessage messages={messages} messageId={title} tagName="span" />
      </h3>
      <ul className="menu-list">
        { menus && menus.map((menu) =>
          <li key={menu.key} className={`menu-li ${menu.key === currentSelect ? 'menu-active' : ''}`}>
            <Link to={`/${menu.key}`} >
              <TranslatedMessage messages={messages} messageId={menu.key} tagName="span" />
            </Link>
          </li>
        ) }
      </ul>
    </div>
  );
}

SiderBar.propTypes = {
  currentSelect: PropTypes.string,
  title: PropTypes.string,
  menus: PropTypes.array,
};

export default SiderBar;
