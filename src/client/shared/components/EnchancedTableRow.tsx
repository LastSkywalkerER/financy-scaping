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
import tickerManager from '@core/utilities/tickerManager';

interface Props {
  row: Token;
  index: number;
  isItemSelected: boolean;
  head: string[];
  editableRow: boolean;
  useSelection: Array<any>;
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
}: Props) {
  const labelId = `enhanced-table-checkbox-${index}`;
  const [editable, setEditable] = React.useState(false);
  const [selected, setSelected] = useSelection;
  const [expectedPrice, setExpectedPrice] = React.useState(row.expectedPrice);
  const { updateTicker } = tickerManager();

  const handleClick = (event, name) => {
    if (editableRow && !!event.target.closest('.' + editClassName)) {
      setEditable(true);
      return;
    }

    if (editableRow && !!event.target.closest('.' + confirmClassName)) {
      if (!isNaN(Number(expectedPrice))) {
        updateTicker(row, expectedPrice);
      }
      setExpectedPrice(row.expectedPrice);
      setEditable(false);
      return;
    }

    if (selected.indexOf(name) === -1) {
      setSelected((state) => [...state, name]);
    } else {
      setSelected((state) =>
        state.filter((selectedName) => selectedName !== name),
      );
    }
  };

  const changeHandler = (event) => {
    setExpectedPrice(event.target.value);
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
          {editable && key === 'expectedPrice' ? (
            <TextField
              variant="outlined"
              key={`${key}-${i}`}
              value={expectedPrice}
              onChange={changeHandler}
            />
          ) : (
            row[key]
          )}
        </TableCell>
      ))}
      {editableRow && (
        <TableCell padding="none">
          {!editable ? (
            <IconButton className={editClassName}>
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton className={confirmClassName}>
              <CheckIcon />
            </IconButton>
          )}
        </TableCell>
      )}
    </TableRow>
  );
}
