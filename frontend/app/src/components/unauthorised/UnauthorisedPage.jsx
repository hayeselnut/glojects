import React from 'react';
import { useHistory } from 'react-router-dom';

const UnauthorisedPage = () => {
  const history = useHistory();

  return (
    <div>
      Unauthorised access
      <button onClick={() => history.push('/')}>Back to landing</button>
    </div>
  );
};

export default UnauthorisedPage;
