import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import Token from 'src/types/Token';

interface Props {
  row: Token;
  index: number;
  isItemSelected: boolean;
  head: string[];
  editableRow: boolean;
  useSelection: Array<any>;
  conditionallyRenderedCell?: (
    column: string,
    value: any,
    index: number,
    row: Token,
  ) => React.ReactElement | string | number | null;
}

const editClassName = 'edit-row';
const confirmClassName = 'confirm-row';

export default function EnchancedTableRow({
  row,
  index,
  isItemSelected,
  head,
  editableRow,
  useSelection,
  conditionallyRenderedCell,
}: Props) {
  const labelId = `enhanced-table-checkbox-${index}`;
  const [selected, setSelected] = useSelection;

  const handleClick = (event, name) => {
    if (selected.indexOf(name) === -1) {
      setSelected((state) => [...state, name]);
    } else {
      setSelected((state) =>
        state.filter((selectedName) => selectedName !== name),
      );
    }
  };

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.symbol)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      <TableCell padding="none">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      {head.map((key: string, i: number) => (
        <TableCell
          key={`${key}-${i}`}
          align={
            key !== 'symbol' && key !== 'sector' && i !== 0 ? 'right' : 'left'
          }
          padding="none"
        >
          {conditionallyRenderedCell
            ? conditionallyRenderedCell(key, row[key], index, row)
            : row[key]}
        </TableCell>
      ))}
    </TableRow>
  );
}
