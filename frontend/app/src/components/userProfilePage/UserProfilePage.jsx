import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Header } from 'semantic-ui-react';

const UserProfilePage = (props) => {
  const { username } = props.match.params;

  return (
    <Container>
      <Header>
        Username: {username}
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
