import CloudcarError from '../errors/index';
import errorTypes from '../errors/errorTypes';

function parseError({ error }) {
  if (error.name === 'ValidationError') {
    const { message, name } = error;
    const type = error.type ? error.type : errorTypes.FATAL;
    return new CloudcarError({ message, name, type });
  }
  if (!error.statusCode) {
    const name = error;
    const type = error.type ? error.type : errorTypes.FATAL;
    const message = error.message || 'A service error occurred';
    return new CloudcarError({ message, name, type });
  }
  return error;
}

export default parseError;
