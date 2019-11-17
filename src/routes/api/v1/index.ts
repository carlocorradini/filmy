import { Router } from 'express';
import film from './film';
import actor from './actor';

const router = Router();

router.use('/film', film);
router.use('/actor', actor);

export default router;
