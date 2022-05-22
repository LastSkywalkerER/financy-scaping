import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import useStyles from './index.style';
import { useDispatch } from 'react-redux';
import { loginRequest } from '@core/store/authSlice';
import { TextFieldControl } from '@components/TextField';
import { useForm } from 'react-hook-form';
import { fieldLabels, FieldNames, FormValues } from './types';

export const LoginPage: React.FC = () => {
  const { card, cardContent, title, textField, cardActions } = useStyles();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => dispatch(loginRequest(data));

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card sx={card}>
        <CardContent sx={cardContent}>
          <Typography variant="h5" sx={title}>
            Login
          </Typography>
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
            label={fieldLabels[FieldNames.Password]}
            type={FieldNames.Password}
            autoComplete="current-password"
            name={FieldNames.Password}
          />
        </CardContent>
        <CardActions sx={cardActions}>
          <Button type="submit" variant="contained">
            Log In
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
