/* eslint-disable import/prefer-default-export */
import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { TelegramMessage } from '../types/types';

export const setSaltStep = async (telegramMessage: TelegramMessage) => {
  try {
    const step = {
      chatId: telegramMessage.chat.id,
      step: 'salt',
      message:
        'Remember to add the salt and the final water to the dough  and wait for 30-60 min for the next step',
      ExpirationDate: Math.floor(Date.now() / 1000) + 60 * 55,
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
  }
};
