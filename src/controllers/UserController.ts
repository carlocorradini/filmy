// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import UserRepository from '../db/repository/UserRepository';
import User from '../db/entity/User';
import { StatusCode, generateResponse } from '../response';

export default class UserController {
  public static async getOne(req: Request, res: Response) {
    const { id } = req.params;

    getRepository(User)
      .findOneOrFail({ id })
      .then((user) => {
        generateResponse(res, StatusCode.OK, user);
      })
      .catch(() => {
        generateResponse(res, StatusCode.NOT_FOUND, `Unable to find an User with id ${id}`);
      });
  }

  public static async getAll(req: Request, res: Response) {
    getRepository(User)
      .find()
      .then((users) => {
        generateResponse(res, StatusCode.OK, users);
      })
      .catch(() => {
        generateResponse(res, StatusCode.INTERNAL_SERVER_ERROR);
      });
  }

  public static async add(req: Request, res: Response) {
    try {
      const user: User = await getCustomRepository(UserRepository).createFromBody(req.body);

      getRepository(User)
        .save(user)
        .then((_user) => {
          generateResponse(res, StatusCode.CREATED, _user);
        })
        .catch(() => {
          generateResponse(res, StatusCode.BAD_REQUEST, 'Constraints violation');
        });
    } catch (ex) {
      generateResponse(res, StatusCode.BAD_REQUEST, ex);
    }
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user: User = await getRepository(User).findOneOrFail({ id });

      await getRepository(User)
        .delete({ id: user.id })
        .then(() => {
          generateResponse(res, StatusCode.ACCEPTED, user);
        })
        .catch(() => {
          generateResponse(res, StatusCode.INTERNAL_SERVER_ERROR);
        });
    } catch (ex) {
      generateResponse(res, StatusCode.NOT_FOUND, `Unable to find an User with id ${id}`);
    }
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = await getRepository(User);

    try {
      const newUser: User = await getCustomRepository(UserRepository).createFromBody(req.body);

      userRepository
        .findOneOrFail({ id })
        .then(async (user) => {
          await userRepository.merge(user, newUser);
          await userRepository.save(user);
          generateResponse(res, StatusCode.OK, user);
        })
        .catch(() => {
          generateResponse(res, StatusCode.NOT_FOUND, `Unable to find an User with id ${id}`);
        });
    } catch (ex) {
      generateResponse(res, StatusCode.BAD_REQUEST, ex);
    }
  }
}
