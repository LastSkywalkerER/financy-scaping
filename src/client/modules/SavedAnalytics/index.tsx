import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { useStyles } from './styles';
import { SavedTable } from './components/savedTable';
import { useDispatch } from 'react-redux';
import { getSavedTickersRequest } from '@core/store/savedTickersSlice';

export const SavedAnalytics: React.FC = React.memo(() => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedTickersRequest());
  }, []);

  return (
    <Box className={classes.container}>
      <SavedTable />
    </Box>
  );
});
