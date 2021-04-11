const apiErrors = {
  create: {
    name: 'user_api_create_validation_error',
    messages: {
      userId: 'user_id is a required string',
      name: 'name is a required string',
      lastName: 'last_name is a required string',
    },
  },
  list: {
    name: 'user_api_list_validation_error',
    messages: {
      page: 'page should be a number equal or bigger than 1',
      limit: 'limit should be a number a number between 1 and 10',
    },
  },
};

export default apiErrors;
