import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Box,
  SortDirection,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React from 'react';

interface Props {
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  order: 'asc' | 'desc' | undefined;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (event: React.MouseEvent, property: string) => void;
  headList: string[];
}

export const EnhancedTableHead: React.FC<Props> = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headList,
  } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent) => {
    onRequestSort(event, property);
  };

  const headCells = headList.map((name: string, i: number) => ({
    id: name,
    numeric: name !== 'symbol' && name !== 'sector' && i !== 0 ? true : false,
    label: name.toUpperCase(),
  }));

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="none">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
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
  );
};
