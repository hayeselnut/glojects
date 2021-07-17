import React, { useEffect, useState } from 'react';

import { Container, Header, Image } from 'semantic-ui-react';
import api from '../../api';
import Avatar from '../avatar/Avatar';

const GlojectPage = (props) => {
  const { glojectId } = props.match.params;

  const [glojectData, setGlojectData] = useState({});

  useEffect(() => {
    const ue = async () => {
      const glojectData = await api.glojects.getById(glojectId);
      setGlojectData(glojectData);
    };
    ue();
  }, [glojectId]);

  return (
    <Container>
      <Image fluid src={glojectData.img}/>
      <Header>{glojectData.title}</Header>
      <p>{glojectData.description}</p>
      <p>Owner:</p>
      <Avatar username={glojectData.owner} />
      <p>Team members:</p>
      {glojectData.team?.map((username) => (
        <Avatar username={username} />
      ))}
    </Container>
  );
};

export default GlojectPage;
