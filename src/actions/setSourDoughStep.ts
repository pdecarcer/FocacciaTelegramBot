/* eslint-disable import/prefer-default-export */
import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { TelegramMessage } from '../types/types';

export const setSourDoughStep = async (telegramMessage: TelegramMessage) => {
  try {
    const step = {
      chatId: telegramMessage.chat.id,
      step: 'sour-dough',
      message:
        'Remember to add the sour dough  and wait for 30 min for the next step',
      ExpirationDate: Math.floor(Date.now() / 1000) + 60 * 25,
    };
    const params = {
      TableName: process.env.REMEMBER_TABLE,
      Item: step,
    };

    const item = await dynamo.createItem(params);
    return item;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
};
