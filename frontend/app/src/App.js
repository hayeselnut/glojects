import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { StoreProvider } from './utils/store';

import PrivateRoute from './PrivateRoute';
import LandingPage from './components/landingPage/LandingPage';
import SignupPage from './components/signupPage/SignupPage';
import GlojectPage from './components/glojectPage.jsx/GlojectPage';
import UserProfilePage from './components/userProfilePage/UserProfilePage';
import NewGlojectPage from './components/newGlojectPage/NewGlojectPage';

import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/signup" component={SignupPage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path='/g/new' component={NewGlojectPage} />
          <Route exact path='/g/:glojectId' component={GlojectPage} />
          <Route exact path='/u/:username' component={UserProfilePage} />
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
