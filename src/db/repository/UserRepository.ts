// eslint-disable-next-line no-unused-vars, import/no-unresolved
import { Dictionary } from 'express-serve-static-core';
import { Repository, EntityRepository } from 'typeorm';
import { validate } from 'class-validator';
import { APIUtil } from '../../utils';
import User from '../entity/User';

@EntityRepository(User)
export default class FilmRepository extends Repository<User> {
  async createFromBody(body: Dictionary<string>): Promise<User> {
    const user: User = this.create(body);

    const errors = await validate(user);
    return new Promise((resolve, reject) => {
      if (errors.length > 0) {
        reject(APIUtil.pruneValidationError(errors));
      } else {
        resolve(user);
      }
    });
  }
}
