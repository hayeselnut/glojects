import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Header, Image } from 'semantic-ui-react';
import api from '../../api';
import NavBar from '../common/NavBar';

const UserProfilePage = (props) => {
  const { uid } = useParams();

  const [userData, setUserData] = useState({
    active_glojects: [],
    past_glojects: [],
  });
  const [activeGlojects, setActiveGlojects] = useState([]);
  const [pastGlojects, setPastGlojects] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const snapshot = await api.users.getById(uid);
      setUserData(snapshot.data());
    };
    getUserData();
  }, [uid]);

  useEffect(() => {
    setActiveGlojects(
      userData.active_glojects.map((g) => {
        return <div>{g}</div>;
      })
    );
    setPastGlojects(
      userData.past_glojects.map((g) => {
        return <div>{g}</div>;
      })
    );
  }, [userData]);

  console.log('userdta', userData);

  return (
    <div>
      <NavBar props={userData} />
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
            src={userData.photoURL}
          />
          <div style={{ marginLeft: '50px' }}>
            <Header style={{ fontSize: '40px' }}>{userData.username}</Header>
            <Header>{userData.email}</Header>
          </div>
        </div>
        <Header>About me</Header>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
        <div
          style={{
            marginTop: '50px',
            display: 'flex',
          }}
        >
          <div style={{ flex: 1, display: 'block' }}>
            <Header style={{ margin: 0 }}>Active Glojects</Header>
            {activeGlojects}
          </div>
          <div style={{ flex: 1, display: 'block' }}>
            <Header style={{ margin: 0 }}>Past Glojects</Header>
            {pastGlojects}
          </div>
        </div>
      </Container>
    </div>
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
