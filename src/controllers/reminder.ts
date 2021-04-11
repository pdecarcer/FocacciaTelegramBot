/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { AttributeValue, DynamoDBStreamEvent } from 'aws-lambda';
import { sendToUser } from '../actions/sendMessage.action';

export const reminder = async (event: DynamoDBStreamEvent) => {
  const item = event.Records[0];
  if (item.eventName === 'REMOVE') {
    try {
      const { N: chatId } = item.dynamodb?.OldImage?.chatId as AttributeValue;
      const { SS: message } = item.dynamodb?.OldImage
        ?.message as AttributeValue;
      // eslint-disable-next-line radix
      if (chatId !== undefined && message !== undefined) {
        // eslint-disable-next-line radix
        await sendToUser(chatId, message);
        return { statusCode: 200, message: 'It was sended successfully' };
      }
    } catch (error) {
      console.log('Error', error);
      return { statusCode: 400, error };
    }
  }
  return { statusCode: 200, message: 'Is not a remove action' };
};
