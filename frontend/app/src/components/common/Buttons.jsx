import { findByLabelText } from '@testing-library/react';
import React, { Component, useEffect, useState } from 'react';
import { Menu, Segment, Header, Button } from 'semantic-ui-react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { logout } from '../../firebase/auth';
import SignupModal from '../signupPage/SignupModal';
import LoginModal from '../signupPage/LoginModal';

const Buttons = () => {
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
        <div>
          <Button name="account" onClick={handleItemClick}>
            Account
          </Button>
          <Button name="sign out" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      );
    } else {
      console.log('logged out');
      setButtons(
        <div>
          <Button name="sign in" onClick={() => setLoginOpen(true)}>
            Sign In
          </Button>
          <Button name="register" onClick={() => setSignupOpen(true)}>
            Register
          </Button>
        </div>
      );
    }
  }, [logggedIn]);

  return (
    <div>
      <div style={{ position: 'Absolute', margin: '20px' }}>{buttons}</div>
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
    </div>
  );
};

export default Buttons;
