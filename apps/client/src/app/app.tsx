import React from 'react';
import { Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Header from './core/components/header';
import Home from './home/home.view';
import Login from './auth/login.view';
import Register from './auth/register.view';
import { PrivateRoute, PublicOnlyRoute } from './shared';

export const App = () => {
  return (
    <>
      <Header />
      <Container component="main">
        <Switch>
          <PublicOnlyRoute path="/login">
            <Login />
          </PublicOnlyRoute>
          <PublicOnlyRoute path="/register">
            <Register />
          </PublicOnlyRoute>

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
