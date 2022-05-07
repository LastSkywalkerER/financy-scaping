import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import useStyles from './index.style';
import TableUpdatingStatus from '@components/tableUpdatingStatus';
import { useSelector } from 'react-redux';
import { RootState } from '@core/store/store';

const Analytics: React.FC = React.memo(() => {
  const { container } = useStyles();
  const { userId } = useSelector((state: RootState) => state.auth.data);

  return (
    <Box sx={container}>
      <a href={`https://t.me/FinancyScrapingBot?start=${userId}`}>Link to tg</a>
      <TableUpdatingStatus />
    </Box>
  );
});

export default Analytics;
