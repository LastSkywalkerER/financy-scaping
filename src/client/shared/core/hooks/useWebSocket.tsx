import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { config } from '@config';
import { messageOccurred } from '@core/store/userMessageSlice';
import { useDispatch } from 'react-redux';

class WSSubscribers {
  subscribers = [] as Function[];
  addSubscriber = (callback) => {
    this.subscribers = [...this.subscribers, callback];
    // console.log('addSubscriber', this.subscribers);
  };
  removeSubscriber = (callback) => {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback,
    );
    // console.log('removeSubscriber', this.subscribers);
  };
  getSubscribers = () => {
    // console.log('getSubscribers', this.subscribers);
    return this.subscribers;
  };
}

interface WebSocketContextI {
  sendMessage: Function;
  subscribe: Function;
  unsubscribe: Function;
  status: boolean;
}

const WebSocketContext = createContext({} as WebSocketContextI);
export const useWebSocket = () => useContext(WebSocketContext);

export default function WebSocketProvider({ children }) {
  const [status, setStatus] = useState(false);
  const [senderQueue, setSenderQueue] = useState([] as string[]);
  const dispatch = useDispatch();
  const ws = useRef({} as WebSocket);

  const wsSubscribers = useRef(new WSSubscribers()).current;

  useEffect(() => {
    ws.current = new WebSocket(`${config.SERVERURL.replace('http', 'ws')}/`);
    ws.current.onopen = () => {
      setStatus(true);
      senderQueue.forEach((message) => {
        ws.current.send(message);
      });
    };
    ws.current.onclose = () => setStatus(false);

    gettingData();

    return () => ws.current.close();
  }, [ws]);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      const subscribers = wsSubscribers.getSubscribers();
      const { type, data } = JSON.parse(e.data);
      console.log({ type, data });

      subscribers.forEach((subscriber) => subscriber({ type, data }));
    };

    ws.current.onerror = (e) => {
      dispatch(messageOccurred({ type: 'error', message: e }));
    };
  }, []);

  const sendMessage = (message) => {
    const stringifyMessage = JSON.stringify(message);

    if (status) {
      ws.current.send(stringifyMessage);
    } else {
      setSenderQueue((messages) => [...messages, stringifyMessage]);
    }
  };

  const unsubscribe = (callback) => {
    wsSubscribers.removeSubscriber(callback);
  };

  const subscribe = (callback) => {
    wsSubscribers.addSubscriber(callback);
  };
  return (
    <WebSocketContext.Provider
      value={{ sendMessage, subscribe, unsubscribe, status }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}
