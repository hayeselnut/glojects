import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import SignupPage from './components/signupPage/SignupPage';
import GlojectPage from './components/glojectPage.jsx/GlojectPage';
import UserProfilePage from './components/userProfilePage/UserProfilePage';
import NavBar from './components/common/NavBar';
import NewGlojectPage from './components/newGlojectPage/NewGlojectPage';
import World from './components/World';
import 'semantic-ui-css/semantic.min.css';
import ApiPage from './components/apiPage/ApiPage';
import EditGlojectPage from './components/editGlojectPage/EditGlojectPage';

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Switch>
          {console.log("In router")}
          <PrivateRoute path={`${process.env.PUBLIC_URL}/signup`} component={SignupPage} />
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={World} />
          <Route exact path={`${process.env.PUBLIC_URL}/api`} component={ApiPage} />
          <Route exact path={`${process.env.PUBLIC_URL}/g/new`} component={NewGlojectPage} />
          <Route exact path={`${process.env.PUBLIC_URL}/g/:glojectId`} component={GlojectPage} />
          <Route exact path={`${process.env.PUBLIC_URL}/g/:glojectId/edit`} component={EditGlojectPage} />
          <Route exact path={`${process.env.PUBLIC_URL}/u/:uid`} component={UserProfilePage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
