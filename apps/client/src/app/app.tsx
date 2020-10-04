import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Header from './core/components/header';
import Home from './home/home.view';
import Login from './auth/login.view';
import Register from './auth/register.view';
import { PrivateRoute } from './shared/components/private-route';

export const App = () => {
  return (
    <>
      <Header />
      <Container component="main">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </Container>
      <footer></footer>
    </>
  );
};

export default App;
