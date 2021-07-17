import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const isAuth = true;
  // TODO: setup authorisation
  return isAuth ? (
    <Route path={props.path} component={props.component}></Route>
  ) : (
    <Redirect to="/unauthorised" />
  );
};

export default PrivateRoute;
