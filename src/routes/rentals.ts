import express from 'express';
import { auth } from '../middleware/auth';
import { getRentals, createRental } from '../controllers/rentals.controller';

const router = express.Router();

router.get('/', ...auth, getRentals);

router.post('/', ...auth, createRental);

export default router;
