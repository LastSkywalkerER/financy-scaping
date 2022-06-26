import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import React, { FC } from 'react'

import { useModals } from '@/core/hooks/modalsController'

import { useStyles } from './styles'

export interface Props {
  extString: string
  action: (args: string) => void
}

export const EditDialog: FC<Props> = ({ extString, action }: Props) => {
  const [inputValue, setInputValue] = React.useState(extString)
  const { closeModal } = useModals()
  const { classes } = useStyles()

  const handleClose = () => {
    closeModal('EDIT_DIALOG')
  }

  const handleOk = () => {
    if (inputValue !== '' && inputValue) {
      action(inputValue)
    }
    handleClose()
  }

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Name</DialogTitle>
        <DialogContent>
          <DialogContentText>Type new name here.</DialogContentText>
          <TextField
            onInput={(event) =>
              setInputValue(event.target instanceof HTMLInputElement ? event.target.value : '')
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
          <Button className={classes.button} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={classes.button} onClick={handleOk}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
