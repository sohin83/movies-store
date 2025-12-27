import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { IUser } from '../interfaces';
import { User, userZodSchema } from '../models/user';
import { AppError } from '../utils/AppError';
import bcrypt from 'bcrypt';

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
   const user: IUser = await User.findById(req.user?._id).select('-password');
   res.send(user);
});

export const register = asyncHandler(async (req: Request, res: Response) => {
   const data = userZodSchema.parse(req.body);

   let user: IUser | null = await User.findOne({ email: data.email });
   if (user) throw new AppError('User already registered.', 400);

   const passwordHash = await bcrypt.hash(data.password, 10);
   user = new User({
      name: data.name,
      email: data.email,
      password: passwordHash,
      isAdmin: false,
   });
   await user.save();
   res.send(user);
});
