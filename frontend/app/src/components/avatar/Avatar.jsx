import React, { useEffect, useState } from 'react';

import { Image } from 'semantic-ui-react';
import api from '../../api';

const Avatar = (props) => {
  const { userId } = props;

  const [userData, setUserData] = useState({});

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
        {console.log(userData)}
      </div>
    </a>
  );
};

export default Avatar;
