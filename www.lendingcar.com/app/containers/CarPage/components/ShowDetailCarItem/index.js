/**
*
* ShowcaseCarItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const img = styled.img`
  width: 200px;
  height: auto;
`;

function ShowDetailCarItem(props) {
  const { image, ...rest } = props;
  return (
    <div {...rest} >
      <img src={image} alt="" />
    </div>
  );
}

ShowDetailCarItem.propTypes = {
  carData: PropTypes.object,
  linkTo: PropTypes.func,
  image: PropTypes.string,
};

export default ShowDetailCarItem;
