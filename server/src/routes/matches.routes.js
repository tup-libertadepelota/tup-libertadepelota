import { Router } from 'express';
import {
  getAllMatches,
  getOneMatch,
  createMatch,
  putMatch,
  patchMatch,
  removeMatch,
} from '../controllers/matches.controller.js';

const router = Router();

router.get('/matches', getAllMatches)
router.get('/matches/:id', getOneMatch)
router.post('/matches', createMatch)
router.put('/matches/:id', putMatch)
router.patch('/matches/:id', patchMatch)
router.delete('/matches/:id', removeMatch)

export default router