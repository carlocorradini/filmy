// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { generateResponse, StatusCode } from '../../response';
import Film from '../../../../db/entity/Film';

export default async (req: Request, res: Response) => {
  getRepository(Film)
    .find({ relations: ['actors'] })
    .then((films) => {
      generateResponse(res, StatusCode.OK, films);
    })
    .catch(() => {
      generateResponse(res, StatusCode.INTERNAL_SERVER_ERROR);
    });
};
