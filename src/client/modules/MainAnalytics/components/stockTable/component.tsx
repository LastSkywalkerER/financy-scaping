import React, { useEffect, useState } from 'react';
import EnhancedTable from '@components/EnhancedTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/store/store';
import TickerManager from '@core/utilities/tickerManager';
import { setFilteredDataTable } from '@core/store/dataTableSlice';
import { headList } from './tableConfig';

export const StockTable: React.FC = React.memo(() => {
  const data = useSelector((state: RootState) => state.dataTable);

  const { getData, getSavedTickers, saveTickers } = TickerManager();
  const dispatch = useDispatch();

  const [selectedToBuy, setSelectedToBuy] = useState([] as string[]);

  useEffect(() => {
    getData();
    getSavedTickers();
  }, []);

  const filterTable = (actionCreator, data) => (filteredTable) => {
    console.log(filteredTable(data));

    dispatch(actionCreator({ filteredList: filteredTable(data) }));
  };

  const handleBuyClick = async () => {
    saveTickers(selectedToBuy);
    setSelectedToBuy([]);
  };

  return (
    <EnhancedTable
      name="Stock Market"
      useSelection={[selectedToBuy, setSelectedToBuy]}
      handleCustomClick={handleBuyClick}
      data={data.filteredList}
      customClickPurpose="Buy"
      handleFilter={filterTable(setFilteredDataTable, data.list)}
      headList={headList}
    />
  );
});
