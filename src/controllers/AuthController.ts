// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../db/entity/User';
import { CryptUtil } from '../utils';

export default class AuthController {
  public static async signIn(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send();
    }

    // Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
      console.log(user);
    } catch (error) {
      res.status(401).send();
      return;
    }

    // Check if encrypted password match
    if (await CryptUtil.compare(password, user.password)) {
      console.log('sss');
      res.status(401).send();
      return;
    }

    // Sing JWT, valid for 1 hour
    const token = jwt.sign({ id: user.id, username: user.username }, config.SECURITY_JWT_KEY, {
      expiresIn: '1h',
    });

    // Send the jwt in the response
    res.send(token);
  }
}
