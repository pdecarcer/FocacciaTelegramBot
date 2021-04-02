const serviceErrors = {
  create: {
    name: 'user_service_create_user_error',
    messages: {
      userId: 'user_id is a required string',
      name: 'name is a required string',
      lastName: 'last_name is a required string',
    },
  },
  list: {
    name: 'user_service_list_user_error',
    messages: {
      page: 'page should be a number equal or bigger than 1',
      limit: 'limit should be a number a number between 1 and 10',
    },
  },
};

export default serviceErrors;
