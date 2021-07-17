import React, { useEffect, useState } from 'react';

import { Button, Container, Grid, Header, Icon, Image, Label, Popup } from 'semantic-ui-react';
import api from '../../api';
import GlojectTeam from './GlojectTeam';
import Avatar from '../avatar/Avatar';
import GlobjectCard from '../common/GlojectCard';
import { redirect } from '../../helpers';
import DifficultyLabel from './DifficultyLabel';

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

  console.log('gjdata', glojectData);

  return (
    <Container>
      <Image
        style={{ objectFit: 'cover', maxHeight: 100, marginBottom: '1em' }}
        fluid
        src={glojectData.image}
      />
      <Grid columns="equal">
        <Grid.Column width={10}>
          <Header size="huge">{glojectData.title}</Header>
          <Label.Group>
            <DifficultyLabel difficulty={glojectData.difficulty} />
            {/* LOCATION LABEL */}
          </Label.Group>
        </Grid.Column>
        <Grid.Column>

        {/* TODO: only show if user is owner */}
        <Button circular floated='right' icon='pencil' primary onClick={() => redirect(`/g/${glojectId}/edit`)} />
        </Grid.Column>
      </Grid>

      <Grid columns="equal">
        <Grid.Column width={10}>
          {glojectData.description?.split('\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <Label.Group tag style={{marginBottom: '2em'}}>
            {glojectData.tags?.map(tag => (
              <Label key={tag}>{tag}</Label>
              ))}
          </Label.Group>
        </Grid.Column>

        <Grid.Column>
          <GlojectTeam glojectData={glojectData} setGlojectData={setGlojectData}/>
        </Grid.Column>
      </Grid>
      <GlobjectCard
        src={glojectData.image}
        title={glojectData.title}
        owner={glojectData.owner}
        description={glojectData.description}
        tags={glojectData.tags}
      />
    </Container>
  );
};

export default GlojectPage;
