import { Router } from 'express';
import getFilm from './getFilm';
import getFilms from './getFilms';

const router = Router();

router.get('/', getFilms);
router.get('/:id', getFilm);

export default router;
