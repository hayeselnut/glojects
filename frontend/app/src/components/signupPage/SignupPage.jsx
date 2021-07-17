import React from 'react';
import { useHistory } from 'react-router-dom';

const SignupPage = () => {
  const history = useHistory();

  return (
    <div>
      Sign up page
      <button onClick={() => history.push('/')}>Back to landing</button>
    </div>
  );
};

export default SignupPage;
