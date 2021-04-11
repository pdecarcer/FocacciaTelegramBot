import { APIGatewayEvent } from 'aws-lambda';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';
import { RoleTypes } from './role-types';

export const extractConcessionaireId = async (
  event: APIGatewayEvent,
): Promise<string | undefined> => {
  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      if (Object.keys(body.variables).length !== 0) {
        const concessionaire =
          body.variables[Object.keys(body.variables)[0]].concessionaireId;
        return concessionaire || null;
      }
    } catch (error) {
      return undefined;
    }
  }
  return undefined;
};

const validateRequestWithConcessionaireId = async (
  fromJwt: string,
  fromBody: string,
) => {
  if (fromBody !== fromJwt) {
    throw new CloudcarError({
      message: MessageError.concessionaireId.messages.invalidRequest,
      name: MessageError.concessionaireId.name,
    });
  }
};

// There have to be a better way to do it
const isIntrospectionQuery = async (
  event: APIGatewayEvent,
): Promise<Boolean> => {
  if (event.body !== null) {
    /// This is made for codegen
    if (event.body.includes('query IntrospectionQuery')) {
      return true;
    }
    const body = JSON.parse(event.body);
    if (body.operationName === 'IntrospectionQuery') {
      return true;
    }
  }
  return false;
};

export const extractJwtData = async (jwt: string, event: APIGatewayEvent) => {
  if (await isIntrospectionQuery(event)) {
    return {};
  }
  const concessionaireIdFromBody = await extractConcessionaireId(event);
  if (!jwt) {
    throw new CloudcarError({
      message: MessageError.token.messages.undefinedToken,
      name: MessageError.token.name,
    });
  }

  const token = jwt.split(' ')[1];

  const tokenSections = token.split('.');

  if (tokenSections.length < 3) {
    throw new CloudcarError({
      message: MessageError.token.messages.sections,
      name: MessageError.token.name,
    });
  }

  const payload = Buffer.from(tokenSections[1], 'base64').toString('utf8');

  const parsedJson = JSON.parse(payload);

  const role = parsedJson['custom:role'];
  const concessionaireId = parsedJson['custom:concessionaireId'];

  if (
    role === RoleTypes.ADMIN &&
    concessionaireId !== undefined &&
    concessionaireIdFromBody
  ) {
    await validateRequestWithConcessionaireId(
      concessionaireId,
      concessionaireIdFromBody,
    );
  }
  if (role === RoleTypes.ADMIN && concessionaireId === undefined) {
    throw new CloudcarError({
      message: MessageError.token.messages.claims,
      name: MessageError.token.name,
    });
  }
  if (role !== RoleTypes.ADMIN && role !== RoleTypes.SUPER_ADMIN) {
    throw new CloudcarError({
      message: MessageError.token.messages.role,
      name: MessageError.token.name,
    });
  }
  return { role };
};
