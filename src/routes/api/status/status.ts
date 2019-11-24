// eslint-disable-next-line no-unused-vars
import { Router, Request, Response } from 'express';
import { StatusCode } from '../../../utils';

const router = Router();

router.all('/', (req: Request, res: Response) => {
  res.status(StatusCode.OK).end();
});

export default router;
