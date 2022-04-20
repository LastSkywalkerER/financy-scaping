import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import TickerManager from '@core/utilities/tickerManager';
import useStyles from './index.style';
import { SavedTable } from './components/savedTable';

export const SavedAnalytics: React.FC = React.memo(() => {
  const { getSavedTickers } = TickerManager();
  const { container } = useStyles();

  useEffect(() => {
    getSavedTickers();
  }, []);

  return (
    <Box sx={container}>
      <Box sx={{ width: '100%' }}>
        <SavedTable />
      </Box>
    </Box>
  );
});
