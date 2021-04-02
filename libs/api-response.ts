interface Response {
  body?: string;
  statusCode: number;
  error?: string;
}

function responseWithResult(
  body: { [key: string]: any },
  statusCode: number = 200,
): Response {
  return { body: JSON.stringify(body), statusCode };
}

function responseWithOutResult(statusCode: number = 400): Response {
  return { body: 'Bad Request', statusCode };
}

export { responseWithResult, responseWithOutResult, Response };
