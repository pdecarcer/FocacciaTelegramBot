import * as yup from 'yup';
import * as EventParser from '../../../libs/adapters/event-parse';
import { expect } from '../../../libs.tests/chai.commons';

describe('EventParser', () => {
  let eventAPIGatewayProxyEventStub;
  let queryStringSchema;
  let bodySchema;
  beforeEach(() => {
    eventAPIGatewayProxyEventStub = {
      path: 'users',
      httpMethod: 'POST',
      body: '{"user_id":"1","name":"Peter"}',
      queryStringParameters: '{"page":"20","limit":"100"}',
    };
    queryStringSchema = yup
      .object({
        page: yup.number().notRequired(),
        limit: yup.number().required(),
      })
      .defined();
    bodySchema = yup
      .object({
        user_id: yup.string().required(),
        name: yup.string().required(),
      })
      .defined();
  });
  it('[SUCCESS] parseBody', async () => {
    const result = EventParser.parseBody(
      eventAPIGatewayProxyEventStub,
      bodySchema,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.exist;
    expect(result).to.equal(eventAPIGatewayProxyEventStub.body);
  });
  it('[SUCCESS] parseQueryString', async () => {
    const result = EventParser.parseQueryString(
      eventAPIGatewayProxyEventStub,
      queryStringSchema,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.exist;
  });
});
