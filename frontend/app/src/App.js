import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { StoreProvider } from './utils/store';

import PrivateRoute from './PrivateRoute';
import LandingPage from './components/landingPage/LandingPage';
import SignupPage from './components/signupPage/SignupPage';
import World from './components/World';
import Moon from './components/Moon';
import GlojectPage from './components/glojectPage.jsx/GlojectPage';

import './App.css';
import { signup, resendVerification, login, logout } from './firebase/auth';
import UserProfilePage from './components/userProfilePage/UserProfilePage';

function App() {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/signup" component={SignupPage} />
          <Route path="/World" component={World}/>
          <Route path="/Moon" component={Moon}/>
          <Route path="/" component={LandingPage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path='/g/:glojectid' component={GlojectPage} />
          <Route exact path='/u/:username' component={UserProfilePage} />
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
