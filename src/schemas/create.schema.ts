import * as yup from 'yup';
import apiErrors from '../messages.errors';

export const CreateUserValidationSchema = yup
  .object({
    name: yup.string().required(apiErrors.create.messages.name),
    user_id: yup.string().required(apiErrors.create.messages.userId).defined(),
    last_name: yup.string().required(apiErrors.create.messages.lastName),
    createdOn: yup.string().default(() => {
      return new Date().toDateString();
    }),
  })
  .required();

export type User = yup.InferType<typeof CreateUserValidationSchema>;
