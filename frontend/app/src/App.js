import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StoreProvider } from './utils/store';

import PrivateRoute from './PrivateRoute';
import LandingPage from './components/landingPage/LandingPage';
import SignupPage from './components/signupPage/SignupPage';
import GlojectPage from './components/glojectPage.jsx/GlojectPage';
import UserProfilePage from './components/userProfilePage/UserProfilePage';
import NavBar from './components/common/NavBar';
import NewGlojectPage from './components/newGlojectPage/NewGlojectPage';
import World from './components/World';
import 'semantic-ui-css/semantic.min.css';
import ApiPage from './components/apiPage/ApiPage';

function App() {
  return (
    <StoreProvider>
      <NavBar />
      <Router>
        <Switch>
          <PrivateRoute path="/signup" component={SignupPage} />
          <Route exact path="/World" component={World} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/api" component={ApiPage} />
          <Route exact path="/g/new" component={NewGlojectPage} />
          <Route exact path="/g/:glojectId" component={GlojectPage} />
          <Route exact path="/u/:uid" component={UserProfilePage} />
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
