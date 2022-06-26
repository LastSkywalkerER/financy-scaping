import FilledInput from '@mui/material/FilledInput'
import React, { ChangeEventHandler } from 'react'

import Token from '@/types/Token'

type Props = {
  data: Token[]
  updateDataTable: (callback: (data: Token[]) => Token[]) => void
  filterKey?: keyof Token
}

export default function Filter({ data, updateDataTable, filterKey = 'sector' }: Props) {
  const filterList = new Set()
  data.forEach((obj: Token) => filterList.add(obj[filterKey]))

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateDataTable((data: Token[]) => [
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
