import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Image } from 'semantic-ui-react';
import api from '../../api';

const Avatar = (props) => {
  const [userData, setUserData] = useState({});

  const [userId, setUserId] = useState('');

  useEffect(() => {
    const ue = async () => {
      const user = await firebase.auth().currentUser;
      console.log(user.id);
      await setUserId(user.id);
      const snapshot = await api.users.getById(userId);
      setUserData(snapshot.data());
    };
    ue();
  }, [userId]);

  return (
    <a href={`/u/${userId}`}>
      <div>
        <Image src={userData?.picture} avatar />
        <span>{userId}</span>
      </div>
    </a>
  );
};

export default Avatar;
