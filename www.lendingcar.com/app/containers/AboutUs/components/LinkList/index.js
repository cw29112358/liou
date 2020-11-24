/**
*
* LinkList
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function LinkList() {
  return (
    <ul className="link-list">
      <li>
        <a href="">
          <span className="glyphicon glyphicon-map-marker"></span>
        </a>
      </li>
      <li>
        <a href="">
          <span className="glyphicon glyphicon-earphone"></span>
        </a>
      </li>
      <li>
        <a href="">
          <span className="glyphicon glyphicon-envelope"></span>
        </a>
      </li>
      <li>
        <a href="">
          <span className="glyphicon glyphicon-headphones"></span>
        </a>
      </li>
    </ul>
  );
}

LinkList.propTypes = {

};

export default LinkList;
