import { ActionCreator } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EnhancedTable } from '@/components/EnhancedTable'
import { TableFilter } from '@/components/EnhancedTable/types'
import { setFilteredDataTable } from '@/core/store/dataTableSlice'
import { addSavedTickersRequest } from '@/core/store/savedTickersSlice'
import { RootState } from '@/core/store/store'
import Token from '@/types/Token'

import { headList } from './tableConfig'

export const StockTable: React.FC = React.memo(() => {
  const { list, filteredList, isLoaded } = useSelector((state: RootState) => state.dataTable)

  const dispatch = useDispatch()

  const [selectedToBuy, setSelectedToBuy] = useState<Token[]>([])

  const filterTable =
    (actionCreator: ActionCreator<any>, data: Token[]) => (filteredTable: TableFilter) => {
      dispatch(actionCreator({ filteredList: filteredTable(data) }))
    }

  const handleBuyClick = async () => {
    dispatch(addSavedTickersRequest(selectedToBuy))
    setSelectedToBuy([])
  }

  return (
    <EnhancedTable
      isLoading={!isLoaded}
      name="Stock Market"
      checked={selectedToBuy}
      setChecked={setSelectedToBuy}
      handleCustomClick={handleBuyClick}
      data={filteredList}
      customClickPurpose="Buy"
      handleFilter={filterTable(setFilteredDataTable, list)}
      headList={headList}
    />
  )
})
