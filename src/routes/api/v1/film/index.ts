import { Router } from 'express';
import getFilm from './getFilm';
import getFilms from './getFilms';
import addFilm from './addFilm';

const router = Router();

router.get('/', getFilms);
router.get('/:id', getFilm);
router.post('/', addFilm);

export default router;
