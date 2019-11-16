// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { createResponse, StatusCode } from '../../response';
import Film from '../../../../database/entity/Film';
import logger from '../../../../logger';

export default async (req: Request, res: Response) => {
  const film = await getRepository(Film).create(req.body);
  const error = await validate(film);

  if (error.length > 0) {
    logger.warn(`API | Failed to add a Film due to ${error.length} errors`);
    res.send(createResponse(StatusCode.INVALID, error));
  } else {
    console.log(film);
    res.send(createResponse(StatusCode.OK, 'OK'));
  }
};
