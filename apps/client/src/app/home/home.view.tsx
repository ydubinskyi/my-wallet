import React from 'react';

import Typography from '@material-ui/core/Typography';

import { PageWrap } from '../shared';

const Home = () => {
  return (
    <PageWrap>
      <Typography component="h1" variant="h5">
        Dashboard
      </Typography>
      <br />
    </PageWrap>
  );
};

export default Home;
