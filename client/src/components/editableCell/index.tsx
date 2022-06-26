import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, TextField } from '@mui/material'
import React from 'react'

interface Props {
  value: string | number | null
  onApply: (value: string | number | null) => void
}

export const EditableCell: React.FC<Props> = React.memo(({ value, onApply }) => {
  const [editable, setEditable] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(value)

  const changeHandler = (event) => {
    setInternalValue(event.target.value)
  }

  const handleEdit = () => {
    setEditable(true)
  }

  const handleAply = () => {
    if (!isNaN(Number(internalValue))) {
      onApply(internalValue)
    } else {
      setInternalValue(value)
    }
    setEditable(false)
  }

  return (
    <div>
      {!editable ? (
        <>
          {internalValue}
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </>
      ) : (
        <>
          <TextField variant="outlined" value={internalValue} onChange={changeHandler} />
          <IconButton onClick={handleAply}>
            <CheckIcon />
          </IconButton>
        </>
      )}
    </div>
  )
})
