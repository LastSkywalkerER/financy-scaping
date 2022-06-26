import {
  Box,
  Checkbox,
  SortDirection,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import React from 'react'

interface Props {
  onCheckedAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
  order: 'asc' | 'desc' | undefined
  orderBy: string
  numChecked: number
  rowCount: number
  onRequestSort: (event: React.MouseEvent, property: string) => void
  headList: string[]
}

export const EnhancedTableHead: React.FC<Props> = (props) => {
  const { onCheckedAllClick, order, orderBy, numChecked, rowCount, onRequestSort, headList } = props
  const createSortHandler = (property: string) => (event: React.MouseEvent) => {
    onRequestSort(event, property)
  }

  const headCells = headList.map((name: string, i: number) => ({
    id: name,
    label: name.toUpperCase(),
  }))

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="none">
          <Checkbox
            color="primary"
            indeterminate={numChecked > 0 && numChecked < rowCount}
            checked={rowCount > 0 && numChecked === rowCount}
            onChange={onCheckedAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
