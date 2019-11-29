// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository, QueryFailedError } from 'typeorm';
import { validateOrReject } from 'class-validator';
import FilmRepository from '../db/repository/FilmRepository';
import Film from '../db/entity/Film';
import { APIUtil } from '../utils';
import { StatusCode, generateResponse } from '../response';

export default class FilmController {
  public static async getOne(req: Request, res: Response) {
    const id = await APIUtil.id(req.params.id);

    getRepository(Film)
      .findOneOrFail({ id }, { relations: ['actors'] })
      .then((film) => {
        generateResponse(res, StatusCode.OK, film);
      })
      .catch(() => {
        generateResponse(res, StatusCode.NOT_FOUND, `Unable to find a Film with id ${id}`);
      });
  }

  public static async getAll(req: Request, res: Response) {
    getRepository(Film)
      .find({ relations: ['actors'] })
      .then((films) => {
        generateResponse(res, StatusCode.OK, films);
      })
      .catch(() => {
        generateResponse(res, StatusCode.INTERNAL_SERVER_ERROR);
      });
  }

  public static async add(req: Request, res: Response) {
    let response: { statusCode: StatusCode; data: any } = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      data: '',
    };

    try {
      let film: Film = await getCustomRepository(FilmRepository).createFromBodyOrFail(req.body);
      film = await getRepository(Film).save(film);
      response = {
        statusCode: StatusCode.CREATED,
        data: film,
      };
    } catch (ex) {
      if (Array.isArray(ex)) {
        response = { statusCode: StatusCode.BAD_REQUEST, data: ex };
      } else if (ex instanceof QueryFailedError) {
        response = {
          statusCode: StatusCode.INTERNAL_SERVER_ERROR,
          data: ex.message,
        };
      }
    } finally {
      generateResponse(res, response.statusCode, response.data);
    }
  }

  public static async delete(req: Request, res: Response) {
    const id = await APIUtil.id(req.params.id);
    const filmRepository = await getRepository(Film);
    let response: { statusCode: StatusCode; data: any } = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      data: '',
    };

    try {
      const film: Film = await filmRepository.findOneOrFail({ id });
      await filmRepository.delete({ id: film.id });
      response = {
        statusCode: StatusCode.ACCEPTED,
        data: film,
      };
    } catch (ex) {
      if (ex instanceof Error && ex.name === 'EntityNotFound') {
        response = { statusCode: StatusCode.NOT_FOUND, data: `Cannot find a Film with id ${id}` };
      } else if (ex instanceof QueryFailedError) {
        response = {
          statusCode: StatusCode.INTERNAL_SERVER_ERROR,
          data: ex.message,
        };
      }
    } finally {
      generateResponse(res, response.statusCode, response.data);
    }
  }

  public static async update(req: Request, res: Response) {
    const id = await APIUtil.id(req.params.id);
    const filmRepository = await getRepository(Film);
    const newFilm: Film = await getCustomRepository(FilmRepository).createFromBody(req.body);
    let response: { statusCode: StatusCode; data: any } = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      data: '',
    };

    try {
      const film: Film = await filmRepository.findOneOrFail({ id });
      await filmRepository.merge(film, newFilm);
      await validateOrReject(film, {
        forbidUnknownValues: true,
        validationError: {
          target: false,
        },
      });
      await filmRepository.save(film);
      response = { statusCode: StatusCode.OK, data: film };
    } catch (ex) {
      if (ex instanceof Error && ex.name === 'EntityNotFound') {
        response = { statusCode: StatusCode.NOT_FOUND, data: `Cannot find a Film with id ${id}` };
      } else if (Array.isArray(ex)) {
        response = { statusCode: StatusCode.BAD_REQUEST, data: ex };
      } else if (ex instanceof QueryFailedError) {
        response = {
          statusCode: StatusCode.INTERNAL_SERVER_ERROR,
          data: ex.message,
        };
      }
    } finally {
      generateResponse(res, response.statusCode, response.data);
    }
  }
}
