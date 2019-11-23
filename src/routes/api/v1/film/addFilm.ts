// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { generateResponse, StatusCode } from '../../response';
import Film from '../../../../db/entity/Film';
import FilmRepository from '../../../../db/entity_repository/FilmRepository';

export default async (req: Request, res: Response) => {
  try {
    const film: Film = await getCustomRepository(FilmRepository).createFromBody(req.body);

    getRepository(Film)
      .save(film)
      .then((_film) => {
        generateResponse(res, StatusCode.OK, _film);
      })
      .catch(() => {
        generateResponse(res, StatusCode.BAD_REQUEST, 'Constraints violation');
      });
  } catch (ex) {
    generateResponse(res, StatusCode.BAD_REQUEST, ex);
  }
};
