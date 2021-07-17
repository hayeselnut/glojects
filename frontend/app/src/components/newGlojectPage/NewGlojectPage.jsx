import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Container, Form, Header, Message, Radio, TextArea } from 'semantic-ui-react';
import api from '../../api';
import Avatar from '../avatar/Avatar';

const NewGlojectPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [dueDate, setDueDate] = useState(null); // Due date gives time pressure - not rly a good thing? Make people learn and do stuff at their own pace
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState('EASY');
  // const [language, setLanguage] = useState('English'); // I think we shouldn't do language because it creates a barrier of entry - better to force everyoen to use English?
  const [maxTeamSize, setMaxTeamSize] = useState(6);
  const owner = "YOU"; // TODO: find get current user
  const team = [];
  const status = "ACTIVE"

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const extractTags = (tagsString) => tagsString
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => !!tag);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await api.glojects.create({
      title, description, difficulty, owner, team, status,
      tags: extractTags(tags),
    })
    setLoading(false);
  }

  return (
    <Container>
      <Header content="Make a new Gloject"/>
      <Form success={success} error={error} onSubmit={handleSubmit}>
        <Message error content='Something ' />
        <Message success content='Login success!' />
        <Form.Input
          name='glojectTitle'
          label='Title'
          placeholder='Title'
          id='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.TextArea
          name='glojectDescription'
          label='Description'
          placeholder='Description'
          id='Description'
          value={description}
          style={{ minHeight: 100 }}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Form.Input
          icon='group'
          iconPosition='left'
          label='Maximum Team Size'
          placeholder='Maximum Team Size'
          type='number'
          value={maxTeamSize}
          onChange={(e) => setMaxTeamSize(parseInt(e.target.value, 10) >= 2 ? e.target.value : 2)}
        />

        <Form.Field>
          <Form.Group inline>
            <label>Difficulty Level</label>
            <Form.Field
              control={Radio}
              label='Easy'
              value='EASY'
              checked={difficulty === 'EASY'}
              onChange={(e, { value }) => setDifficulty(value)}
            />
            <Form.Field
              control={Radio}
              label='Medium'
              value='MEDIUM'
              checked={difficulty === 'MEDIUM'}
              onChange={(e, { value }) => setDifficulty(value)}
            />
            <Form.Field
              control={Radio}
              label='Hard'
              value='HARD'
              checked={difficulty === 'HARD'}
              onChange={(e, { value }) => setDifficulty(value)}
            />
          </Form.Group>
        </Form.Field>
        <Form.Input
          name='glojectTags'
          label='Tags'
          placeholder='Tag (comma separated)'
          id='Tags'
          value={tags}
          onChange={(e) => {setTags(e.target.value)}}
        />

        <Button primary type='submit' content='Create Gloject' />
      </Form>
    </Container>
  );
};

export default NewGlojectPage;
