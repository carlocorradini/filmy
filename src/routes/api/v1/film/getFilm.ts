// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { createResponse, StatusCode } from '../../../../utils';
import Film from '../../../../database/entity/Film';

export default async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    res.send(createResponse(StatusCode.OK, await getRepository(Film).findOneOrFail({ id })));
  } catch (ex) {
    res.send(createResponse(StatusCode.NOT_FOUND));
  }
};
