/**
*
* PlaceholderComponent
*
*/

import React from 'react';
import './style.scss';

function Placeholder() {
  return (
    <div className="placeholder">
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  );
}

Placeholder.propTypes = {

};

export default Placeholder;
