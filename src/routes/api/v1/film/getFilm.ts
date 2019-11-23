// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { generateResponse, StatusCode } from '../../response';
import { APIUtil } from '../../../../utils';
import Film from '../../../../db/entity/Film';

export default async (req: Request, res: Response) => {
  const id = await APIUtil.id(req.params.id);

  getRepository(Film)
    .findOneOrFail({ id }, { relations: ['actors'] })
    .then((film) => {
      generateResponse(res, StatusCode.OK, film);
    })
    .catch(() => {
      generateResponse(res, StatusCode.NOT_FOUND, `Unable to find a Film with id ${id}`);
    });
};
