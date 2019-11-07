import { Router } from 'express';
import sayHello from './sayHello';
import getUser from './getUser';

const router = Router();

router.get('/', sayHello);

router.get('/user/:id', getUser);

export default router;
