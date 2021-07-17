import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Button, Icon, Image } from 'semantic-ui-react';
import api from '../../api';

const Avatar = (props) => {
  const { userId, removeFromTeam } = props;
  const [userData, setUserData] = useState({});

  const currUserId = localStorage.getItem('id')

  useEffect(() => {
    const ue = async () => {
      const userData = await api.users.getById(userId);
      setUserData(userData);
    };
    ue();
  }, [userId]);

  return (
    <div style={{display: 'flex'}}>
      <a href={`/u/${userId}`} style={{flexGrow: 1}}>
        <Image src={userData.image} avatar style={{marginRight: '0.5em'}} />
        <span>{`${userData.username}${userId === currUserId && ' (You)'}`}</span>
      </a>
      {removeFromTeam && (
        <Icon
          fitted
          circular
          inverted
          size='tiny'
          color='grey'
          name='minus'
          style={{cursor: 'pointer'}}
          onClick={(e) => removeFromTeam()}
        />
      )}
    </div>
  );
};

export default Avatar;
