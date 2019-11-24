import { Router } from 'express';
import { FilmController } from '../../../controllers';
import { auth } from '../../../middleware';

const router = Router();

router.get('/:id([0-9]+)', FilmController.getOne);
router.get('/', FilmController.getAll);
router.post('/', [auth], FilmController.add);
router.delete('/:id([0-9]+)', [auth], FilmController.delete);
router.put('/:id([0-9]+)', [auth], FilmController.update);

export default router;
