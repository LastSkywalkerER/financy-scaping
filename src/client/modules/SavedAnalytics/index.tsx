import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import useStyles from './index.style';
import { SavedTable } from './components/savedTable';
import { useDispatch } from 'react-redux';
import { getSavedTickersRequest } from '@core/store/savedTickersSlice';

export const SavedAnalytics: React.FC = React.memo(() => {
  const { container } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedTickersRequest());
  }, []);

  return (
    <Box sx={container}>
      <Box sx={{ width: '100%' }}>
        <SavedTable />
      </Box>
    </Box>
  );
});
