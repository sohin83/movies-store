import express from 'express';
import { auth } from '../middleware/auth';
import { validateObjectId } from '../middleware/validateObjectId';
import {
   getGenres,
   createGenre,
   updateGenre,
   deleteGenre,
   getGenreById,
} from '../controllers/generes.controller';

const router = express.Router();

router.get('/', ...auth, getGenres);

router.post('/', ...auth, createGenre);

router.put('/:id', ...auth, validateObjectId, updateGenre);

router.delete('/:id', ...auth, validateObjectId, deleteGenre);

router.get('/:id', ...auth, validateObjectId, getGenreById);

export default router;
