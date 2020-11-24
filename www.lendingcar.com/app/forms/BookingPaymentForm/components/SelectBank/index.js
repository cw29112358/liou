/**
*
* SelectBank
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

// eslint-disable-next-line linebreak-style

const Bankdiv = styled.div`
  padding: 20px 35px 30px 30px;
  border: 1px solid rgba(197,197,197,0.8);
`;
const BankContent = styled.div`
  padding: 15px;
  margin-top: 15px;
  background-color: #efeeef;
`;
const FlexContainer = styled.div`
  display: flex;
`;
const FlexBank = styled.a`
  flex: 1;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
`;
function SelectBank() {
// eslint-disable-next-line linebreak-style
  return (
    <Bankdiv>
      <h3>SELECT YOU BANK</h3>
      <BankContent>
        <FlexContainer>
          <FlexBank><img src="" alt="" style={{ width: '90%', height: '100%' }} /></FlexBank>
          <FlexBank><img src="" alt="" style={{ width: '90%', height: '100%' }} /></FlexBank>
          <FlexBank><img src="" alt="" style={{ width: '90%', height: '100%' }} /></FlexBank>
        </FlexContainer>
        <FlexContainer>
          <FlexBank><img src="" alt="" style={{ width: '90%', height: '100%' }} /></FlexBank>
          <FlexBank><img src="" alt="" style={{ width: '90%', height: '100%' }} /></FlexBank>
          <FlexBank><img src="" alt="" style={{ width: '90%', height: '100%' }} /></FlexBank>
        </FlexContainer>
      </BankContent>
    </Bankdiv>
  );
}

SelectBank.propTypes = {

};

export default SelectBank;
