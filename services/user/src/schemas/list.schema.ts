import * as yup from 'yup';
import apiErrors from '../messages.errors';

export const ListUsersValidationSchema = yup
  .object({
    page: yup.number().notRequired().positive(apiErrors.list.messages.page),
    limit: yup.number().notRequired().positive(apiErrors.list.messages.limit),
  })
  .defined();

export type List = yup.InferType<typeof ListUsersValidationSchema>;
