import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

import Avatar from '../avatar/Avatar';

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const LeftDiv = styled.div``;
const RightDiv = styled.div`
  display: flex;
  align-items: center;
`;

const NavBar = (props) => {
  return (
    <StyledNav>
      <LeftDiv>
        <Header>Glojects</Header>
      </LeftDiv>
      <RightDiv>
        <Avatar props={props} />
      </RightDiv>
    </StyledNav>
  );
};

export default NavBar;
