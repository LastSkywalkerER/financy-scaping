import { formControlErrors } from '@core/constants/errors';
import { FieldError } from 'react-hook-form';

export const generateErrorText = (
  error?: FieldError,
): React.ReactElement | string => {
  if (error?.message) {
    return error?.message;
  } else if (error?.type) {
    return formControlErrors[error?.type];
  }

  return '';
};
