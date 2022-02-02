import { wsPackageTypes } from '../../types/wsPackageTypes';
import runScrap, { tableUpdating } from '../utils/scrap';

const broadcast = (wss, message) =>
  wss.clients.forEach((client) => client.send(message));

export default async (msg, webSocketServer, ws) => {
  try {
    const { type, data } = JSON.parse(msg.toString('utf8'));

    switch (type) {
      case wsPackageTypes.TABLE_UPDATE_REQUEST:
        // runScrap();
        broadcast(
          webSocketServer,
          JSON.stringify({
            type: wsPackageTypes.TABLE_UPDATE_REQUEST,
            data: {
              status: true,
              tickerCount: 505,
              tickerUpdated: 0,
            },
          }),
        );

        break;
      case wsPackageTypes.TABLE_UPDATE_STATUS:
        console.log(tableUpdating);

        broadcast(
          webSocketServer,
          JSON.stringify({
            type: wsPackageTypes.TABLE_UPDATE_STATUS,
            data: tableUpdating,
          }),
        );
        break;

      default:
        break;
    }
  } catch (e) {
    ws.send(
      JSON.stringify({
        type: wsPackageTypes.WEBSOСKET_ERROR,
        data: 'Something wrong :(',
      }),
    );
  }
};
