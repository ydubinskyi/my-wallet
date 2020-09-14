import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Header from './Header';
import Home from '../pages/Home';

const Layout = () => {
  return (
    <>
      <Header />
      <Container component="main">
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
      <footer></footer>
    </>
  );
};

export default Layout;
