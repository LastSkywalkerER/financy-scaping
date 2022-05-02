import React, { useEffect, useState } from 'react';
import EnhancedTable from '@components/EnhancedTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/store/store';
import { setFilteredDataTable } from '@core/store/dataTableSlice';
import { headList } from './tableConfig';
import { addSavedTickersRequest } from '@core/store/savedTickersSlice';

export const StockTable: React.FC = React.memo(() => {
  const { list, filteredList } = useSelector(
    (state: RootState) => state.dataTable,
  );

  const dispatch = useDispatch();

  const [selectedToBuy, setSelectedToBuy] = useState([] as string[]);

  const filterTable = (actionCreator, data) => (filteredTable) => {
    dispatch(actionCreator({ filteredList: filteredTable(data) }));
  };

  const handleBuyClick = async () => {
    dispatch(
      addSavedTickersRequest(
        list.filter((ticker) =>
          selectedToBuy.some((symbol) => symbol === ticker.symbol),
        ),
      ),
    );
    setSelectedToBuy([]);
  };

  return (
    <EnhancedTable
      name="Stock Market"
      useSelection={[selectedToBuy, setSelectedToBuy]}
      handleCustomClick={handleBuyClick}
      data={filteredList}
      customClickPurpose="Buy"
      handleFilter={filterTable(setFilteredDataTable, list)}
      headList={headList}
    />
  );
});
