// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
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
    try {
      const film: Film = await getCustomRepository(FilmRepository).createFromBody(req.body);

      getRepository(Film)
        .save(film)
        .then((_film) => {
          generateResponse(res, StatusCode.CREATED, _film);
        })
        .catch(() => {
          generateResponse(res, StatusCode.BAD_REQUEST, 'Constraints violation');
        });
    } catch (ex) {
      generateResponse(res, StatusCode.BAD_REQUEST, ex);
    }
  }

  public static async delete(req: Request, res: Response) {
    const id = await APIUtil.id(req.params.id);

    try {
      const film: Film = await getRepository(Film).findOneOrFail({ id });

      await getRepository(Film)
        .delete({ id: film.id })
        .then(() => {
          generateResponse(res, StatusCode.ACCEPTED, film);
        })
        .catch(() => {
          generateResponse(res, StatusCode.INTERNAL_SERVER_ERROR);
        });
    } catch (ex) {
      generateResponse(res, StatusCode.NOT_FOUND, `Unable to find a Film with id ${id}`);
    }
  }

  public static async update(req: Request, res: Response) {
    const id = await APIUtil.id(req.params.id);
    const filmRepository = await getRepository(Film);

    try {
      const newFilm: Film = await getCustomRepository(FilmRepository).createFromBody(req.body);

      filmRepository
        .findOneOrFail({ id })
        .then(async (film) => {
          await filmRepository.merge(film, newFilm);
          await filmRepository.save(film);
          generateResponse(res, StatusCode.OK, film);
        })
        .catch(() => {
          generateResponse(res, StatusCode.NOT_FOUND, `Unable to find a Film with id ${id}`);
        });
    } catch (ex) {
      generateResponse(res, StatusCode.BAD_REQUEST, ex);
    }
  }
}
