import { ActionCreator } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EnhancedTable } from '@/components/EnhancedTable'
import { TableFilter } from '@/components/EnhancedTable/types'
import {
  removeSavedTickersRequest,
  setFilteredSavedTickersRequest,
} from '@/core/store/savedTickersSlice'
import { RootState } from '@/core/store/store'
import Token from '@/types/Token'

import { ConditionallyRenderedCell } from './conditionallyRenderedCell'
import { headList } from './tableConfig'

export const SavedTable: React.FC = React.memo(() => {
  const { filteredList, list, isLoaded } = useSelector((state: RootState) => state.savedTickers)

  const dispatch = useDispatch()

  const [selectedToDelete, setSelectedToDelete] = useState([] as string[])

  const filterTable =
    (actionCreator: ActionCreator<any>, data: Token[]) => (filteredTable: TableFilter) => {
      dispatch(actionCreator({ filteredList: filteredTable(data) }))
    }

  const handleDeleteClick = async () => {
    dispatch(removeSavedTickersRequest(selectedToDelete))
    setSelectedToDelete([])
  }

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
      conditionallyRenderedCell={ConditionallyRenderedCell}
    />
  )
})
