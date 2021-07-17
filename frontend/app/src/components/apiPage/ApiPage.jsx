import React, { useEffect, useState } from 'react';

import { Button, Container, Dropdown, Header, Input, Radio, Segment } from 'semantic-ui-react';
import api from '../../api';

const ApiPage = () => {

  const [glojectId, setGlojectId] = useState('VtXT4nokLsKbt3penPpx');
  const [difficulty, setDifficulty] = useState('');
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const ue = async () => {
      const allTags = await api.glojects.getAllTags();
      setAllTags(allTags.map((tag) => ({key: tag, text: tag, value: tag})));
    };
    ue();
  }, []);

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

      <Segment>
        <Radio
          label='None'
          value=''
          checked={difficulty === ''}
          onChange={(e, { value }) => setDifficulty(value)}
        />
        <Radio
          label='Easy'
          value='EASY'
          checked={difficulty === 'EASY'}
          onChange={(e, { value }) => setDifficulty(value)}
        />
        <Radio
          label='Medium'
          value='MEDIUM'
          checked={difficulty === 'MEDIUM'}
          onChange={(e, { value }) => setDifficulty(value)}
        />
        <Radio
          label='Hard'
          value='HARD'
          checked={difficulty === 'HARD'}
          onChange={(e, { value }) => setDifficulty(value)}
        />

        <Dropdown
          placeholder='Tags'
          multiple
          search
          selection
          options={allTags}
          onChange={(e, {value}) => setTags(value)}
        />
        <Button
          content="Get gloject meeting filters"
          onClick={() => api.glojects.getAllFilters({difficulty, tags}).then((res) => console.log(res + " difficulty was " + difficulty + "!!!"))}
        />
      </Segment>
    </Container>
  );
};

export default ApiPage;