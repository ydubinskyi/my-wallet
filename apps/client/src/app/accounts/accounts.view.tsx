import React from 'react';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import { PageWrap } from '../shared';
import { useAccountsSearch } from '../core/hooks/accounts';
import { Box } from '@material-ui/core';

const Accounts = () => {
  const { data, isLoading, refresh } = useAccountsSearch();
  return (
    <PageWrap>
      <Typography component="h1" variant="h5">
        Accounts
      </Typography>
      <button
        onClick={() => {
          console.log('clicked');
          refresh();
        }}
      >
        Refresh
      </button>
      <br />
      {!isLoading &&
        data?.map((item) => (
          <Paper key={item.id}>
            <Box p={2}>
              <Typography variant="h4">{item.name}</Typography>
              <Typography>{item.description}</Typography>
              <Typography>{item.balance}</Typography>
            </Box>
          </Paper>
        ))}
      <Paper></Paper>
    </PageWrap>
  );
};

export default Accounts;
