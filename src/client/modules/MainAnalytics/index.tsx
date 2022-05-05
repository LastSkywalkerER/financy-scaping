import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import TickerManager from '@core/utilities/tickerManager';
import useStyles from './index.style';
import { StockTable } from './components/stockTable';
import { useDispatch } from 'react-redux';
import { getMainTableRequest } from '@core/store/dataTableSlice';

export const MainAnalytics: React.FC = React.memo(() => {
  const { container } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainTableRequest());
  }, []);

  return (
    <Box sx={container}>
      <Box sx={{ width: '100%' }}>
        <StockTable />
      </Box>
    </Box>
  );
});
