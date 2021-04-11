/* eslint-disable import/prefer-default-export */
import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { TelegramMessage } from '../types/types';

export const setFoldStep = async (telegramMessage: TelegramMessage) => {
  try {
    const step = {
      chatId: telegramMessage.chat.id,
      step: 'fold',
      message: 'Remember to make 4 folds with a difference of 30 minutes',
      ExpirationDate: Math.floor(Date.now() / 1000) + 60 * 85,
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
