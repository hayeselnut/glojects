import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SignupModal from './SignupModal';

const SignupPage = () => {
  const history = useHistory();
  const [signupOpen, setSignupOpen] = useState(false);
  return (
    <div>
      Sign up page
      <button onClick={() => history.push('/')}>Back to landing</button>
      <SignupModal
        signupOpen={signupOpen}
        setSignupOpen={setSignupOpen}
      ></SignupModal>
    </div>
  );
};

export default SignupPage;
