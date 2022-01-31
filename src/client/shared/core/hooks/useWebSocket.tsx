import React, { useCallback, useEffect, useRef, useState } from 'react';
import { config } from '@config';

export default function useWebSocket() {
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('');
  const ws = useRef();

  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket(`${config.SERVERURL.replace('http', 'ws')}/`); // создаем ws соединение
      ws.current.onopen = () => setStatus('Соединение открыто'); // callback на ивент открытия соединения
      ws.current.onclose = () => setStatus('Соединение закрыто'); // callback на ивент закрытия соединения

      gettingData();
    }

    return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
  }, [ws, isPaused]);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      //подписка на получение данных по вебсокету
      if (isPaused) return;
      const message = e.data;
      setData(message);
    };
  }, [isPaused]);
  console.log(data);

  const sendMessage = (message) => {
    ws.current.send(message);
  };

  return { sendMessage };
}
