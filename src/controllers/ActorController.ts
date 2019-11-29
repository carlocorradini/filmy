// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository, QueryFailedError } from 'typeorm';
import { validateOrReject } from 'class-validator';
import ActorRepository from '../db/repository/ActorRepository';
import Actor from '../db/entity/Actor';
import { APIUtil } from '../utils';
import { StatusCode, generateResponse } from '../response';

export default class ActorController {
  public static async getOne(req: Request, res: Response) {
    const id = await APIUtil.id(req.params.id);

    getRepository(Actor)
      .findOneOrFail({ id }, { relations: ['films'] })
      .then((actor) => {
        generateResponse(res, StatusCode.OK, actor);
      })
      .catch(() => {
        generateResponse(res, StatusCode.NOT_FOUND, `Unable to find an Actor with id ${id}`);
      });
  }

  public static async getAll(req: Request, res: Response) {
    getRepository(Actor)
      .find({ relations: ['films'] })
      .then((actors) => {
        generateResponse(res, StatusCode.OK, actors);
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
      let actor: Actor = await getCustomRepository(ActorRepository).createFromBodyOrFail(req.body);
      actor = await getRepository(Actor).save(actor);
      response = {
        statusCode: StatusCode.CREATED,
        data: actor,
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
    const actorRepository = await getRepository(Actor);
    let response: { statusCode: StatusCode; data: any } = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      data: '',
    };

    try {
      const actor: Actor = await actorRepository.findOneOrFail({ id });
      await actorRepository.delete({ id: actor.id });
      response = {
        statusCode: StatusCode.ACCEPTED,
        data: actor,
      };
    } catch (ex) {
      if (ex instanceof Error && ex.name === 'EntityNotFound') {
        response = { statusCode: StatusCode.NOT_FOUND, data: `Cannot find an Actor with id ${id}` };
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
    const actorRepository = await getRepository(Actor);
    const newActor: Actor = await getCustomRepository(ActorRepository).createFromBody(req.body);
    let response: { statusCode: StatusCode; data: any } = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      data: '',
    };

    try {
      const actor: Actor = await actorRepository.findOneOrFail({ id });
      await actorRepository.merge(actor, newActor);
      await validateOrReject(actor, {
        forbidUnknownValues: true,
        validationError: {
          target: false,
        },
      });
      await actorRepository.save(actor);
      response = { statusCode: StatusCode.OK, data: actor };
    } catch (ex) {
      if (ex instanceof Error && ex.name === 'EntityNotFound') {
        response = { statusCode: StatusCode.NOT_FOUND, data: `Cannot find an Actor with id ${id}` };
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
