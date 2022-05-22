import React, { useState, useCallback } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import useStyles from './index.style';
import { useDispatch } from 'react-redux';
import { registerRequest } from '@core/store/authSlice';
import { useForm } from 'react-hook-form';
import { fieldLabels, FieldNames, FormValues } from './types';
import { TextFieldControl } from '@components/TextField';

export const RegisterPage: React.FC = () => {
  const { card, cardContent, title, textField, cardActions } = useStyles();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) =>
    dispatch(
      registerRequest({
        ...data,
        phone: data.phone.replace(/[ ()-]/g, ''),
      }),
    );

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card sx={card}>
        <CardContent sx={cardContent}>
          <Typography variant="h5" sx={title}>
            Register
          </Typography>

          <TextFieldControl
            control={control}
            sx={textField}
            required
            type={FieldNames.Name}
            label={fieldLabels[FieldNames.Name]}
            name={FieldNames.Name}
          />
          <TextFieldControl
            control={control}
            sx={textField}
            required
            type={FieldNames.Email}
            label={fieldLabels[FieldNames.Email]}
            name={FieldNames.Email}
          />
          <TextFieldControl
            control={control}
            sx={textField}
            required
            type={FieldNames.Password}
            label={fieldLabels[FieldNames.Password]}
            name={FieldNames.Password}
          />
          <TextFieldControl
            control={control}
            sx={textField}
            required
            type={FieldNames.Phone}
            label={fieldLabels[FieldNames.Phone]}
            name={FieldNames.Phone}
          />
        </CardContent>
        <CardActions sx={cardActions}>
          <Button type="submit" variant="contained">
            Register
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
