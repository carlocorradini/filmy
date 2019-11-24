import { Router } from 'express';
import { UserController } from '../../../controllers';
import { AuthMiddleware } from '../../../middleware';

const router = Router();

router.get('/:id([0-9]+)', UserController.getOne);
router.get('/', UserController.getAll);
router.post('/', UserController.add);
router.delete('/:id([0-9]+)', [AuthMiddleware.JWT], UserController.delete);
router.put('/:id([0-9]+)', [AuthMiddleware.JWT], UserController.update);

export default router;
