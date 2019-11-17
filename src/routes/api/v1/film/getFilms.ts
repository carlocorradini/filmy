// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { createResponse, StatusCode } from '../../response';
import Film from '../../../../database/entity/Film';
import logger from '../../../../logger';

export default async (req: Request, res: Response) => {
  getRepository(Film)
    .find({ relations: ['actors'] })
    .then((films) => {
      logger.info(`API | Found ${films.length} Films`);
      res.json(createResponse(StatusCode.OK, films));
    })
    .catch((ex) => {
      logger.warn(`API | Failed to retrieve all Films due to ${ex.toString()}`);
      res.json(createResponse(StatusCode.UNKNOWN_ERROR, ex.toString()));
    });
};
