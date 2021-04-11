/* eslint-disable no-console */
import axios from 'axios';
import { utf8Encode } from '../../libs/utils/utf8-encode';

interface SendMessageParams {
  message: string[];
  chatId: number;
}
const telegramApiAxiosInstance = axios.create({
  baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`,
  headers: {
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
  },
});

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = async (params: SendMessageParams) => {
  try {
    const { message, chatId } = params;
    const response = await telegramApiAxiosInstance({
      url: `/sendMessage?chat_id=${chatId}&text=${utf8Encode(
        message.join('\n'),
      )}`,
      method: 'GET',
    }).then((item) => {
      console.log(item);
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
