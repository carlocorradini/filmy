// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
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
    try {
      const actor: Actor = await getCustomRepository(ActorRepository).createFromBody(req.body);

      getRepository(Actor)
        .save(actor)
        .then((_actor) => {
          generateResponse(res, StatusCode.CREATED, _actor);
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
      const actor: Actor = await getRepository(Actor).findOneOrFail({ id });

      await getRepository(Actor)
        .delete({ id: actor.id })
        .then(() => {
          generateResponse(res, StatusCode.ACCEPTED, actor);
        })
        .catch(() => {
          generateResponse(res, StatusCode.INTERNAL_SERVER_ERROR);
        });
    } catch (ex) {
      generateResponse(res, StatusCode.NOT_FOUND, `Unable to find an Actor with id ${id}`);
    }
  }

  public static async update(req: Request, res: Response) {
    const id = await APIUtil.id(req.params.id);
    const actorRepository = await getRepository(Actor);

    try {
      const newActor: Actor = await getCustomRepository(ActorRepository).createFromBody(req.body);

      actorRepository
        .findOneOrFail({ id })
        .then(async (actor) => {
          await actorRepository.merge(actor, newActor);
          await actorRepository.save(actor);
          generateResponse(res, StatusCode.OK, actor);
        })
        .catch(() => {
          generateResponse(res, StatusCode.NOT_FOUND, `Unable to find an Actor with id ${id}`);
        });
    } catch (ex) {
      generateResponse(res, StatusCode.BAD_REQUEST, ex);
    }
  }
}
