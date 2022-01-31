import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { shiftMessage } from '@core/store/userMessageSlice';
import useStyles from './index.style';
import { removeListener } from 'process';
import { RootState } from '@core/store/store';

export default function UserMessage() {
  const messages = useSelector((state: RootState) => state.userMessage.list);
  const dispatch = useDispatch();
  const { position } = useStyles({ message: messages });

  const clearMessage = () => {
    dispatch(shiftMessage());
  };

  React.useEffect(() => {
    if (messages.length) {
      setTimeout(clearMessage, 10000);
    }
  }, [messages]);

  return (
    <Stack onClick={clearMessage} sx={position} spacing={2}>
      {messages.map(({ type, message }, i: number) => (
        <Alert key={`${message}-${i}`} severity={type}>
          {message}
        </Alert>
      ))}
    </Stack>
  );
}
