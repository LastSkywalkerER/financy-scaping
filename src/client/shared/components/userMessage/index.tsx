import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { shiftMessage } from '@core/store/userMessageSlice';
import { useStyles } from './styles';
import { removeListener } from 'process';
import { RootState } from '@core/store/store';

import clsx from 'clsx';
import { useState } from 'react';

export default function UserMessage() {
  const messages = useSelector((state: RootState) => state.userMessage.list);
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [isShown, setIsShown] = useState(false);

  const clearMessage = () => {
    setIsShown(false);
    setTimeout(() => {
      dispatch(shiftMessage());
    }, 200);
  };

  React.useEffect(() => {
    if (messages.length) {
      setTimeout(clearMessage, 10000);
      setIsShown(true);
    }
  }, [messages]);

  return (
    <Stack
      onClick={clearMessage}
      className={clsx(classes.position, { [classes.show]: isShown })}
      spacing={2}
    >
      {messages.map(({ type, message }, i: number) => (
        <Alert key={`${message}-${i}`} severity={type}>
          {message}
        </Alert>
      ))}
    </Stack>
  );
}
