// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { createResponse, StatusCode } from '../../response';
import Actor from '../../../../database/entity/Actor';
import logger from '../../../../logger';

export default async (req: Request, res: Response) => {
  getRepository(Actor)
    .find({ relations: ['films'] })
    .then((actor) => {
      logger.info(`API | Found ${actor.length} Actors`);
      res.json(createResponse(StatusCode.OK, actor));
    })
    .catch((ex) => {
      logger.warn(`API | Failed to retrieve all Actors due to ${ex.toString()}`);
      res.json(createResponse(StatusCode.UNKNOWN_ERROR, ex.toString()));
    });
};
