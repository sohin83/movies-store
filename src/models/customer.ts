import mongoose from 'mongoose';
import z from 'zod';
import { ICustomer } from '../interfaces';

export const customerSchema = new mongoose.Schema<ICustomer>({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
   },
   phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
   },
   isGold: {
      type: Boolean,
      default: false,
   },
});

export const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

export const customerZodSchema = z.object({
   name: z.string().min(5).max(50),
   phone: z.string().min(5).max(50),
   isGold: z.boolean().optional(),
});

export type CustomerSchemaType = z.infer<typeof customerZodSchema>;
