/* eslint-disable import/prefer-default-export */
// import axios from 'axios';
import { Lambda } from 'aws-sdk';

// const telegramApiAxiosInstance = axios.create({
//   baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`,
//   headers: {
//     'Content-Type': 'application/json',
//     'access-control-allow-origin': '*',
//   },
// });

export const sendToUser = async (chat_id: any, text: string[]) => {
  const lambda = new Lambda();

  const params = {
    message: text,
    chatId: chat_id,
  };
  const lambdaParams = {
    InvocationType: 'Event',
    FunctionName: 'sendFocacciaMessage',
    Payload: JSON.stringify(params),
  };
  await lambda.invoke(lambdaParams).promise();
  // const response = await telegramApiAxiosInstance({
  //   url: `/sendMessage?chat_id=${chat_id}&text=${text}`,
  //   method: 'GET',
  // }).then((item) => {
  //   console.log(item);
  // });
  // return response;
};
