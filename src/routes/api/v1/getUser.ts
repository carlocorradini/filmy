// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

const sayHello = (req: Request, res: Response) => {
  res.send(`You choose the User with id: ${req.params.id}`);
};

export default sayHello;
