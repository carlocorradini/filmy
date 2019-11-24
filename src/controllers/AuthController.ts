// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../db/entity/User';
import { CryptUtil, JWTUtil, APIUtil } from '../utils';
import { StatusCode, generateResponse } from '../response';
import logger from '../logger';

export default class AuthController {
  public static async signIn(req: Request, res: Response) {
    try {
      const credentials = await APIUtil.credentials(req);
      const user: User = await getRepository(User).findOneOrFail(
        { username: credentials.username },
        { select: ['id', 'username', 'password'] }
      );
      if (!(await CryptUtil.compare(credentials.password, user.password))) throw new Error();

      generateResponse(res, StatusCode.OK, {
        token: await JWTUtil.generate({
          id: user.id,
          username: user.username,
        }),
      });
    } catch (ex) {
      logger.warn(`Unauthorized Access from ${await APIUtil.ip(req)}`);
      generateResponse(res, StatusCode.UNAUTHORIZED, 'Invalid Credentials');
    }
  }
}
