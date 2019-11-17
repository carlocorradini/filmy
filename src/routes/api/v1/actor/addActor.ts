// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import { createResponse, StatusCode } from '../../response';
import Actor from '../../../../database/entity/Actor';
import ActorRepository from '../../../../database/entity_repository/ActorRepository';
import logger from '../../../../logger';

export default async (req: Request, res: Response) => {
  const actor: Actor = await getCustomRepository(ActorRepository).createFromBody(req.body);
  const errors = await validate(actor);

  if (errors.length > 0) {
    logger.warn(`API | Actor validation error due to ${errors.length} error/s`);
    res.json(createResponse(StatusCode.INVALID, errors.map((error) => error.constraints)));
  } else {
    getRepository(Actor)
      .save(actor)
      .then((_actor) => {
        logger.info(`API | Actor with id ${_actor.id} added successfully`);
        res.json(createResponse(StatusCode.OK, _actor));
      })
      .catch((ex) => {
        logger.warn(`API | Failed to save a new Actor due to ${ex.toString()}`);
        res.json(createResponse(StatusCode.UNKNOWN_ERROR, ex.toString()));
      });
  }
};
