import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Header } from 'semantic-ui-react';
import api from '../../api';

const UserProfilePage = (props) => {
  const { username } = props.match.params;

  const [exists, setExists] = useState(false);

  useEffect(() => {
    const checkUsername = async () => {
      const usernameExists = await api.users.exists(username);
      setExists(usernameExists);
    };
    checkUsername();
  }, [username]);

  return (
    <Container>
      <Header>
        Username: {username} does it exist though -- {exists ? "YES" : "NO"}
      </Header>
    </Container>
  );

  // const history = useHistory();
  // return (
  //   <div>
  //     Landing page
  //     <button onClick={() => history.push('/signup')}>Go to sign up</button>
  //   </div>
  // );
};

export default UserProfilePage;
