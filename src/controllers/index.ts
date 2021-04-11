import { APIGatewayEvent } from 'aws-lambda';
import { TelegramMessage } from '../types/types';
import { decisionTaker } from '../actions/decisionTaker';

// eslint-disable-next-line import/prefer-default-export
export const focacciaBot = async (event: APIGatewayEvent) => {
  const body = JSON.parse(event.body || '');
  console.log(body);
  try {
    if (body.message !== undefined && body.edited_message === undefined) {
      const telegramMessage = body.message as TelegramMessage;
      await decisionTaker(telegramMessage);
    } else if (body.edited_message !== undefined) {
      const telegramMessage = body.edited_message as TelegramMessage;
      await decisionTaker(telegramMessage);
    }
    return { statusCode: 200 };
  } catch (error) {
    console.log(error);
    return { statusCode: 500 };
  }
};
