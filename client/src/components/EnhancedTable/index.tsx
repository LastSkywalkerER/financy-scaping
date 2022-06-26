import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React, { useState } from 'react'

import { EnhancedTableHead } from '@/components/EnhancedTable/components/enhancedTableHead'
import { EnhancedTableToolbar } from '@/components/EnhancedTable/components/EnhancedTableToolbar'

import Filter from '../Filter'
import { EnchancedTableRow } from './components/EnchancedTableRow'
import { useStyles } from './styles'
import { TableProps } from './types'

export const EnhancedTable: React.FC<TableProps> = ({
  isLoading,
  name,
  handleCustomClick,
  onRowClick,
  checked,
  setChecked,
  data = [],
  customClickPurpose,
  handleFilter,
  headList,
  conditionallyRenderedCell,
}) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [selected, setSelected] = useState<Data>({})

  const { classes } = useStyles()

  function descendingComparator(a, b, orderBy) {
    if (!isNaN(parseInt(a[orderBy])) && !isNaN(parseInt(b[orderBy]))) {
      if (parseInt(a[orderBy]) < parseInt(b[orderBy])) {
        return -1
      }
      if (parseInt(a[orderBy]) > parseInt(b[orderBy])) {
        return 1
      }
    } else {
      if (a[orderBy] < b[orderBy]) {
        return -1
      }
      if (a[orderBy] > b[orderBy]) {
        return 1
      }
    }
    // a должно быть равным b
    return 0
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleCheckAllClick = (event) => {
    if (event.target.checked) {
      setChecked(data)
      return
    }
    setChecked([])
  }

  const handleCheck = (row: Data, checked: boolean) => {
    if (checked) {
      setChecked((oldState) => [...oldState, row])
    } else {
      setChecked((oldState) => oldState.filter((oldRow) => oldRow.id !== row.id))
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = (row: Data) => {
    setSelected(row)
    onRowClick && onRowClick(row)
  }

  const isSelected = (row: Data) => selected.id === row.id
  const isChecked = (row: Data) => checked.some((selectedRow) => selectedRow.id === row.id)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  return (
    <Paper className={classes.container}>
      <EnhancedTableToolbar
        numChecked={checked.length}
        customClickPurpose={customClickPurpose}
        name={name}
        handleCustomClick={handleCustomClick}
      />
      <TableContainer className={classes.tableContainer}>
        {isLoading ? (
          <Box className={classes.loadingWrapper}>
            <CircularProgress />
          </Box>
        ) : (
          <Table stickyHeader sx={{ minWidth: 500 }} aria-labelledby="sticky table" size={'small'}>
            <EnhancedTableHead
              numChecked={checked.length}
              order={order}
              orderBy={orderBy}
              onCheckAllClick={handleCheckAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              headList={headList}
            />
            <TableBody>
              {data
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <EnchancedTableRow
                    key={row.id}
                    row={row}
                    index={index}
                    isItemSelected={isSelected(row)}
                    isItemChecked={isChecked(row)}
                    head={headList}
                    onRowClick={handleRowClick}
                    onCheckBoxClick={handleCheck}
                    conditionallyRenderedCell={conditionallyRenderedCell}
                  />
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <div className={classes.footer}>
        <Filter data={data} updateDataTable={handleFilter} />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { value: -1, label: 'All' }]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  )
}
