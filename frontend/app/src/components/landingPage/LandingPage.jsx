import React from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();
  return (
    <div>
      Landing page
      <button onClick={() => history.push('/signup')}>Go to sign up</button>
    </div>
  );
};

export default LandingPage;
