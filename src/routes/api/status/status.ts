// eslint-disable-next-line no-unused-vars
import { Router, Request, Response } from 'express';
import { StatusCode } from '../response';

const router = Router();
const sendStatus = (req: Request, res: Response) => {
  res.status(StatusCode.OK).end();
};

router.get('/', sendStatus);
router.head('/', sendStatus);

export default router;
