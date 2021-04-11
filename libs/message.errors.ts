const MessageError = {
  queryAtLeastOneItem: {
    name: 'DATABASE_SERVICE_QUERY_ERROR',
    messages: {
      tableName: 'undefined table name',
      notFoundItem: 'given params did not found items',
    },
  },
  createItem: {
    name: 'DATABASE_SERVICE_CREATE_ERROR',
    messages: {
      tableName: 'undefined table name',
      item: 'undefined item to create',
    },
  },
  login: {
    name: 'COGNITO_SERVICE_LOGIN_ERROR',
    messages: {
      username: 'username is undefined',
      password: 'password is undefined',
      clientId: 'cognito client id is undefined',
      poolId: 'cognito client id is undefined',
      session: 'authentication result is invalid',
    },
  },
  updateItem: {
    name: 'DATABASE_SERVICE_UPDATE_ERROR',
    messages: {
      tableName: 'undefined table name',
      attributes: 'could not get new attributes from updated item',
      key: 'undefined table key',
    },
  },
  listItems: {
    name: 'DATABASE_SERVICE_LIST_ERROR',
    messages: {
      tableName: 'undefined table name',
    },
  },
  createCognitoConcessionaire: {
    name: 'COGNITO_SERVICE_CONCESSIONAIRE_ERROR',
    messages: {
      concessionaire: 'undefined concessionaire',
      clientId: 'undefined client Id',
      concessionaireConfirmed:
        '"undefined the concessionaire wasn\'t create on dynamoDB"',
    },
  },
  token: {
    name: 'TOKEN_SERVICE_EXTRACTOR_ERROR',
    messages: {
      header: 'undefined authorization header',
      undefinedToken: 'undefined token',
      sections: 'invalid token format',
      claims: 'invalid role or concessionaireId',
      role: 'role is undefined or not existing',
    },
  },
  concessionaireId: {
    name: 'CONCESSIONAIRE_ID_ERROR',
    messages: {
      invalidRequest:
        'the concessionaire id on the request is different from your user',
    },
  },
  cognitoPool: {
    name: 'COGNITO_SERVICE_USERS_ATTRIBUTES_ERROR',
    messages: {
      undefinedAttributes: 'undefined user attributes',
    },
  },
};

export default MessageError;
