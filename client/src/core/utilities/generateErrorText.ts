import { FieldError } from 'react-hook-form'

import { formControlErrors } from '@/core/constants/errors'

export const generateErrorText = (error?: FieldError): React.ReactElement | string => {
  if (error?.message) {
    return error?.message
  } else if (error?.type) {
    return formControlErrors[error?.type]
  }

  return ''
}
