// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { createResponse, StatusCode } from '../../response';
import Film from '../../../../database/entity/Film';

export default async (req: Request, res: Response) => {
  const films: Film[] = await getRepository(Film).find();
  res.send(createResponse(StatusCode.OK, films));
};
