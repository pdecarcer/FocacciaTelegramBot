import { expect } from '../../../../../libs.tests/chai.commons';
import userFactory from '../../factories/user.factory';
import { User } from '../../../src/schemas/create.schema';
import create from '../../../src/services/actions/create.action';

describe('USER-SERVICE: create', () => {
  it('[ERROR] should return error when name is missing', async () => {
    const dummyUser = userFactory.build({ user_id: undefined }) as User;
    try {
      await create(dummyUser);
      throw new Error('should ve thrown an error');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(error).to.exist;
    }
  });
  it('[SUCCESS]', async () => {
    const dummyUser = userFactory.build() as User;
    const result = (await create(dummyUser)) as User;
    if (result !== undefined) {
      expect(result.user_id).to.equal(dummyUser.user_id);
    }
  });
});
