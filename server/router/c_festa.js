import express from 'express';
import * as culture from '../controller/culture.js';

const router = express.Router();

// GET
router.get('/', culture.getFestas);

// GET
router.get('/:festa_NUM', culture.getFesta);

// POST
router.post('/', culture.CreateFesta);

// PUT
router.put('/:festa_NUM', culture.UpdateFesta);

// DELETE
router.delete('/:festa_NUM', culture.deleteFesta);

export default router;
