import FilledInput from '@mui/material/FilledInput'
import React, { ChangeEventHandler } from 'react'

import { Data } from './EnhancedTable/types'

type Props = {
  data: Data[]
  updateDataTable: (callback: (data: Data[]) => Data[]) => void
  filterKey?: keyof Data
}

export default function Filter({ data, updateDataTable, filterKey = 'sector' }: Props) {
  const filterList = new Set()
  data.forEach((obj: Data) => filterList.add(obj[filterKey]))

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateDataTable((data: Data[]) => [
      ...data.filter((elem) => elem[filterKey].includes(event.target.value)),
    ])
  }

  return (
    <div>
      <FilledInput
        onChange={handleSearch}
        inputProps={{
          list: 'options',
          placeholder: `Search ${filterKey}`,
        }}
      />
      <datalist id="options">
        {[...filterList].map((filterItem: any) => (
          <option key={filterItem} value={filterItem}></option>
        ))}
      </datalist>
    </div>
  )
}
