import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';

import Avatar from '../avatar/Avatar';
import { Menu, Segment, Header, Button } from 'semantic-ui-react';
import { logout } from '../../firebase/auth';
import SignupModal from '../signupPage/SignupModal';
import LoginModal from '../signupPage/LoginModal';
import ProfileModal from '../userProfilePage/ProfileModal';
import GlojectModal from '../glojectPage.jsx/GlojectModal';

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
  justify-content: center;
  // padding: 10px;
  // margin: 10px;
  padding-left: 1vw;
  padding-right: 1vw;
  width: 270px;
  // background-color: green;
  justify-content: space-between;
`;

const NavBar = (props) => {
  const [activeItem, setActiveItem] = useState('home');
  const [logggedIn, setLoggedIn] = useState(false);
  const [buttons, setButtons] = useState('');
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  // Profile
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileId, setProfileId] = useState('');
  // Gloject
  const [glojectOpen, setGlojectOpen] = useState(false);
  const [glojectId, setGlojectId] = useState('');

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    console.log(pathname);
    console.log(logggedIn, userId);
    if (logggedIn || userId !== null) {
      console.log(logggedIn, userId);
      setButtons(
        <RightDiv>
          <Avatar
            style={{ margin: '10px' }}
            profileId={userId}
            setProfileId={setProfileId}
            setProfileOpen={setProfileOpen}
            setGlojectOpen={setGlojectOpen}
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
  }, [logggedIn, userId]);
  return (
    <StyledNav>
      {/* <LeftDiv> */}
        <Header as="h1" style={{ color: 'white' }}>
          Gl<span>&#x1f30e;</span>jects
        </Header>
      {/* </LeftDiv> */}
      <RightDiv>
        {buttons}
        <SignupModal
          signupOpen={signupOpen}
          setSignupOpen={setSignupOpen}
          logggedIn={logggedIn}
          setLoggedIn={setLoggedIn}
        ></SignupModal>
        <LoginModal
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          logggedIn={logggedIn}
          setLoggedIn={setLoggedIn}
        ></LoginModal>
        <ProfileModal
          profileOpen={profileOpen}
          profileId={profileId}
          setProfileOpen={setProfileOpen}
          setGlojectId={setGlojectId}
          setGlojectOpen={setGlojectOpen}
        ></ProfileModal>
        <GlojectModal
          glojectId={glojectId}
          setGlojectOpen={setGlojectOpen}
          glojectOpen={glojectOpen}
          setProfileId={setProfileId}
          setProfileOpen={setProfileOpen}
        ></GlojectModal>
      </RightDiv>
    </StyledNav>
  );
};

export default NavBar;
