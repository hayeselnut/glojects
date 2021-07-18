import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal, Container, Image, Header, Label } from 'semantic-ui-react';
import { login } from '../../firebase/auth';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../api';
import 'react-nice-input-password/dist/react-nice-input-password.css';
import { StoreContext } from '../../utils/store';

export default function ProfileModal() {
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

  //const { uid } = useParams();
  const history = useHistory();

  const [userData, setUserData] = useState({
    active_glojects: [],
    past_glojects: [],
  });
  const [activeGlojects, setActiveGlojects] = useState([]);
  const [pastGlojects, setPastGlojects] = useState([]);

  const handleGlojectClick = (globId) => {
    setProfileOpen(false);
    setGlojectId(globId);
    setGlojectOpen(true);
  };

  useEffect(() => {
    const ue = async () => {
      const userData = await api.users.getById(profileId);
      setUserData(userData);

      const allInvolvedGlojects = (await api.glojects.getAll())
        .filter((gloject) => profileId === gloject.owner || gloject.team.includes(profileId))

      setActiveGlojects(allInvolvedGlojects.filter(g => g.status === 'ACTIVE').map(g => <Label color='black' as='a' style={{ marginBottom: '0.5em'}} onClick={() => handleGlojectClick(g.id)}>{g.title}</Label>));
      setPastGlojects(allInvolvedGlojects.filter(g => g.status !== 'ACTIVE').map(g => <Label color='black' as='a' style={{ marginBottom: '0.5em'}} onClick={() => handleGlojectClick(g.id)}>{g.title}</Label>));
    };
    ue();
  }, [userData, profileOpen]);

  return (
    <Modal
      dimmer="blurring"
      open={profileOpen}
      onClose={() => setProfileOpen(false)}
      basic
      size="tiny"
      style={{ zIndex: -1 }}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div>
        <Container style={{ marginTop: '5%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '70px',
            }}
          >
            <Image
              style={{
                objectFit: 'cover',
                height: '150px',
                width: '150px',
                borderRadius: '50%',
              }}
              src={userData.image}
            />
            <div style={{ marginLeft: '50px' }}>
              <Header style={{ fontSize: '40px', color: 'white' }}>
                {userData.username}
              </Header>
              <Header style={{ color: 'white' }}>
                &#x1f4e7;: {userData.email}
              </Header>
            </div>
          </div>
          <Header style={{ color: 'white' }}>About me</Header>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
          <div
            style={{
              marginTop: '50px',
              display: 'flex',
            }}
          >
            <div style={{ flex: 1, display: 'block' }}>
              <Header style={{ color: 'white' }}>Active Glojects</Header>
              {activeGlojects}
            </div>
            <div style={{ flex: 1, display: 'block' }}>
              <Header style={{ color: 'white' }}>Past Glojects</Header>
              {pastGlojects}
            </div>
          </div>
        </Container>
      </div>
    </Modal>
  );
}
