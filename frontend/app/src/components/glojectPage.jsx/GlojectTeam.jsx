import React, { useEffect, useState } from 'react';

import { Button, Header, Image, List, Transition } from 'semantic-ui-react';
import api from '../../api';
import Avatar from '../avatar/Avatar';
import Plus from '../../assets/plus.svg';

const GlojectTeam = (props) => {
  const { glojectData, setGlojectData } = props
  const [canJoinTeam, setCanJoinTeam] = useState(false);

  useEffect(() => {
    console.log(glojectData.team?.includes(currentUserId), glojectData.team?.length < glojectData.maxTeamSize - 1)
    setCanJoinTeam(
      !glojectData.team?.includes(currentUserId) &&
      glojectData.team?.length < glojectData.maxTeamSize - 1
    )
  }, [glojectData]);

  const currentUserId = 'mhGPVkmyRhVHwzNZc7UH'; // TODO
  // const currentUserId = api.users.getCurrentUserId();
  const joinTeam = async () => {
    const updated = {team: glojectData.team.concat(currentUserId)}
    await api.glojects.update(glojectData.id, updated);
    setGlojectData(await api.glojects.getById(glojectData.id));
  }

  const removeFromTeam = async () => {
    const updated = {team: glojectData.team.filter(member => member !== currentUserId)}
    await api.glojects.update(glojectData.id, updated);
    setGlojectData(await api.glojects.getById(glojectData.id));
  }

  return (
    <>
      <Header size='tiny'>Owner:</Header>
      <Avatar userId={glojectData.owner} />

      <Header size='tiny' style={{marginTop: '1em'}}>Team members:</Header>
      <Transition.Group
        as={List}
        duration={200}
        divided
        verticalAlign='middle'
      >
        {glojectData.team?.map((userId, i) => (
          <List.Item key={i}>
            <Avatar userId={userId} removeFromTeam={removeFromTeam}/>
          </List.Item>
        ))}

        {/* Only show `Join Team` if team has space */}
        {canJoinTeam && (
          <List.Item style={{cursor: 'pointer'}} onClick={(e) => joinTeam()}>
            <Image src={Plus} avatar style={{marginRight: '0.5em'}}/>
            <span style={{color: 'grey'}}>Join team</span>
          </List.Item>
      )}
      </Transition.Group>
    </>
  );
};

export default GlojectTeam;
