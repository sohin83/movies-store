import mongoose from 'mongoose';
import z from 'zod';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';

const userSchema = new mongoose.Schema<IUser>({
   name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1024,
   },
   isAdmin: {
      type: Boolean,
      default: false,
   },
});

userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign(
      {
         _id: this._id,
         name: this.name,
         email: this.email,
         isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET as string
   );
   return token;
};

export const User = mongoose.model<IUser>('User', userSchema);

export const userZodSchema = z.object({
   name: z.string().min(5).max(50),
   email: z.email().nonempty({ message: 'Email is required' }),
   password: z.string().min(5).max(255),
});

export type userSchemaType = z.infer<typeof userZodSchema>;
