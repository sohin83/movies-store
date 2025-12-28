import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Rental, rentalZodSchema } from '../models/rental';
import { Customer } from '../models/customer';
import { Movie } from '../models/movie';
import { AppError } from '../utils/AppError';

export const getRentals = asyncHandler(async (req: Request, res: Response) => {
   const rentals = await Rental.find().sort('-dateOut');
   res.send(rentals);
});

export const createRental = asyncHandler(
   async (req: Request, res: Response) => {
      const data = rentalZodSchema.parse(req.body);

      const customer = await Customer.findById(data.customerId);
      if (!customer) throw new AppError('Invalid customer.', 400);

      const movie = await Movie.findById(data.movieId);
      if (!movie) throw new AppError('Invalid movie.', 400);

      if (movie.numberInStock === 0)
         throw new AppError('Movie not in stock.', 400);

      let rental = new Rental({
         customer: customer._id,
         movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
         },
      });

      rental = await rental.save();

      movie.numberInStock--;
      await movie.save();

      res.send(rental);
   }
);
