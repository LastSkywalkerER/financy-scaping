export enum FieldNames {
  Email = 'email',
  Password = 'password',
}

export interface FormValues {
  [FieldNames.Email]: string
  [FieldNames.Password]: string
}

export const fieldLabels = {
  [FieldNames.Email]: 'Email',
  [FieldNames.Password]: 'Password',
}
