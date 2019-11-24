import { Router } from 'express';
import auth from './auth';
import film from './film';
import actor from './actor';

const router = Router();

router.use('/auth', auth);
router.use('/film', film);
router.use('/actor', actor);

export default router;
