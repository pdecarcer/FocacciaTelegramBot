import { List } from '../schemas/list.schema';
import parseError from '../../../../libs/service/parse-error';
import {
  responseWithResult,
  responseWithOutResult,
  Response,
} from '../../../../libs/api-response';
import listAction from '../services/actions/list.action';

const list = async (params: List): Promise<Response> => {
  try {
    const response = await listAction(params.page, params.limit);
    if (response?.Items != null) {
      return responseWithResult(response.Items, 200);
    }
    return responseWithOutResult(400);
  } catch (error) {
    return responseWithResult(parseError(error), 500);
  }
};

export default list;
