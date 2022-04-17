import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import TickerManager from '@core/utilities/tickerManager';
import useStyles from './index.style';
import { StockTable } from './components/stockTable';

export const MainAnalytics: React.FC = React.memo(() => {
  const { getData } = TickerManager();
  const { container } = useStyles();

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={container}>
      <Box sx={{ width: '100%' }}>
        <StockTable />
      </Box>
    </Box>
  );
});
