// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { createResponse, StatusCode } from '../../response';
import Actor from '../../../../database/entity/Actor';
import logger from '../../../../logger';

export default (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10) || 0;

  getRepository(Actor)
    .findOneOrFail({ id }, { relations: ['films'] })
    .then((actor) => {
      logger.info(`API | Actor with id ${id} found`);
      res.json(createResponse(StatusCode.OK, actor));
    })
    .catch((ex) => {
      logger.warn(`API | Actor with id ${id} not found or failed due to ${ex.toString()}`);
      res.json(createResponse(StatusCode.NOT_FOUND, ex.toString()));
    });
};
