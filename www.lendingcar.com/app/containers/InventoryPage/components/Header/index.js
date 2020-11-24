/**
*
* Header
*
*/

import React from 'react';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import bgImage from './bg.jpg';


const Wrapper = styled.div`
  background: linear-gradient(
                     rgba(20,20,20, .5),
                     rgba(20,20,20, .5)),
                     url(${bgImage});
  background-attachment: fixed;
  background-size: cover;
  background-position: 0 0%;
  padding-top: 100px;
  padding-bottom: 50px;
  background-color: rgba(0, 0, 0, 0.7);
`;
const H4 = styled.h4`
  margin-bottom: 0px;
  font-size: 30px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 500;
`;

function Header() {
  return (
    <Wrapper className="">
      <div className="container">
        <H4><TranslatedMessage messages={messages} messageId="inventory" tagName="span" /></H4>
      </div>
    </Wrapper>
  );
}

Header.propTypes = {

};

export default Header;
