import mongoose from 'mongoose';
import z from 'zod';
import { genreSchema } from './genre';
import { IMovie } from '../interfaces';

const movieSchema = new mongoose.Schema<IMovie>({
   title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
   },
   genre: {
      type: genreSchema,
      required: true,
   },
   numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
   },
   dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
   },
});

export const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export const movieZodSchema = z.object({
   title: z.string().min(5).max(50),
   genreId: z.string().min(1),
   numberInStock: z.number().min(0),
   dailyRentalRate: z.number().min(0),
});

export type MovieSchemaType = z.infer<typeof movieZodSchema>;
