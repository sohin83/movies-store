import express, { Request, Response } from 'express';
import z from 'zod';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { IUser } from '../interfaces';
import { AppError } from '../utils/AppError';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
   const data = authUserZodSchema.parse(req.body);

   let user: IUser | null = await User.findOne({ email: data.email });
   if (!user) throw new AppError('Invalid email or password.', 400);

   const validPassword = await bcrypt.compare(data.password, user.password);
   if (!validPassword) throw new AppError('Invalid email or password.', 400);
   const token = user.generateAuthToken();

   res.send({ token });
});

const authUserZodSchema = z.object({
   email: z.email().nonempty({ message: 'Email is required' }),
   password: z.string().min(5).max(255),
});

export default router;
