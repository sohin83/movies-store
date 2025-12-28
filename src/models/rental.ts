import mongoose from 'mongoose';
import z from 'zod';
import { IRental } from '../interfaces';

export const rentalSchema = new mongoose.Schema<IRental>({
   customer: {
      type: mongoose.Schema.Types.ObjectId as any,
      ref: 'Customer',
      required: true,
   },
   movie: {
      type: new mongoose.Schema({
         title: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 255,
            required: true,
         },
         dailyRentalRate: {
            type: Number,
            min: 0,
            max: 255,
            required: true,
         },
      }),
      required: true,
   },
   dateOut: {
      type: Date,
      required: true,
      default: Date.now,
   },
   dateReturned: {
      type: Date,
   },
   rentalFee: {
      type: Number,
      min: 0,
   },
});

export const Rental = mongoose.model<IRental>('Rental', rentalSchema);

export const rentalZodSchema = z.object({
   customerId: z.string().min(24),
   movieId: z.string().min(24),
});

export type RentalSchemaType = z.infer<typeof rentalZodSchema>;
