import React, { useEffect, useState } from 'react';
import {
  Label,
  Grid,
  Container,
  Image,
  Header,
  Modal,
} from 'semantic-ui-react';
import { login } from '../../firebase/auth';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../api';
import 'react-nice-input-password/dist/react-nice-input-password.css';
import GlobjectCard from '../common/GlojectCard';
import GlojectTeam from './GlojectTeam';

export default function GlojectModal(props) {
  const {
    glojectId,
    glojectOpen,
    setGlojectOpen,
    setProfileId,
    setProfileOpen,
  } = props;

  const [glojectData, setGlojectData] = useState({});

  useEffect(() => {
    const ue = async () => {
      const glojectData = await api.glojects.getById(glojectId);
      setGlojectData(glojectData);
    };
    ue();
  }, [glojectId]);

  return (
    <Modal
      dimmer="blurring"
      open={glojectOpen}
      onClose={() => setGlojectOpen(false)}
      basic
      size="tiny"
      style={{ zIndex: -1 }}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Container>
        <Image
          style={{ objectFit: 'cover', maxHeight: 100, marginBottom: '1em' }}
          fluid
          src={glojectData.image}
        />
        <Header style={{ color: 'white' }} size="huge">
          {glojectData.title}
        </Header>
        <Label.Group tag style={{ marginBottom: '2em' }}>
          {glojectData.tags?.map((tag) => (
            <Label key={tag}>{tag}</Label>
          ))}
        </Label.Group>
        <Grid columns="equal">
          <Grid.Column width={10}>
            {glojectData.description?.split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Grid.Column>

          <Grid.Column>
            <GlojectTeam
              glojectData={glojectData}
              setGlojectData={setGlojectData}
              setProfileId={setProfileId}
              setProfileOpen={setProfileOpen}
              setGlojectOpen={setGlojectOpen}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </Modal>
  );
}
