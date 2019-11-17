// eslint-disable-next-line no-unused-vars, import/no-unresolved
import { Dictionary } from 'express-serve-static-core';
import { Repository, EntityRepository } from 'typeorm';
import Film from '../entity/Film';
import Actor from '../entity/Actor';

@EntityRepository(Actor)
export default class FilmRepository extends Repository<Actor> {
  createFromBody(body: Dictionary<string>) {
    const actor: Actor = this.create(body);

    actor.birth_date = new Date(body.birth_date);
    if (body.death_date) {
      actor.death_date = new Date(body.death_date);
    }
    actor.films = Object.keys(body.films).map((key: string) => {
      const film: Film = new Film();
      film.id = parseInt(body.films[parseInt(key, 10)], 10);
      return film;
    });

    return actor;
  }
}
