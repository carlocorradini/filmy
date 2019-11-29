// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository, getCustomRepository, QueryFailedError } from 'typeorm';
import { validateOrReject } from 'class-validator';
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
    let response: { statusCode: StatusCode; data: any } = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      data: '',
    };

    try {
      let user: User = await getCustomRepository(UserRepository).createFromBodyOrFail(req.body);
      user = await getRepository(User).save(user);
      response = {
        statusCode: StatusCode.CREATED,
        data: user,
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
    const { id } = req.params;
    const userRepository = await getRepository(User);
    let response: { statusCode: StatusCode; data: any } = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      data: '',
    };

    try {
      const user: User = await userRepository.findOneOrFail({ id });
      await userRepository.delete({ id: user.id });
      response = {
        statusCode: StatusCode.ACCEPTED,
        data: user,
      };
    } catch (ex) {
      if (ex instanceof Error && ex.name === 'EntityNotFound') {
        response = { statusCode: StatusCode.NOT_FOUND, data: `Cannot find an User with id ${id}` };
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
    const { id } = req.params;
    const userRepository = await getRepository(User);
    const newUser: User = await getCustomRepository(UserRepository).createFromBody(req.body);
    let response: { statusCode: StatusCode; data: any } = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      data: '',
    };

    try {
      const user: User = await userRepository.findOneOrFail({ id });
      await userRepository.merge(user, newUser);
      await validateOrReject(user, {
        forbidUnknownValues: true,
        validationError: {
          target: false,
        },
      });
      await userRepository.save(user);
      response = { statusCode: StatusCode.OK, data: user };
    } catch (ex) {
      if (ex instanceof Error && ex.name === 'EntityNotFound') {
        response = { statusCode: StatusCode.NOT_FOUND, data: `Cannot find an User with id ${id}` };
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
