import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
export function validateObjectId(
   req: Request,
   res: Response,
   next: NextFunction
) {
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new AppError('Invalid ID.', 404);
   }
   next();
}
