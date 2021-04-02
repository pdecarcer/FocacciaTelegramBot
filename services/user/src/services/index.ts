import createAction from '../controllers/create.controller';
import listAction from '../controllers/list.controller';
import { CreateUserValidationSchema, User } from '../schemas/create.schema';
import { ListUsersValidationSchema, List } from '../schemas/list.schema';

import {
  parseBody,
  parseQueryString,
} from '../../../../libs/adapters/event-parse';

export const createHandler = async (event) =>
  createAction(parseBody(CreateUserValidationSchema, event) as User);

export const listHandler = async (event) =>
  listAction(parseQueryString(ListUsersValidationSchema, event) as List);
