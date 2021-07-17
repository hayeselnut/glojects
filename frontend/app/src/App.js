import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { StoreProvider } from './utils/store';

import PrivateRoute from './PrivateRoute';
import LandingPage from './components/landingPage/LandingPage';
import SignupPage from './components/signupPage/SignupPage';

import './App.css';

function App() {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/signup" component={SignupPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
