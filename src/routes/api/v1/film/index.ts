import { Router } from 'express';
import getFilm from './getFilm';
import getFilms from './getFilms';
import addFilm from './addFilm';
import deleteFilm from './deleteFilm';
import updateFilm from './updateFilm';

const router = Router();

router.get('/:id', getFilm);
router.get('/', getFilms);
router.post('/', addFilm);
router.delete('/:id', deleteFilm);
router.put('/:id', updateFilm);

export default router;

export { getFilm, getFilms, addFilm, deleteFilm, updateFilm };
