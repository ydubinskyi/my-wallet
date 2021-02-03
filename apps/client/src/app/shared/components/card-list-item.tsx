import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const CardListItem = ({ children, icon }) => {
  return (
    <Box py={2} width="100%">
      <Paper variant="outlined" square>
        <Box
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>{children}</Box>

          {icon ? icon : null}
        </Box>
      </Paper>
    </Box>
  );
};

export { CardListItem };
