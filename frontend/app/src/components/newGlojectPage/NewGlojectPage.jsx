import React, { useState } from 'react';

import { Button, Container, Form, Header, Message, Radio } from 'semantic-ui-react';
import api from '../../api';
import { fileToDataUrl, redirect } from '../../helpers';

const NewGlojectPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [dueDate, setDueDate] = useState(null); // Due date gives time pressure - not rly a good thing? Make people learn and do stuff at their own pace
  const [tags, setTags] = useState('');
  const [difficulty, setDifficulty] = useState('EASY');
  // const [language, setLanguage] = useState('English'); // I think we shouldn't do language because it creates a barrier of entry - better to force everyoen to use English?
  const [maxTeamSize, setMaxTeamSize] = useState(6);
  const [image, setImage] = useState('');
  const [location, setLocation] = useState({longitude: 0, latitude: 0}); // TODO: find current location
  const owner = "byQQiP6Yniry7xZtF79y"; // TODO: find get current user
  const team = [];
  const status = "ACTIVE"

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState(false);

  const convertAndSetImage = async (file) => {
    try {
      const dataUrl = await fileToDataUrl(file);
      setImage(dataUrl);
    } catch (e) {
      console.error(e);
    }
  };

  const extractTags = (tagsString) => tagsString
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => !!tag);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '') {
      setErrorMsg('Title must not be empty');
      setError(true);
      return;
    }

    if (description === '') {
      setErrorMsg('Description must not be empty');
      setError(true);
      return;
    }

    setLoading(true);
    const res = await api.glojects.create({
      title, description, difficulty, owner, team, status, image, maxTeamSize, location,
      tags: extractTags(tags),
    })
    setLoading(false);

    redirect(`/g/${res.id}`);
  }

  return (
    <Container>
      <Header content="Make a new Gloject"/>
      <Form error={error} onSubmit={handleSubmit}>
        <Message error content={errorMsg} />
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

        <Form.Group widths='equal'>
          <Form.Input
            icon='group'
            iconPosition='left'
            label='Maximum Team Size (including you)'
            placeholder='Maximum Team Size'
            type='number'
            value={maxTeamSize}
            onChange={(e) => setMaxTeamSize(parseInt(e.target.value, 10) >= 2 ? e.target.value : 2)}
          />

          <Form.Input
            label='Cover photo'
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={(e) => convertAndSetImage(e.target.files[0])}
          />
        </Form.Group>

        <label>Location Coordinates</label>
        <Form.Group widths='equal'>
          <Form.Input
            label='Longitude'
            placeholder='longitude'
            value={location.longitude}
            onChange={(e) => setLocation({longitude: e.target.value, latitude: location.latitude})}
          />

          <Form.Input
            label='Latitude'
            placeholder='latitude'
            value={location.latitude}
            onChange={(e) => setLocation({longitude: location.longitude, latitude: e.target.value})}
          />
        </Form.Group>

        <Form.Field>
          <label>Difficulty Level</label>
          <Form.Group inline>
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
