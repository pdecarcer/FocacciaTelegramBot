import { createItem } from '../../../../../libs/aws-sdk';
import { User } from '../../schemas/create.schema';
import parseError from '../../../../../libs/service/parse-error';
// import serviceErrors from '../messages.errors';

const createAction = async (user: User) => {
  try {
    const params = {
      TableName:
        process.env.TABLE_NAME !== undefined
          ? process.env.TABLE_NAME
          : 'user-table',
      Item: user,
      ReturnValues: 'ALL_OLD',
    };
    const result = await createItem(params);
    return result;
  } catch (error) {
    throw parseError(error);
  }
};

export default createAction;
