import React from 'react';
import { Button, Modal, Form, Input, Header } from 'semantic-ui-react';
import { login } from '../../firebase/auth';
import 'react-nice-input-password/dist/react-nice-input-password.css';

export default function LoginModal(props) {
  const { loginOpen, setLoginOpen, loggedIn, setLoggedIn } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    await login(email, password);
    console.log('setting loginopen');
    setLoggedIn(true);
    setLoginOpen(false);
  };

  return (
    <Modal
      dimmer="blurred"
      open={loginOpen}
      onClose={() => setLoginOpen(false)}
    >
      <Modal.Header>Login to Glojects now!</Modal.Header>
      <Modal.Content>
        <div style={{ margin: 10, marginRight: 40, marginLeft: 40 }}>
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
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => handleLogin()}>Log in</Button>
      </Modal.Actions>
    </Modal>
  );
}
