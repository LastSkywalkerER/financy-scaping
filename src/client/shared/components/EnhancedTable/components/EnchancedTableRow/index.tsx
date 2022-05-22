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
  useSelection: Array<any>;
  conditionallyRenderedCell?: (
    column: string,
    value: any,
    index: number,
    row: Token,
  ) => React.ReactElement | string | number | null;
}

export const EnchancedTableRow: React.FC<Props> = ({
  row,
  index,
  isItemSelected,
  head,
  useSelection,
  conditionallyRenderedCell,
}) => {
  const labelId = `enhanced-table-checkbox-${index}`;
  const [selected, setSelected] = useSelection;

  const handleClick = (event: React.MouseEvent) => {
    const name = row.symbol;

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
      onClick={handleClick}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      <TableCell>
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
        >
          {conditionallyRenderedCell
            ? conditionallyRenderedCell(key, row[key], index, row)
            : row[key]}
        </TableCell>
      ))}
    </TableRow>
  );
};
