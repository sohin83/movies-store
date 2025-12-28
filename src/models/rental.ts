import mongoose from 'mongoose';
import z from 'zod';
import { IRental, RentalModel } from '../interfaces';
import moment from 'moment';

export const rentalSchema = new mongoose.Schema<IRental, RentalModel>({
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

rentalSchema.statics.lookupRental = function (
   customerId: string,
   movieId: string
) {
   return this.findOne({
      customer: customerId,
      'movie._id': movieId,
   });
};

rentalSchema.methods.return = function () {
   this.dateReturned = new Date();
   const rentalDays = moment().diff(this.dateOut, 'days');
   this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

export const Rental = mongoose.model<IRental, RentalModel>(
   'Rental',
   rentalSchema
);

export const rentalZodSchema = z.object({
   customerId: z.string().min(24),
   movieId: z.string().min(24),
});

export type RentalSchemaType = z.infer<typeof rentalZodSchema>;
