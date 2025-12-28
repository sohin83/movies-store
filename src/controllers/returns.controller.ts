import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Rental, rentalZodSchema } from '../models/rental';
import { Movie } from '../models/movie';
import { AppError } from '../utils/AppError';

export const createReturn = asyncHandler(
   async (req: Request, res: Response) => {
      const data = rentalZodSchema.parse(req.body);
      const rental = await Rental.lookupRental(data.customerId, data.movieId);
      if (!rental) throw new AppError('Rental not found.', 404);

      if (rental.dateReturned)
         throw new AppError('Return already processed.', 400);

      rental.return();
      await rental.save();

      await Movie.updateOne(
         { _id: rental.movie._id },
         {
            $inc: { numberInStock: 1 },
         }
      );

      res.send(rental);
   }
);
