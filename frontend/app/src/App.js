import logo from './logo.svg';
import './App.css';
import { signup, resendVerification, login, logout } from './firebase/auth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => signup('vickywu2118@gmail.com', 'test1234')}>
          Sign up
        </button>
        <button onClick={() => login('vickywu2118@gmail.com', 'test1234')}>
          Login
        </button>
        <button onClick={() => resendVerification('vickywu2118@gmail.com')}>
          Resend
        </button>
        <button onClick={() => logout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
