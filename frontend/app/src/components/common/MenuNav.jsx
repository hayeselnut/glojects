import { findByLabelText } from '@testing-library/react';
import React, { Component, useEffect, useState } from 'react';
import { Menu, Segment, Header } from 'semantic-ui-react';
import firebase from 'firebase/app';
import 'firebase/auth';

const MenuNav = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [logggedIn, setLoggedIn] = useState(false);
  const [buttons, setButtons] = useState('');

  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (!user) {
      setLoggedIn(!true);
      setButtons(
        <Menu.Menu position="right">
          <Menu.Item
            name="account"
            active={activeItem === 'account'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="sign out"
            active={activeItem === 'signout'}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      );
    } else {
      setLoggedIn(false);
      setButtons(
        <Menu.Menu position="right">
          <Menu.Item
            name="sign in"
            active={activeItem === 'sign in'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      );
    }
  }, []);

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
    </Segment>
  );
};

export default MenuNav;
