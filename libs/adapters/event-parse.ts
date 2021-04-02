// adapters/event-parser.js
import * as yup from 'yup';
import { APIGatewayProxyEvent } from 'aws-lambda';

const extractEventBody = (event?: APIGatewayProxyEvent) => {
  if (event?.body !== undefined) {
    return JSON.parse(event.body || '');
  }
  return {};
};

const extractQueryString = (event?: APIGatewayProxyEvent) => {
  if (event?.queryStringParameters !== undefined) {
    return event.queryStringParameters;
  }
  return {};
};

export const parseBody = (
  schema: yup.ObjectSchema,
  event?: APIGatewayProxyEvent,
) => {
  const eventObject = extractEventBody(event);
  return schema.validateSync(eventObject);
};

export const parseQueryString = (
  schema: yup.ObjectSchema,
  event?: APIGatewayProxyEvent,
) => {
  const eventObject = extractQueryString(event);
  return schema.validateSync(eventObject);
};
