// @ts-nocheck

import * as React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import EnhancedTableHead from '@components/EnhancedTable/components/enhancedTableHead';
import EnhancedTableToolbar from '@components/EnhancedTable/components/EnhancedTableToolbar';
import Filter from '../Filter';
import EnchancedTableRow from './components/EnchancedTableRow';

type Props = {
  name: string;
  useSelection: any;
  handleCustomClick: any;
  data: any;
  customClickPurpose: any;
  editableRow?: any;
  handleFilter: any;
  headList: string[] | { [key: string]: string };
  conditionallyRenderedCell?: (
    column: string,
    value: any,
    index: number,
    row: Token,
  ) => React.ReactElement | string | number | null;
};

export default function EnhancedTable({
  name,
  useSelection,
  handleCustomClick,
  data,
  customClickPurpose,
  editableRow = false,
  handleFilter,
  headList,
  conditionallyRenderedCell,
}: Props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = useSelection;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function descendingComparator(a, b, orderBy) {
    if (!isNaN(parseInt(a[orderBy])) && !isNaN(parseInt(b[orderBy]))) {
      if (parseInt(a[orderBy]) < parseInt(b[orderBy])) {
        return -1;
      }
      if (parseInt(a[orderBy]) > parseInt(b[orderBy])) {
        return 1;
      }
    } else {
      if (a[orderBy] < b[orderBy]) {
        return -1;
      }
      if (a[orderBy] > b[orderBy]) {
        return 1;
      }
    }
    // a должно быть равным b
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.symbol);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          customClickPurpose={customClickPurpose}
          name={name}
          handleCustomClick={handleCustomClick}
        />
        <TableContainer sx={{ maxHeight: '70vh' }}>
          <Table
            stickyHeader
            sx={{ minWidth: 500 }}
            aria-labelledby="sticky table"
            size={'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
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
                    isItemSelected={isSelected(row.symbol)}
                    head={headList}
                    editableRow={editableRow}
                    useSelection={useSelection}
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
        </TableContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
    </Box>
  );
}
