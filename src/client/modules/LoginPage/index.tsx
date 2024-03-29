import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { useStyles } from './styles';
import { useDispatch } from 'react-redux';
import { loginRequest } from '@core/store/authSlice';
import { TextFieldControl } from '@components/TextField';
import { useForm } from 'react-hook-form';
import { fieldLabels, FieldNames, FormValues } from './types';

export const LoginPage: React.FC = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => dispatch(loginRequest(data));

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" className={classes.title}>
            Login
          </Typography>
          <TextFieldControl
            control={control}
            className={classes.textField}
            required
            type={FieldNames.Email}
            label={fieldLabels[FieldNames.Email]}
            name={FieldNames.Email}
          />
          <TextFieldControl
            control={control}
            className={classes.textField}
            required
            label={fieldLabels[FieldNames.Password]}
            type={FieldNames.Password}
            autoComplete="current-password"
            name={FieldNames.Password}
          />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button type="submit" variant="contained">
            Log In
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
