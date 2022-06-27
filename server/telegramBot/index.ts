import TelegramBot from 'node-telegram-bot-api';
import config from 'config';
import { ObjectId } from 'mongoDb';
import User from '../models/User';
import stocksSchema from '../models/StocksUsers';
import changeStockArray from '../utils/changeStockArray';
import Token from 'src/types/Token';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.get('tgToken'), { polling: true });

bot.setMyCommands([{ command: '/info', description: 'Get my saved tokens' }]);

const startCommand = async (userId: string, chatId: number) => {
  const user = await User.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    await bot.sendMessage(chatId, 'User not found!');
    return;
  }

  await User.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { tgChatId: chatId } },
  );

  // send a message to the chat acknowledging receipt of their message

  await bot.sendMessage(chatId, `Hi ${user.name}`);
};

const getSavedInfo = async (chatId: number) => {
  try {
    const user = await User.findOne({ tgChatId: chatId });

    const tickers = await stocksSchema.find({ owner: user.id });

    const analysedTickers = changeStockArray(tickers).map(
      (ticker: Token): Token => {
        if (ticker?.expectedPrice) {
          if (Number(ticker.price) <= ticker.expectedPrice) {
            ticker.status = 'ready';
          }
        }
        return ticker;
      },
    );

    await bot.sendMessage(
      chatId,
      analysedTickers.map(
        (ticker: Token) => `${ticker.symbol}, status: ${ticker.status}`,
      ).join(`, 
    `) || 'Nothing found ;(',
    );
  } catch (error) {
    // console.error(error);
  }
};

export const sendTgResult = async () => {
  const users = await User.find({ tgChatId: { $exists: true } });

  users.forEach(async (user) => {
    const tickers = await stocksSchema.find({ owner: user.id });

    const analysedTickers = changeStockArray(tickers).map(
      (ticker: Token): Token => {
        if (ticker?.expectedPrice) {
          if (Number(ticker.price) <= ticker.expectedPrice) {
            ticker.status = 'ready';
          }
        }
        return ticker;
      },
    );

    await bot.sendMessage(
      user.tgChatId,
      analysedTickers.map(
        (ticker: Token) => `${ticker.symbol}, status: ${ticker.status}`,
      ).join(`, 
    `) || 'Nothing found ;(',
    );
  });
};

// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  try {
    const msgArray = msg.text?.split(' ');
    const command = (msgArray && /^\//.test(msgArray[0]) && msgArray[0]) || '';
    const text =
      (command ? msg.text?.replace(`${command} `, '') : msg.text) || '';
    const chatId = msg.chat.id;

    switch (command) {
      case '/start':
        startCommand(text, chatId);
        break;
      case '/info':
        getSavedInfo(chatId);
        break;
      case '/devCheck':
        sendTgResult();
        break;
    }
  } catch (error) {
    console.error('TGbot Error: ', error);
  }
});
