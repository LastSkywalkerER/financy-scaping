import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import useStyles from './index.style';
import TableUpdatingStatus from '@components/tableUpdatingStatus';
import { useAuth } from '@core/hooks/useAuth';
import { encode, decode } from 'js-base64';

const Analytics: React.FC = React.memo(() => {
  const { container } = useStyles();
  const { userId } = useAuth();

  return (
    <Box sx={container}>
      <a href={`https://t.me/FinancyScrapingBot?start=${userId}`}>Link to tg</a>
      <TableUpdatingStatus />
    </Box>
  );
});

export default Analytics;
