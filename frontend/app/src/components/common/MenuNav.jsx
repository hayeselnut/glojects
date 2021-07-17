import { findByLabelText } from '@testing-library/react';
import React, { Component, useEffect, useState } from 'react';
import { Menu, Segment, Header } from 'semantic-ui-react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { logout } from '../../firebase/auth';
import SignupModal from '../signupPage/SignupModal';
import LoginModal from '../signupPage/LoginModal';

const MenuNav = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [logggedIn, setLoggedIn] = useState(false);
  const [buttons, setButtons] = useState('');
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleItemClick = () => {};
  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
  };

  useEffect(() => {
    if (logggedIn) {
      console.log('logged in');
      setButtons(
        <Menu.Menu position="right">
          <Menu.Item name="account" onClick={handleItemClick} />
          <Menu.Item name="sign out" onClick={handleLogout} />
        </Menu.Menu>
      );
    } else {
      console.log('logged out');
      setButtons(
        <Menu.Menu position="right">
          <Menu.Item name="sign in" onClick={() => setLoginOpen(true)} />
          <Menu.Item name="register" onClick={() => setSignupOpen(true)} />
        </Menu.Menu>
      );
    }
  }, [logggedIn]);

  return (
    <Segment inverted>
      <Menu
        inverted
        secondary
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Header style={{ color: 'white', margin: 0 }}>Glojects</Header>
        {buttons}
      </Menu>
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
    </Segment>
  );
};

export default MenuNav;
