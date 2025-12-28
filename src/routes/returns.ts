import express from 'express';
import { auth } from '../middleware/auth';
import { createReturn } from '../controllers/returns.controller';

const router = express.Router();

router.post('/', ...auth, createReturn);

export default router;
