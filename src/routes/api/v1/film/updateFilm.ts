// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { APIUtil } from '../../../../utils';
import { generateResponse, StatusCode } from '../../response';
import Film from '../../../../db/entity/Film';
import FilmRepository from '../../../../db/entity_repository/FilmRepository';

export default async (req: Request, res: Response) => {
  const id = await APIUtil.id(req.params.id);
  const filmRepository = await getRepository(Film);

  try {
    const newFilm: Film = await getCustomRepository(FilmRepository).createFromBody(req.body);

    filmRepository
      .findOneOrFail({ id })
      .then(async (film) => {
        await filmRepository.merge(film, newFilm);
        await filmRepository.save(film);
        generateResponse(res, StatusCode.OK, film);
      })
      .catch(() => {
        generateResponse(res, StatusCode.NOT_FOUND, `Unable to find a Film with id ${id}`);
      });
  } catch (ex) {
    generateResponse(res, StatusCode.BAD_REQUEST, ex);
  }
};
