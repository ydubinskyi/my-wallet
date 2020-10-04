import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PrivateRoute, PublicOnlyRoute } from './shared';
import Header from './core/components/header';

// pages
import Home from './home/home.view';
import Login from './auth/login.view';
const Accounts = React.lazy(() => import('./accounts/accounts.view'));
const Records = React.lazy(() => import('./records/records.view'));
const Register = React.lazy(() => import('./auth/register.view'));

const FallbackLoader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      width={'100%'}
      py={8}
    >
      <CircularProgress />
    </Box>
  );
};

export const App = () => {
  return (
    <>
      <Header />
      <Container component="main">
        <Suspense fallback={<FallbackLoader />}>
          <Switch>
            <PublicOnlyRoute path="/login">
              <Login />
            </PublicOnlyRoute>
            <PublicOnlyRoute path="/register">
              <Register />
            </PublicOnlyRoute>

            <PrivateRoute path="/accounts">
              <Accounts />
            </PrivateRoute>

            <PrivateRoute path="/records">
              <Records />
            </PrivateRoute>

            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Container>
      <footer></footer>
    </>
  );
};

export default App;
