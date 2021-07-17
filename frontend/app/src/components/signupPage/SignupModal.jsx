import React from 'react';
import { Button, Modal, Form, Input, Header } from 'semantic-ui-react';
import { signup } from '../../firebase/auth';
import 'react-nice-input-password/dist/react-nice-input-password.css';
import './InvisInput.css';

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
      dimmer="blurring"
      open={signupOpen}
      onClose={() => setSignupOpen(false)}
      basic
      size="tiny"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Header as="h1" textAlign="center">
        Become part of Gl<span>&#x1f30e;</span>jects now!
      </Header>
      <Modal.Content>
        <Form>
          <div style={{ margin: 10, marginRight: 40, marginLeft: 40 }}>
            <Header as="h3" style={{ color: 'white' }}>
              Username
            </Header>
            <Input
              onChange={(event) => setUsername(event.target.value)}
              placeholder="xxJohnSmithxx"
              fluid
              required
              autoFocus
              transparent
              style={{ borderBottom: '1px solid grey', color: 'white' }}
            />
            <Header as="h3" style={{ color: 'white' }}>
              Email
            </Header>
            <Input
              onChange={(event) => setEmail(event.target.value)}
              placeholder="john_smith@email.com"
              fluid
              required
              autoFocus
              transparent
              style={{ borderBottom: '1px solid grey' }}
            />
            <Header as="h3" style={{ color: 'white' }}>
              Password
            </Header>
            <Input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="*******"
              fluid
              required
              autoFocus
              type="password"
              transparent
              style={{ borderBottom: '1px solid grey' }}
            />
            <Header as="h3" style={{ color: 'white' }}>
              Location
            </Header>
            <Input
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Sydney"
              fluid
              required
              autoFocus
              transparent
              style={{ borderBottom: '1px solid grey' }}
            />
          </div>
        </Form>
      </Modal.Content>
      <Button
        style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
        inverted
        onClick={() => handleSignup()}
      >
        Sign up
      </Button>
    </Modal>
  );
}
