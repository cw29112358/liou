/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';


function Rating() {
  return (

    <div style={{ color: '#28d89d' }}>
      <i className="fa fa-star" ></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star-half-empty"></i>
    </div>

  );
}

Rating.propTypes = {

};

export default Rating;
