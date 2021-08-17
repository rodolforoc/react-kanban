import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from './Context/AuthContext';
import Login from './pages/Login';
import Users from './pages/Users';
import Board from './pages/Board';
import Task from './pages/Task';
import EditTask from './pages/EditTask';
import Planning from './pages/Planning';


function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/" component={Login} />
      <CustomRoute isPrivate exact path="/users" component={Users} />
      <CustomRoute isPrivate exact path="/board" component={Board} />
      <CustomRoute isPrivate exact path="/task" component={Task} />
      <CustomRoute isPrivate exact path="/task/:id" component={EditTask} />
      <CustomRoute isPrivate exact path="/planning" component={Planning} />
    </Switch>
  );
}
