import React, { useEffect, useState } from 'react';
import { EnhancedTable } from '@components/EnhancedTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/store/store';
import {
  removeSavedTickersRequest,
  setFilteredSavedTickersRequest,
} from '@core/store/savedTickersSlice';
import { headList } from './tableConfig';
import { conditionallyRenderedCell } from './conditionallyRenderedCell';
import { ActionCreator, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import Token from 'src/types/Token';
import { TableFilter } from '@components/EnhancedTable/types';

export const SavedTable: React.FC = React.memo(() => {
  const { filteredList, list, isLoaded } = useSelector(
    (state: RootState) => state.savedTickers,
  );

  const dispatch = useDispatch();

  const [selectedToDelete, setSelectedToDelete] = useState([] as string[]);

  const filterTable =
    (actionCreator: ActionCreator<any>, data: Token[]) =>
    (filteredTable: TableFilter) => {
      dispatch(actionCreator({ filteredList: filteredTable(data) }));
    };

  const handleDeleteClick = async () => {
    dispatch(removeSavedTickersRequest(selectedToDelete));
    setSelectedToDelete([]);
  };

  return (
    <EnhancedTable
      isLoading={!isLoaded}
      name="Purchaised Tokens"
      checked={selectedToDelete}
      setChecked={setSelectedToDelete}
      handleCustomClick={handleDeleteClick}
      data={filteredList}
      customClickPurpose="Delete"
      handleFilter={filterTable(setFilteredSavedTickersRequest, list)}
      editableRow
      headList={headList}
      conditionallyRenderedCell={conditionallyRenderedCell}
    />
  );
});
