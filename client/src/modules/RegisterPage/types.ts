export enum FieldNames {
  Name = 'name',
  Email = 'email',
  Password = 'password',
  Phone = 'phone',
}

export interface FormValues {
  [FieldNames.Name]: string
  [FieldNames.Email]: string
  [FieldNames.Password]: string
  [FieldNames.Phone]: string
}

export const fieldLabels = {
  [FieldNames.Name]: 'Name',
  [FieldNames.Email]: 'Email',
  [FieldNames.Password]: 'Password',
  [FieldNames.Phone]: 'Phone',
}
