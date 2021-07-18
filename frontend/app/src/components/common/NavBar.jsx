import React, { Component, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import Avatar from '../avatar/Avatar';
import { Menu, Segment, Header, Button } from 'semantic-ui-react';
import { logout } from '../../firebase/auth';
import SignupModal from '../signupPage/SignupModal';
import LoginModal from '../signupPage/LoginModal';
import ProfileModal from '../userProfilePage/ProfileModal';
import GlojectModal from '../glojectPage.jsx/GlojectModal';
import { StoreContext } from '../../utils/store';

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
  // padding: 10px;
  position: absolute;
  top: 1vh;
  // margin: 10px;
  margin-right: 1vw;
  margin-left: 1vw;
  width: 100%;
`;

const LeftDiv = styled.div``;
const RightDiv = styled.div`
  display: flex;
  // justify-content: center;
  // padding: 10px;
  // margin: 10px;
  padding-left: 1vw;
  padding-right: 1vw;
  width: 300px;
  // background-color: green;
  justify-content: space-between;
`;

const NavBar = (props) => {
  const [buttons, setButtons] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('id'));

  const context = useContext(StoreContext);
  const {
    loggedInContext,
    profileOpenContext,
    profileIdContext,
    glojectOpenContext,
    glojectIdContext,
    signupContext,
    loginContext,
  } = context;

  const [loggedIn, setLoggedIn] = loggedInContext;

  // Signup
  const [signupOpen, setSignupOpen] = signupContext;
  const [loginOpen, setLoginOpen] = loginContext;

  // Profile
  const [profileOpen, setProfileOpen] = profileOpenContext;
  const [profileId, setProfileId] = profileIdContext;
  // Gloject
  const [glojectOpen, setGlojectOpen] = glojectOpenContext;
  const [glojectId, setGlojectId] = glojectIdContext;

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    console.log(pathname);
    if (loggedIn || userId !== null) {
      setButtons(
        <RightDiv>
          <Avatar
            style={{ margin: '10px' }}
            profileId={userId}
            setProfileId={setProfileId}
            type="light"
          />
          <Button
            name="sign out"
            inverted
            onClick={handleLogout}
            style={{ margin: '10px' }}
          >
            Sign Out
          </Button>
        </RightDiv>
      );
    } else {
      setButtons(
        <RightDiv>
          <Button
            name="sign in"
            style={{ margin: '5px' }}
            inverted
            onClick={() => setLoginOpen(true)}
          >
            Sign In
          </Button>
          <Button
            name="register"
            style={{ margin: '5px' }}
            inverted
            onClick={() => setSignupOpen(true)}
          >
            Register
          </Button>
        </RightDiv>
      );
    }
  }, [loggedIn, userId]);
  return (
    <StyledNav>
      {/* <LeftDiv> */}
      <Header as="h1" style={{ color: 'white' }}>
        Gl<span>&#x1f30e;</span>jects
      </Header>
      {/* </LeftDiv> */}
      <RightDiv>
        {buttons}
        <SignupModal />
        <LoginModal />
        <ProfileModal />
        <GlojectModal />
      </RightDiv>
    </StyledNav>
  );
};

export default NavBar;
