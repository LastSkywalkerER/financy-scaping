import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import useStyles from './index.style';
import TableUpdatingStatus from '@components/tableUpdatingStatus';

const Analytics: React.FC = React.memo(() => {
  const { container } = useStyles();

  return (
    <Box sx={container}>
      <TableUpdatingStatus />
    </Box>
  );
});

export default Analytics;
