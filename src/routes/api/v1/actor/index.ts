import { Router } from 'express';
import getActor from './getActor';
import getActors from './getActors';
import addActor from './addActor';

const router = Router();

router.get('/', getActors);
router.get('/:id', getActor);
router.post('/', addActor);

export default router;
