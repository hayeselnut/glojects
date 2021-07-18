import React, { useEffect, useState } from 'react';

import { Comment } from 'semantic-ui-react';
import api from '../../api';

import DefaultProfilePic from '../../assets/default.png';

const GlojectCommentBlock = (props) => {
  const { comment } = props;
  const { time, userId, content } = comment;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const ue = async () => {
      const userData = await api.users.getById(userId);
      setUserData(userData);
    };
    ue();
  }, [userId]);

  return (
    <Comment>
      <Comment.Avatar as='a' href={`${process.env.PUBLIC_URL}/u/${userId}`} src={userData.image || DefaultProfilePic} />
      <Comment.Content style={{color: 'white'}}>
        <Comment.Author as='a' href={`${process.env.PUBLIC_URL}/u/${userId}`}>{userData.username}</Comment.Author>
        <Comment.Metadata style={{color: 'gray'}}>
          <div>{time}</div>
        </Comment.Metadata>
        <Comment.Text style={{color: 'white'}}>{content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default GlojectCommentBlock;
