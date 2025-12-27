import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userZodSchema, User } from '../models/user';
import { auth } from '../middleware/auth';
import { IUser } from '../interfaces';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';
import { getProfile, register } from '../controllers/users.controller';

const router = express.Router();

router.get('/me', ...auth, getProfile);

router.post('/', register);

export default router;
