// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { generateResponse, StatusCode } from '../../response';
import { APIUtil } from '../../../../utils';
import Film from '../../../../db/entity/Film';

export default async (req: Request, res: Response) => {
  const id = await APIUtil.id(req.params.id);

  try {
    const film: Film = await getRepository(Film).findOneOrFail({ id });

    await getRepository(Film)
      .delete(film)
      .then(() => {
        generateResponse(res, StatusCode.OK, film);
      })
      .catch(() => {
        generateResponse(res, StatusCode.INTERNAL_SERVER_ERROR);
      });
  } catch (ex) {
    generateResponse(res, StatusCode.NOT_FOUND, `Unable to find a Film with id ${id}`);
  }
};
