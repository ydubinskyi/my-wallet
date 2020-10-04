import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 2, 0),
    marginTop: theme.spacing(2),
  },
}));

function PageWrap({ children, ...rest }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} {...rest}>
      {children}
    </Paper>
  );
}

export { PageWrap };
