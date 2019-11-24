import { Router } from 'express';
import auth from './auth';
import film from './film';
import actor from './actor';
import user from './user';

const router = Router();

router.use('/auth', auth);
router.use('/film', film);
router.use('/actor', actor);
router.use('/user', user);

export default router;
