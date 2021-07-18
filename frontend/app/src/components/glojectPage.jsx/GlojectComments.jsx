import React, { useState } from 'react';

import { Button, Comment, Form, TextArea } from 'semantic-ui-react';
import api from '../../api';
import GlojectCommentBlock from './GlojectCommentBlock';

const GlojectComments = (props) => {
  const { glojectData, setGlojectData } = props;

  const [commentText, setCommentText] = useState('');

  const postComment = async (e) => {
    e.preventDefault();

    if (commentText.trim().length === 0) return;

    const now = new Date();
    const newComment = {
      time: `${now.toDateString()} ${now.toTimeString().slice(0, 8)}`,
      userId: localStorage.getItem('id'),
      content: commentText,
    }

    await api.glojects.update(glojectData.id, {comments: glojectData.comments.concat(newComment)});
    setCommentText('');
    setGlojectData(await api.glojects.getById(glojectData.id));
  }

  return (
    <>
      <Form>
        <Form.TextArea
          name='glojectComment'
          label='Comment'
          placeholder='Comment'
          id='Comment'
          value={commentText}
          style={{ minHeight: 100 }}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          content='Post'
          primary
          onClick={(e) => postComment(e)}
        />
      </Form>

      {glojectData.comment?.length === 0 ? "Be the first one to comment!" : (
        <Comment.Group>
          {glojectData.comments?.map((comment, i) => <GlojectCommentBlock key={i} comment={comment}/>)}
        </Comment.Group>
      )}
    </>
  );
};

export default GlojectComments;
