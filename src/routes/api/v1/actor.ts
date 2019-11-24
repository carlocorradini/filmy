import { Router } from 'express';
import { ActorController } from '../../../controllers';
import { auth } from '../../../middleware';

const router = Router();

router.get('/:id([0-9]+)', ActorController.getOne);
router.get('/', ActorController.getAll);
router.post('/', [auth], ActorController.add);
router.delete('/:id([0-9]+)', [auth], ActorController.delete);
router.put('/:id([0-9]+)', [auth], ActorController.update);

export default router;
