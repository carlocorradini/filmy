// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import { createResponse, StatusCode } from '../../response';
import Film from '../../../../database/entity/Film';
import FilmRepository from '../../../../database/entity_repository/FilmRepository';
import logger from '../../../../logger';

export default async (req: Request, res: Response) => {
  const film: Film = await getCustomRepository(FilmRepository).createFromBody(req.body);
  const errors = await validate(film);

  if (errors.length > 0) {
    logger.warn(`API | Film validation error due to ${errors.length} error/s`);
    res.json(createResponse(StatusCode.INVALID, errors.map((error) => error.constraints)));
  } else {
    getRepository(Film)
      .save(film)
      .then((_film) => {
        logger.info(`API | Film with id ${_film.id} added successfully`);
        res.json(createResponse(StatusCode.OK, _film));
      })
      .catch((ex) => {
        logger.warn(`API | Failed to save a new Film due to ${ex.toString()}`);
        res.json(createResponse(StatusCode.UNKNOWN_ERROR, ex.toString()));
      });
  }
};
