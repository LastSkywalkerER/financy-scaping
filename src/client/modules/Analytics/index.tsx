import React, { Suspense, useEffect, useState } from 'react';
import EnhancedTable from '@components/EnhancedTable';
import Token from 'src/types/Token';
import useHttp from '@core/hooks/http.hook';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@core/store/store';
import TickerManager from '@core/utilities/tickerManager';

const Analytics = () => {
  const data = useSelector((state: RootState) => state.dataTable);
  const savedTickers = useSelector((state: RootState) => state.savedTickers);
  const { getData, getSavedTickers, saveTickers, deleteTickers } =
    TickerManager();

  const [selectedToBuy, setSelectedToBuy] = useState([] as string[]);
  const [selectedToDelete, setSelectedToDelete] = useState([] as string[]);

  const { request } = useHttp();

  useEffect(() => {
    getData();
    getSavedTickers();
  }, []);

  const handleBuyClick = async () => {
    saveTickers(selectedToBuy);
    setSelectedToBuy([]);
  };

  const handleDeleteClick = async () => {
    deleteTickers(selectedToDelete);
    setSelectedToDelete([]);
  };

  const handleUpdateTable = async () => {
    const response = await request('/api/table/update', 'GET');
    console.log(response);
  };

  return (
    <Box>
      <Button onClick={handleUpdateTable} variant="contained">
        Update table
      </Button>
      <Box>
        {!!data.list.length ? (
          <EnhancedTable
            name="Stock Market"
            useSelection={[selectedToBuy, setSelectedToBuy]}
            handleCustomClick={handleBuyClick}
            data={data.list}
            customClickPurpose="Buy"
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </Box>
      <Box>
        {!!savedTickers.list.length ? (
          <EnhancedTable
            name="Purchaised Tokens"
            useSelection={[selectedToDelete, setSelectedToDelete]}
            handleCustomClick={handleDeleteClick}
            data={savedTickers.list}
            customClickPurpose="Delete"
            editableRow
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </Box>
    </Box>
  );
};

export default Analytics;
