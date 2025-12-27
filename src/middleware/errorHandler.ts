import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { ZodError } from 'zod';
import mongoose from 'mongoose';

export function errorHandler(
   err: unknown,
   req: Request,
   res: Response,
   next: NextFunction
) {
   if (err instanceof ZodError) {
      const formattedErrors = err.issues.map((issue) => ({
         field: issue.path.join('.'),
         message: issue.message,
      }));

      return res.status(400).json({
         message: 'Validation failed',
         errors: formattedErrors,
      });
   }

   if (err instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
         message: 'Validation failed',
         errors,
      });
   }

   if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
   }
   console.error(err);
   res.status(500).json({ message: 'Internal server error' });
}
