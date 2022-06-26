import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import { Checkbox, IconButton, TableCell, TableRow, TextField } from '@mui/material'
import React from 'react'

import { Data } from '../../types'

interface Props {
  row: Data
  index: number
  isItemSelected: boolean
  isItemChecked: boolean
  head: string[]
  onRowClick: (row: Data) => void
  onCheckBoxClick: (row: Data, checked: boolean) => void
  conditionallyRenderedCell?: (
    column: string,
    value: any,
    index: number,
    row: Data,
  ) => React.ReactElement | string | number | null
}

export const EnchancedTableRow: React.FC<Props> = ({
  row,
  index,
  isItemSelected,
  isItemChecked,
  head,
  onRowClick,
  onCheckBoxClick,
  conditionallyRenderedCell,
}) => {
  const labelId = `enhanced-table-checkbox-${index}`

  const handleRowClick = () => {
    onRowClick(row)
  }

  const handleCheckBoxChange = () => {
    onCheckBoxClick(row, !isItemChecked)
  }

  return (
    <TableRow
      hover
      onClick={handleRowClick}
      role="checkbox"
      aria-checked={isItemChecked}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      <TableCell>
        <Checkbox
          color="primary"
          checked={isItemChecked}
          onChange={handleCheckBoxChange}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      {head.map((key: string, i: number) => (
        <TableCell key={`${key}-${i}`}>
          {conditionallyRenderedCell
            ? conditionallyRenderedCell(key, row[key], index, row)
            : row[key]}
        </TableCell>
      ))}
    </TableRow>
  )
}
