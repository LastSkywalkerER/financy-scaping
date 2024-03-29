import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useStyles } from './styles';
import TableUpdatingStatus from '@components/tableUpdatingStatus';
import { useSelector } from 'react-redux';
import { RootState } from '@core/store/store';

const Analytics: React.FC = React.memo(() => {
  const { classes } = useStyles();
  const { userId } = useSelector((state: RootState) => state.auth.data);

  return (
    <Box className={classes.container}>
      <a href={`https://t.me/FinancyScrapingBot?start=${userId}`}>Link to tg</a>
      <TableUpdatingStatus />
    </Box>
  );
});

export default Analytics;
