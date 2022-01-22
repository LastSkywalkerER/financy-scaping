import * as React from 'react';
import { useModals } from '@core/hooks/modalsController';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useStyles from './editDialogStyle';

interface Props {
  extString: string;
  action: Function;
}

export default function EditDialog({ extString, action }: Props) {
  const [inputValue, setInputValue] = React.useState(extString);
  const { closeModal } = useModals();
  const { button } = useStyles();

  const handleClose = () => {
    closeModal('EDIT_DIALOG');
  };

  const handleOk = () => {
    if (inputValue !== '' && inputValue) {
      action(inputValue);
    }
    handleClose();
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Name</DialogTitle>
        <DialogContent>
          <DialogContentText>Type new name here.</DialogContentText>
          <TextField
            onInput={(event) =>
              setInputValue(
                event.target instanceof HTMLInputElement
                  ? event.target.value
                  : '',
              )
            }
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={inputValue || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={button} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={button} onClick={handleOk}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
