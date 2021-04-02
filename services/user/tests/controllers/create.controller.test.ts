import { expect, sinon } from '../../../../libs.tests/chai.commons';
import createAction from '../../src/services/actions/create.action';
import * as UserController from '../../src/controllers/create.controller';
import { User } from '../../src/schemas/create.schema';
import userFactory from '../factories/user.factory';

describe('USER-API: create', () => {
  let createServiceStub: sinon.SinonStub;
  // eslint-disable-next-line no-return-assign
  beforeEach(
    // eslint-disable-next-line no-return-assign
    () => (createServiceStub = sinon.stub(createAction, 'createAction')),
  );

  afterEach(() => {
    createServiceStub.restore();
  });

  it('[SUCCESS]', async () => {
    createServiceStub.resolves({
      response: {},
    });

    const dummyUser = userFactory.build() as User;
    const response = await UserController.default(dummyUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(response).to.exist;
    expect(createServiceStub).to.have.been.calledWith(dummyUser);
  });

  it('[ERROR] should return a badRequest error when user_id is missing in body', async () => {
    const dummyUser = userFactory.build({ user_id: undefined }) as User;
    const response = await UserController.default(dummyUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(createServiceStub).to.have.been.called;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(response.body).to.exist;
    expect(response.statusCode).to.equal(400);
  });
});
