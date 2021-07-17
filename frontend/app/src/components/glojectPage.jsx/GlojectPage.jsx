import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Header } from 'semantic-ui-react';

const GlojectPage = (props) => {
  const { glojectid } = props.match.params;

  return (
    <Container>
      <Header>
        Gloject ID: {glojectid}
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

export default GlojectPage;
