// eslint-disable-next-line no-unused-vars
import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { StatusCode, APIUtil } from '../utils';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await APIUtil.token(req);
    const payload = <any>jwt.verify(token, config.SECURITY_JWT_KEY);
    res.locals.payload = payload;
    next();
  } catch (ex) {
    APIUtil.generateResponse(res, StatusCode.UNAUTHORIZED, 'Invalid Authorization Token');
  }
};
