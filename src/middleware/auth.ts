import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from '../interfaces';
import { AppError } from '../utils/AppError';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];

   if (!token) {
      throw new AppError('Token missing', 401);
   }

   jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
         throw new AppError('Invalid token', 403);
      }

      req.user = user as JwtPayload;
      next();
   });
}

function requireAuth(
   req: Request,
   res: Response,
   next: NextFunction
): asserts req is Request & { user: JwtPayload } {
   if (!req.user) {
      throw new AppError('Unauthorized', 401);
   }

   next();
}

export const auth = [authenticateToken, requireAuth] as const;
