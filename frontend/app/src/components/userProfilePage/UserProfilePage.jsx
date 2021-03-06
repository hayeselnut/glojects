import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Header, Image } from 'semantic-ui-react';
import api from '../../api';

const UserProfilePage = (props) => {
  const { userId } = props.params.math;

  const { uid } = useParams();
  const history = useHistory();

  const [userData, setUserData] = useState({}); // WE ARE NOT USING ACTIVE AND PAST GLOJECTS IN USER DATA
  const [activeGlojects, setActiveGlojects] = useState([]);
  const [pastGlojects, setPastGlojects] = useState([]);

  useEffect(() => {
    const ue = async () => {
      const userData = await api.users.getById(uid);
      setUserData(userData);

      const allInvolvedGlojects = (await api.glojects.getAll())
        .filter((gloject) => uid === gloject.owner || gloject.team.includes(uid))

      setActiveGlojects(allInvolvedGlojects.filter(gloject => gloject.status === 'ACTIVE'));
      setPastGlojects(allInvolvedGlojects.filter(gloject => gloject.status !== 'ACTIVE'));
    };
    ue();
  }, [uid]);

  // useEffect(() => {
  //   // if (!userData.active_glojects) return;
  //   const ue = async () => {

  //     const allGlojects
  //   };
  //   ue();

  //   let promises = userData.active_glojects?.map((id) => {
  //     return api.glojects.getById(id);
  //   });
  //   Promise.all(promises).then((res) => {
  //     console.log('res', res);
  //     setActiveGlojects(
  //       res.map((g) => {
  //         return (
  //           <div style={{ cursor: 'pointer', margin: '3px 0px' }}>
  //             <b onClick={() => history.push(`/g/${g.id}`)}>{g.title}</b>
  //           </div>
  //         );
  //       })
  //     );
  //   });
  //   promises = userData.past_glojects?.map((id) => {
  //     return api.glojects.getById(id);
  //   });
  //   Promise.all(promises).then((res) => {
  //     setPastGlojects(
  //       res.map((g) => {
  //         return (
  //           <div style={{ cursor: 'pointer', margin: '3px 0px' }}>
  //             <b onClick={() => history.push(`/g/${g.id}`)}>{g.title}</b>
  //           </div>
  //         );
  //       })
  //     );
  //   });
  // }, [userData]);

  return (
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
            <Header style={{ fontSize: '40px' }}>{userData.username}</Header>
            <Header>&#x1f4e7;: {userData.email}</Header>
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
            <Header>Active Glojects</Header>
            {activeGlojects}
          </div>
          <div style={{ flex: 1, display: 'block' }}>
            <Header>Past Glojects</Header>
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
