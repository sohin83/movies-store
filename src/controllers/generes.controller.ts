import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { IGenre } from '../interfaces';
import { Genre } from '../models/genre';
import { genreZodSchema } from '../models/genre';
import { AppError } from '../utils/AppError';

export const getGenres = asyncHandler(async (req: Request, res: Response) => {
   const genres: IGenre[] = await Genre.find().select('-__v').sort('name');
   res.send(genres);
});

export const createGenre = asyncHandler(async (req: Request, res: Response) => {
   const data = genreZodSchema.parse(req.body);
   const genre: IGenre = new Genre({ name: data.name });
   await genre.save();
   res.send(genre);
});

export const updateGenre = asyncHandler(async (req: Request, res: Response) => {
   const data = genreZodSchema.parse(req.body);

   const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
         name: data.name,
      },
      { new: true }
   );

   if (!genre)
      throw new AppError('The genre with the given ID was not found.', 404);

   res.send(genre);
});

export const deleteGenre = asyncHandler(async (req: Request, res: Response) => {
   const genre: IGenre | null = await Genre.findByIdAndDelete(req.params.id);

   if (!genre)
      throw new AppError('The genre with the given ID was not found.', 404);

   res.send(genre);
});

export const getGenreById = asyncHandler(
   async (req: Request, res: Response) => {
      const genre: IGenre | null = await Genre.findById(req.params.id).select(
         '-__v'
      );

      if (!genre)
         throw new AppError('The genre with the given ID was not found.', 404);

      res.send(genre);
   }
);
