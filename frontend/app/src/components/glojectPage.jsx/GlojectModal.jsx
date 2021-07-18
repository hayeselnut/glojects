import React, { useEffect, useState, useContext } from 'react';
import {
  Label,
  Grid,
  Container,
  Image,
  Header,
  Modal,
  Message,
  Button,
} from 'semantic-ui-react';
import { login } from '../../firebase/auth';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../api';
import 'react-nice-input-password/dist/react-nice-input-password.css';
import GlobjectCard from '../common/GlojectCard';
import GlojectTeam from './GlojectTeam';
import { StoreContext } from '../../utils/store';
import DifficultyLabel from './DifficultyLabel';
import GlojectComments from './GlojectComments';
import { redirect } from '../../helpers';

export default function GlojectModal() {
  const context = useContext(StoreContext);
  const {
    profileOpenContext,
    profileIdContext,
    glojectOpenContext,
    glojectIdContext,
  } = context;
  // Profile
  const [profileOpen, setProfileOpen] = profileOpenContext;
  const [profileId, setProfileId] = profileIdContext;

  // Gloject
  const [glojectOpen, setGlojectOpen] = glojectOpenContext;
  const [glojectId, setGlojectId] = glojectIdContext;

  const [glojectData, setGlojectData] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('')

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
        <Message hidden={!success} success content={successMsg} />

        <Grid columns="equal">
          <Grid.Column width={10}>
            <Header style={{ color: 'white' }} size="huge">
              {glojectData.title}
            </Header>
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

            <Label.Group tag style={{ marginBottom: '2em' }}>
              {glojectData.tags?.map((tag) => (
                <Label key={tag}>{tag}</Label>
              ))}
            </Label.Group>

            <GlojectComments glojectData={glojectData} setGlojectData={setGlojectData} />

          </Grid.Column>

          <Grid.Column>
            <GlojectTeam
              glojectData={glojectData}
              setGlojectData={setGlojectData}
              setSuccess={setSuccess}
              setSuccessMsg={setSuccessMsg}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </Modal>
  );
}
