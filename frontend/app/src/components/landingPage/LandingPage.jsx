import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';

import NavBar from '../common/NavBar';

import './LandingPage.css';

const LandingPage = () => {
  const history = useHistory();
  return (
    <div>
      <NavBar />
      <div className="landing-page-container">
        <Header className="header" as="h1">
          Welcome to Glojects
        </Header>
        <Header as="h3">Connecting Passions Worldwide</Header>
        <Button primary onClick={() => history.push('/signup')}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
