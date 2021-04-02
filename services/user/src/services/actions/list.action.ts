import documentClient from '../../../../../libs/aws-sdk';
import parseError from '../../../../../libs/service/parse-error';

const listAction = async (page?: number, limit: number = 200) => {
  try {
    const params = {
      TableName:
        process.env.TABLE_NAME !== undefined
          ? process.env.TABLE_NAME
          : 'user-table',
      limit,
    };
    const result = await documentClient.scan(params).promise();
    return result;
  } catch (error) {
    throw parseError(error);
  }
};

export default listAction;
