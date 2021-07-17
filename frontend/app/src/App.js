import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { StoreProvider } from './utils/store';

import PrivateRoute from './PrivateRoute';
import LandingPage from './components/landingPage/LandingPage';
import SignupPage from './components/signupPage/SignupPage';
import World from './components/World';
import Moon from './components/Moon';

import './App.css';

function App() {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/signup" component={SignupPage} />
          <Route path="/World" component={World}/>
          <Route path="/Moon" component={Moon}/>
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
