/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />

        <Route path="/signup" component={Signup} />

        <Route path="/profile" component={Profile} />

        <Route path="/incidents/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}
