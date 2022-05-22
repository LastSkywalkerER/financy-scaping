import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { useStyles } from './styles';
import { StockTable } from './components/stockTable';
import { useDispatch } from 'react-redux';
import { getMainTableRequest } from '@core/store/dataTableSlice';

export const MainAnalytics: React.FC = React.memo(() => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainTableRequest());
  }, []);

  return (
    <Box className={classes.container}>
      <StockTable />
    </Box>
  );
});
