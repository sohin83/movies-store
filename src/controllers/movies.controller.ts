import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { IMovie } from '../interfaces';
import { Movie, movieZodSchema } from '../models/movie';
import { IGenre } from '../interfaces';
import { Genre } from '../models/genre';
import { AppError } from '../utils/AppError';

export const getMovies = asyncHandler(async (req: Request, res: Response) => {
   const movies: IMovie[] = await Movie.find().select('-__v').sort('name');
   res.send(movies);
});

export const createMovie = asyncHandler(async (req: Request, res: Response) => {
   const data = movieZodSchema.parse(req.body);
   const genre: IGenre | null = await Genre.findById(data.genreId);
   if (!genre) throw new AppError('Invalid genre.', 400);

   const movie: IMovie = new Movie({
      title: data.title,
      genre: {
         _id: genre._id,
         name: genre.name,
      },
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate,
   });
   await movie.save();
   res.send(movie);
});

export const updateMovie = asyncHandler(async (req: Request, res: Response) => {
   const data = movieZodSchema.parse(req.body);
   const genre = await Genre.findById(data.genreId);
   if (!genre) throw new AppError('Invalid genre.', 400);

   const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
         title: data.title,
         genre: {
            _id: genre._id,
            name: genre.name,
         },
         numberInStock: data.numberInStock,
         dailyRentalRate: data.dailyRentalRate,
      },
      { new: true }
   );

   if (!movie)
      throw new AppError('The movie with the given ID was not found.', 404);

   res.send(movie);
});

export const deleteMovie = asyncHandler(async (req: Request, res: Response) => {
   const movie: IMovie | null = await Movie.findByIdAndDelete(req.params.id);

   if (!movie)
      throw new AppError('The movie with the given ID was not found.', 404);

   res.send(movie);
});

export const getMovieById = asyncHandler(
   async (req: Request, res: Response) => {
      const movie: IMovie | null = await Movie.findById(req.params.id).select(
         '-__v'
      );

      if (!movie)
         throw new AppError('The movie with the given ID was not found.', 404);

      res.send(movie);
   }
);
