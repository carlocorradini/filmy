// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { createResponse, StatusCode } from '../../response';
import Film from '../../../../database/entity/Film';
import logger from '../../../../logger';

export default async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10) || 0;

  try {
    const film: Film = await getRepository(Film).findOneOrFail({ id });
    res.send(createResponse(StatusCode.OK, film));
  } catch (ex) {
    logger.warn(`API | Film with id ${id} not found`);
    res.send(createResponse(StatusCode.NOT_FOUND, ex.name));
  }
};
