import { Router } from 'express';
import {
  getAllMatches,
  getOneMatch,
  createMatch,
  putMatch,
  patchMatch,
  removeMatch,
} from '../controllers/matches.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

const router = Router();

router.use(authenticate);
router.get('/matches', getAllMatches);
router.get('/matches/:id', getOneMatch);
router.post('/matches', authorizeRole('admin'), createMatch);
router.put('/matches/:id', putMatch);
router.patch('/matches/:id', patchMatch);
router.delete('/matches/:id', authorizeRole('admin'), removeMatch);

export default router;
