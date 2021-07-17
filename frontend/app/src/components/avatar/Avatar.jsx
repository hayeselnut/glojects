import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Button, Icon, Image } from 'semantic-ui-react';
import api from '../../api';

const Avatar = (props) => {
  const {
    removeFromTeam,
    setProfileOpen,
    profileId,
    setProfileId,
    setGlojectOpen,
  } = props;
  const [userData, setUserData] = useState({});

  const currUserId = localStorage.getItem('id');

  useEffect(() => {
    const ue = async () => {
      const userData = await api.users.getById(profileId);
      console.log('response', userData);
      setUserData(userData);
    };
    ue();
  }, [profileId]);

  const handleClick = () => {
    setProfileId(profileId);
    setProfileOpen(true);
    setGlojectOpen(false);
    console.log(profileId);
  };

  return (
    <div style={{ display: 'flex' }}>
      <a
        onClick={() => handleClick()}
        style={{ flexGrow: 1, alignSelf: 'center', color: 'white' }}
      >
        <Image src={userData.image} avatar style={{ marginRight: '0.5em' }} />
        <span style={{ flexGrow: 1, width: '200px' }}>{`${userData.username}${
          profileId === currUserId ? ' (You)' : ''
        }`}</span>
      </a>
      {removeFromTeam && (
        <Icon
          fitted
          circular
          inverted
          size="tiny"
          color="grey"
          name="minus"
          style={{ cursor: 'pointer' }}
          onClick={(e) => removeFromTeam()}
        />
      )}
    </div>
  );
};

export default Avatar;
