import React from 'react';
import { Button, Modal, Form, Input, Header } from 'semantic-ui-react';
import { signup } from '../../firebase/auth';
import 'react-nice-input-password/dist/react-nice-input-password.css';

export default function SignupModal(props) {
  const { signupOpen, setSignupOpen } = props;
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignup = async () => {
    await signup(email, password, username, location);
    setSignupOpen(false);
  };

  return (
    <Modal
      dimmer="blurred"
      open={signupOpen}
      onClose={() => setSignupOpen(false)}
    >
      <Modal.Header>Become part of Globjects now!</Modal.Header>
      <Modal.Content>
        <div style={{ margin: 10, marginRight: 40, marginLeft: 40 }}>
          <Header as="h3">Username</Header>
          <Input
            onChange={(event) => setUsername(event.target.value)}
            placeholder="xxJohnSmithxx"
            fluid
            required
            autoFocus
          />
          <Header as="h3">Email</Header>
          <Input
            onChange={(event) => setEmail(event.target.value)}
            placeholder="john_smith@email.com"
            fluid
            required
            autoFocus
          />
          <Header as="h3">Password</Header>
          <Input
            onChange={(event) => setPassword(event.target.value)}
            placeholder="mypass123"
            fluid
            required
            autoFocus
            type="password"
          />
          <Header as="h3">Location</Header>
          <Input
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Sydney"
            fluid
            required
            autoFocus
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => handleSignup()}>Sign up</Button>
      </Modal.Actions>
    </Modal>
  );
}
