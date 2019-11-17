// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { createResponse, StatusCode } from '../../response';
import Film from '../../../../database/entity/Film';
import logger from '../../../../logger';

export default (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10) || 0;

  getRepository(Film)
    .findOneOrFail({ id }, { relations: ['actors'] })
    .then((film) => {
      logger.info(`API | Film with id ${id} found`);
      res.json(createResponse(StatusCode.OK, film));
    })
    .catch((ex) => {
      logger.warn(`API | Film with id ${id} not found or failed due to ${ex.toString()}`);
      res.json(createResponse(StatusCode.NOT_FOUND, ex.toString()));
    });
};
