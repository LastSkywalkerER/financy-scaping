import useHttp from '@core/hooks/http.hook';
import { useWebSocket } from '@core/hooks/useWebSocket';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { wsPackageTypes } from '../../../../types/wsPackageTypes';
import { messageOccurred } from '@core/store/userMessageSlice';
import { useDispatch } from 'react-redux';

export default function TableUpdatingStatus() {
  const [tableUpdating, setTableUpdating] = useState({
    status: false,
    tickerCount: 0,
    tickerUpdated: 0,
  });

  const dispatch = useDispatch();
  const { sendMessage, subscribe, unsubscribe, status } = useWebSocket();

  const wsSubscription = ({ type, data }) => {
    switch (type) {
      case wsPackageTypes.TABLE_UPDATE_STATUS:
        setTableUpdating(data);
        break;

      case wsPackageTypes.TABLE_UPDATE_REQUEST:
        dispatch(
          messageOccurred({ type: 'success', message: 'Begin updating' }),
        );
        setTableUpdating(data);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    subscribe(wsSubscription);
    sendMessage({ type: wsPackageTypes.TABLE_UPDATE_STATUS });

    return () => unsubscribe(wsSubscription);
  }, []);

  const handleUpdateTable = async () => {
    sendMessage({ type: wsPackageTypes.TABLE_UPDATE_REQUEST });
  };

  const handleStopUpdating = () => {};

  return (
    <Box>
      {tableUpdating.status ? (
        <Button
          disabled={!tableUpdating.status}
          onClick={handleStopUpdating}
          variant="contained"
        >
          Stop updating
        </Button>
      ) : (
        <Button
          disabled={tableUpdating.status}
          onClick={handleUpdateTable}
          variant="contained"
        >
          Update table
        </Button>
      )}
      <Typography>
        {tableUpdating.status
          ? `Updating ${
              (tableUpdating.tickerUpdated / tableUpdating.tickerCount) * 100
            }%`
          : `Latest ${tableUpdating.tickerCount} tickers`}
      </Typography>
    </Box>
  );
}
