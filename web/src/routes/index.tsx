import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import SignUp from '../pages/Login/SignUp';
import Todo from '../pages/Todo';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/app" component={Todo} isPrivate />
    </Switch>
  );
};

export default Routes;
