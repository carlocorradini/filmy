// eslint-disable-next-line no-unused-vars, import/no-unresolved
import { Dictionary } from 'express-serve-static-core';
import { Repository, EntityRepository } from 'typeorm';
import { validate } from 'class-validator';
import { APIUtil } from '../../utils';
import Film from '../entity/Film';
import Actor from '../entity/Actor';

@EntityRepository(Actor)
export default class FilmRepository extends Repository<Actor> {
  async createFromBody(body: Dictionary<string>): Promise<Actor> {
    const actor: Actor = this.create(body);

    if (body.films) {
      actor.films = Object.keys(body.films).map((key: string) => {
        const film: Film = new Film();
        film.id = parseInt(body.films[parseInt(key, 10)], 10);
        return film;
      });
    }

    const errors = await validate(actor);
    return new Promise((resolve, reject) => {
      if (errors.length > 0) {
        reject(APIUtil.pruneValidationError(errors));
      } else {
        resolve(actor);
      }
    });
  }
}
