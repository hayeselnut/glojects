import React, { useEffect, useState } from 'react';

import { Button, Header, Image } from 'semantic-ui-react';
import api from '../../api';
import { redirect } from '../../helpers';
import Avatar from '../avatar/Avatar';

const GlojectTeam = (props) => {
  const { glojectData } = props

  const joinTeam = async () => {
    const currentUserId = 'mhGPVkmyRhVHwzNZc7UH'; // TODO
    const updated = {team: glojectData.team.concat(currentUserId)}
    await api.glojects.update(glojectData.id, updated);
    window.location.reload();
  }

  return (
    <>
      <Header size='tiny'>Owner:</Header>
      <Avatar userId={glojectData.owner} />

      <Header size='tiny' style={{marginTop: '1em'}}>Team members:</Header>
      {glojectData.team?.map((userId) => (
        <Avatar userId={userId} />
      ))}

      {/* Only show `Join Team` if team has space */}
      {glojectData.team?.length < glojectData.maxTeamSize - 1 && (
        <>
          <Button
            circular
            size='tiny'
            color='grey'
            icon='plus'
            onClick={(e) => joinTeam()}
          />
          <span>Join team</span>
        </>
      )}
    </>
  );
};

export default GlojectTeam;
