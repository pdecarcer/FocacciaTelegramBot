import { DynamoDB, S3 } from 'aws-sdk';
import CloudcarError from './errors/index';
import MessageError from './message.errors';

const documentClient = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

interface PutDynamoParams {
  TableName?: string;
  Item: Object;
  ConditionExpression?: string;
}

interface QueryDynamoParams {
  TableName?: string;
  ConditionExpression?: string;
}

export const createItem = async (params: PutDynamoParams): Promise<Object> => {
  const { TableName } = params;
  const { Item } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      name: MessageError.createItem.name,
      message: MessageError.createItem.messages.tableName,
    });
  }

  if (Item === undefined) {
    throw new CloudcarError({
      name: MessageError.createItem.name,
      message: MessageError.createItem.messages.item,
    });
  }

  await documentClient.put(params as DynamoDB.PutItemInput).promise();

  return params.Item;
};

export const queryAtLeastOneItem = async (
  params: QueryDynamoParams,
): Promise<Object[]> => {
  const { TableName } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      message: MessageError.queryAtLeastOneItem.messages.tableName,
      name: MessageError.queryAtLeastOneItem.name,
    });
  }

  const result = await documentClient
    .query(params as DynamoDB.QueryInput)
    .promise();

  if (result.Items === undefined || result.Items.length === 0) {
    throw new CloudcarError({
      message: MessageError.queryAtLeastOneItem.messages.notFoundItem,
      name: MessageError.queryAtLeastOneItem.name,
    });
  }
  return result.Items;
};

export const s3Client = new S3({
  s3ForcePathStyle: true,
  accessKeyId: 'S3RVER', // This specific key is required when working offline
  secretAccessKey: 'S3RVER',
  endpoint: 'http://localhost:4569',
});

export default documentClient;
