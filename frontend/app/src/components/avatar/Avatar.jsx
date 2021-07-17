import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Image } from 'semantic-ui-react';
import api from '../../api';

const Avatar = (props) => {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem('id'));

  useEffect(() => {
    const ue = async () => {
      const userData = await api.users.getById(userId);
      setUserData(userData);
    };
    ue();
  }, [userId]);

  return (
    <a href={`/u/${userId}`}>
      <div>
        <Image src={userData.image} avatar />
        <span>{userData.username}</span>
      </div>
    </a>
  );
};

export default Avatar;
