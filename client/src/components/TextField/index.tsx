import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

import { generateErrorText } from '@/core/utilities/generateErrorText'

export const TextFieldControl = <T extends FieldValues>(
  props: UseControllerProps<T> & TextFieldProps,
) => {
  const { name, control, rules, ...restProps } = props

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: restProps.required,
        ...rules,
      }}
      render={({ field: { value, ...restField }, fieldState: { error } }) => (
        <TextField
          {...restField}
          {...restProps}
          value={value || ''}
          error={!!error}
          helperText={generateErrorText(error)}
        />
      )}
    />
  )
}
