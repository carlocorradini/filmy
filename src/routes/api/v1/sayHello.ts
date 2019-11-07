// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

const sayHello = (req: Request, res: Response) => {
  res.send(`Hello From API V1.0 at ${new Date().toISOString()}`);
};

export default sayHello;
