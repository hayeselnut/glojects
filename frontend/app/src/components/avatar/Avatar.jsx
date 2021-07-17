import React, { useEffect, useState } from 'react';

import { Image } from 'semantic-ui-react';
import api from '../../api';

const Avatar = (props) => {
  const { username } = props;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const ue = async () => {
      const snapshot = await api.users.getByUsername(username);
      setUserData(snapshot.data());
    };
    ue();
  }, [username]);

  return (
    <a href={`/u/${username}`}>
      <div>
        <Image src={userData?.picture} avatar />
        <span>{username}</span>
      </div>
    </a>
  );
};

export default Avatar;
