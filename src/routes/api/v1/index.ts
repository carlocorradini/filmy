import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello From API V1.0 at ${new Date().toISOString()}`);
});

export default router;
