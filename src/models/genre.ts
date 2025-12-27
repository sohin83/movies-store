import mongoose from 'mongoose';
import z from 'zod';
import { IGenre } from '../interfaces';

export const genreSchema = new mongoose.Schema<IGenre>({
   name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
   },
});

export const Genre = mongoose.model<IGenre>('Genre', genreSchema);

export const genreZodSchema = z.object({
   name: z.string().min(5).max(50),
});

export type GenreSchemaType = z.infer<typeof genreZodSchema>;
