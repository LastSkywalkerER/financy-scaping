import React, { useEffect, useState } from 'react';
import EnhancedTable from '@components/EnhancedTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/store/store';
import TickerManager from '@core/utilities/tickerManager';
import { setFilteredSavedTickers } from '@core/store/savedTickersSlice';
import { headList } from './tableConfig';
import { conditionallyRenderedCell } from './conditionallyRenderedCell';

export const SavedTable: React.FC = React.memo(() => {
  const savedTickers = useSelector((state: RootState) => state.savedTickers);

  const { getData, getSavedTickers, deleteTickers } = TickerManager();
  const dispatch = useDispatch();

  const [selectedToDelete, setSelectedToDelete] = useState([] as string[]);

  useEffect(() => {
    getData();
    getSavedTickers();
  }, []);

  const filterTable = (actionCreator, data) => (filteredTable) => {
    console.log(filteredTable(data));

    dispatch(actionCreator({ filteredList: filteredTable(data) }));
  };

  const handleDeleteClick = async () => {
    deleteTickers(selectedToDelete);
    setSelectedToDelete([]);
  };

  return (
    <EnhancedTable
      name="Purchaised Tokens"
      useSelection={[selectedToDelete, setSelectedToDelete]}
      handleCustomClick={handleDeleteClick}
      data={savedTickers.filteredList}
      customClickPurpose="Delete"
      handleFilter={filterTable(setFilteredSavedTickers, savedTickers.list)}
      editableRow
      headList={headList}
      conditionallyRenderedCell={conditionallyRenderedCell}
    />
  );
});
