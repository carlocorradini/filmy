import { Router } from 'express';
import film from './film';

const router = Router();

router.use('/film', film);

export default router;
