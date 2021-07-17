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
      dimmer="blurring"
      open={loginOpen}
      onClose={() => setLoginOpen(false)}
      basic
      size="tiny"
      style={{ zIndex: -1 }}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Header as="h1" textAlign="center">
        Login to Gl<span>&#x1f30e;</span>jects now!
      </Header>
      <Modal.Content>
        <div style={{ margin: 10, marginRight: 40, marginLeft: 40 }}>
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
            transparent
            style={{ borderBottom: '1px solid grey' }}
            type="password"
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          inverted
          style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
          onClick={() => handleLogin()}
        >
          Log in
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
