import { User } from '../schemas/create.schema';
import parseError from '../../../../libs/service/parse-error';
import {
  responseWithResult,
  responseWithOutResult,
  Response,
} from '../../../../libs/api-response';
import createAction from '../services/actions/create.action';

const create = async (user: User): Promise<Response> => {
  try {
    const response = await createAction(user);
    if (response !== undefined) {
      if (response) {
        return responseWithResult(response, 500);
      }
      return responseWithResult(response !== undefined ? response : {}, 200);
    }
    return responseWithOutResult(400);
  } catch (error) {
    return responseWithResult(parseError(error), 500);
  }
};

export default create;
