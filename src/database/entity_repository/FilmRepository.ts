// eslint-disable-next-line no-unused-vars, import/no-unresolved
import { Dictionary } from 'express-serve-static-core';
import { Repository, EntityRepository } from 'typeorm';
// eslint-disable-next-line no-unused-vars
import Film from '../entity/Film';
import Actor from '../entity/Actor';

@EntityRepository(Film)
export default class FilmRepository extends Repository<Film> {
  createFromBody(body: Dictionary<string>) {
    const film: Film = this.create(body);

    film.release_date = new Date(body.release_date);

    film.actors = Object.keys(body.actors).map((key: string) => {
      const actor: Actor = new Actor();
      actor.id = parseInt(body.actors[parseInt(key, 10)], 10);
      return actor;
    });

    return film;
  }
}
