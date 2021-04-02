import { Factory } from 'rosie';

const userFactory = Factory.define('user')
  .attr('user_id', '1')
  .attr('name', 'Pablo')
  .attr('last_name', 'de Carcer')
  .attr('createdOn', () => {
    return new Date().toDateString();
  });

export default userFactory;
