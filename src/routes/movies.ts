import express from 'express';
import { auth } from '../middleware/auth';
import { validateObjectId } from '../middleware/validateObjectId';
import {
   getMovies,
   createMovie,
   updateMovie,
   deleteMovie,
   getMovieById,
} from '../controllers/movies.controller';

const router = express.Router();

router.get('/', ...auth, getMovies);

router.post('/', ...auth, createMovie);

router.put('/:id', ...auth, validateObjectId, updateMovie);

router.delete('/:id', ...auth, validateObjectId, deleteMovie);

router.get('/:id', ...auth, validateObjectId, getMovieById);

export default router;
