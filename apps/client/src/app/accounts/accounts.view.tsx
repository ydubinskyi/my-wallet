import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import CreateAccountDialog from './createAccountDialog';
import { CardListItem, PageWrap } from '../shared';
import { useAccountsSearch } from '../core/hooks/accounts';
import { useClient } from '../core/hooks/useClient';

const Accounts = () => {
  const { data, isLoading, refresh } = useAccountsSearch();
  const client = useClient();
  const [createDialogStatus, setCreateDialogStatus] = useState(false);

  const createNewAccount = (formData) => {
    client('accounts', {
      data: formData,
    });
  };

  return (
    <PageWrap>
      <CreateAccountDialog
        open={createDialogStatus}
        onClose={() => setCreateDialogStatus(false)}
        onSubmit={(formData) => {
          createNewAccount(formData);
          refresh();
        }}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Typography component="h1" variant="h5">
          Accounts
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogStatus(true)}
        >
          Create account
        </Button>
      </Box>

      {!isLoading &&
        data?.map((item) => (
          <CardListItem
            key={item.id}
            icon={
              <AccountBalanceIcon
                fontSize="large"
                style={{ color: item.accent_color }}
              />
            }
          >
            <Typography variant="h4">{item.name}</Typography>
            <Typography>{item.description}</Typography>
            <Typography>{item.balance}</Typography>
          </CardListItem>
        ))}
    </PageWrap>
  );
};

export default Accounts;
