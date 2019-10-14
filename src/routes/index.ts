import { Router } from 'express';
import user from './user';

const routes = Router();

routes.use(user);

routes.get('/', (req, res) => {
  res.render('index');
});

export default routes;
