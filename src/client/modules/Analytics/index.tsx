import React, { useEffect, useState } from 'react';
import EnhancedTable from '@components/EnhancedTable';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '@core/store/store';
import TickerManager from '@core/utilities/tickerManager';
import useStyles from './index.style';
import TableUpdatingStatus from '@components/tableUpdatingStatus';

const Analytics = () => {
  const data = useSelector((state: RootState) => state.dataTable);
  const savedTickers = useSelector((state: RootState) => state.savedTickers);
  const { getData, getSavedTickers, saveTickers, deleteTickers } =
    TickerManager();

  const { container } = useStyles();

  const [selectedToBuy, setSelectedToBuy] = useState([] as string[]);
  const [selectedToDelete, setSelectedToDelete] = useState([] as string[]);

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

  return (
    <Box sx={container}>
      <TableUpdatingStatus />
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
