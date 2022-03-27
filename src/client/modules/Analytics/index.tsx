import React, { useEffect, useState } from 'react';
import EnhancedTable from '@components/EnhancedTable';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/store/store';
import TickerManager from '@core/utilities/tickerManager';
import useStyles from './index.style';
import TableUpdatingStatus from '@components/tableUpdatingStatus';
import { setFilteredDataTable } from '@core/store/dataTableSlice';
import { setFilteredSavedTickers } from '@core/store/savedTickersSlice';
import { useAuth } from '@core/hooks/useAuth';

const Analytics: React.FC = React.memo(() => {
  const data = useSelector((state: RootState) => state.dataTable);
  const savedTickers = useSelector((state: RootState) => state.savedTickers);

  const { getData, getSavedTickers, saveTickers, deleteTickers } =
    TickerManager();
  const dispatch = useDispatch();
  const { container } = useStyles();

  const [selectedToBuy, setSelectedToBuy] = useState([] as string[]);
  const [selectedToDelete, setSelectedToDelete] = useState([] as string[]);

  useEffect(() => {
    getData();
    getSavedTickers();
  }, []);

  const filterTable = (actionCrator, data) => (filteredTable) => {
    console.log(filteredTable(data));

    dispatch(actionCrator({ filteredList: filteredTable(data) }));
  };

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
      <Box sx={{ width: '100%' }}>
        <EnhancedTable
          name="Stock Market"
          useSelection={[selectedToBuy, setSelectedToBuy]}
          handleCustomClick={handleBuyClick}
          data={data.filteredList}
          customClickPurpose="Buy"
          handleFilter={filterTable(setFilteredDataTable, data.list)}
        />
      </Box>
      <Box sx={{ width: '100%' }}>
        <EnhancedTable
          name="Purchaised Tokens"
          useSelection={[selectedToDelete, setSelectedToDelete]}
          handleCustomClick={handleDeleteClick}
          data={savedTickers.filteredList}
          customClickPurpose="Delete"
          handleFilter={filterTable(setFilteredSavedTickers, savedTickers.list)}
          editableRow
        />
      </Box>
    </Box>
  );
});

export default Analytics;
