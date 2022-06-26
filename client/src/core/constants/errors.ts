export enum ErrorType {
  SilentError = 'silent_error',
  AckError = 'ack_error',
}

export const httpErrorDefaultMessages: { [key: number]: string } = {
  400: 'badRequest',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'notFound',
  422: 'validationsErrors',
  500: 'internalServerError',
  502: 'badGateway',
  503: 'serviceUnavailable',
  504: 'badRequest',
}

export const formControlErrors: { [key: string]: string } = {
  required: 'Required',
  minLength: 'Need more symbols',
  maxLength: 'Need less symbols',
}
