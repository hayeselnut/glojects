import React, { useEffect, useState } from 'react';

import { Container, Grid, Header, Image } from 'semantic-ui-react';
import api from '../../api';
import GlojectTeam from './GlojectTeam';

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
      <Image style={{objectFit: 'cover', maxHeight: 100, marginBottom: '1em'}} fluid src={glojectData.image}/>
      <Header size='huge'>{glojectData.title}</Header>
      <Grid columns='equal'>
        <Grid.Column width={10}>
          {glojectData.description?.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Grid.Column>

        <Grid.Column>
          <GlojectTeam glojectData={glojectData}/>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default GlojectPage;
