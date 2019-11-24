// eslint-disable-next-line no-unused-vars
import { EntitySubscriberInterface, InsertEvent } from 'typeorm';
import User from '../entity/User';
import { CryptUtil } from '../../utils';

export default class UserSubscriber implements EntitySubscriberInterface<User> {
  // eslint-disable-next-line class-methods-use-this
  listenTo() {
    return User;
  }

  // eslint-disable-next-line class-methods-use-this
  async beforeInsert(event: InsertEvent<User>) {
    // eslint-disable-next-line no-param-reassign
    event.entity.password = await CryptUtil.hash(event.entity.password);
  }
}
