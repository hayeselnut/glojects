import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Container, Header, Input, Segment } from 'semantic-ui-react';
import api from '../../api';
import Avatar from '../avatar/Avatar';

const ApiPage = () => {

  const [glojectId, setGlojectId] = useState('VtXT4nokLsKbt3penPpx');

  return (
    <Container>
      <Header>
        API Implementation - check console
      </Header>
      <Segment>
        <Button
          content="Get all glojects"
          onClick={() => api.glojects.getAll().then((res) => console.log(res))}
        />
      </Segment>

      <Segment>
        <Button
          content="Get all active glojects"
          onClick={() => api.glojects.getAllActives().then((res) => console.log(res))}
        />
      </Segment>

      <Segment>
        <Input
          placeholder='glojectId'
          id='glojectId'
          value={glojectId}
          onChange={(e) => setGlojectId(e.target.value)}
        />
        <Button
          content="Get gloject by id"
          onClick={() => api.glojects.getById(glojectId).then((res) => console.log(res))}
        />
      </Segment>
    </Container>
  );
};

export default ApiPage;
