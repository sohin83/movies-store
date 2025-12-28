import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ICustomer } from '../interfaces';
import { Customer, customerZodSchema } from '../models/customer';
import { AppError } from '../utils/AppError';

export const getCustomers = asyncHandler(
   async (req: Request, res: Response) => {
      const customers: ICustomer[] = await Customer.find()
         .select('-__v')
         .sort('name');
      res.send(customers);
   }
);

export const createCustomer = asyncHandler(
   async (req: Request, res: Response) => {
      const data = customerZodSchema.parse(req.body);
      const customer: ICustomer = new Customer({
         name: data.name,
         phone: data.phone,
         isGold: data.isGold,
      });
      await customer.save();
      res.send(customer);
   }
);

export const updateCustomer = asyncHandler(
   async (req: Request, res: Response) => {
      const data = customerZodSchema.parse(req.body);

      const customer = await Customer.findByIdAndUpdate(
         req.params.id,
         {
            name: data.name,
            phone: data.phone,
            isGold: data.isGold,
         },
         { new: true }
      );

      if (!customer)
         throw new AppError(
            'The customer with the given ID was not found.',
            404
         );

      res.send(customer);
   }
);

export const deleteCustomer = asyncHandler(
   async (req: Request, res: Response) => {
      const customer: ICustomer | null = await Customer.findByIdAndDelete(
         req.params.id
      );

      if (!customer)
         throw new AppError(
            'The customer with the given ID was not found.',
            404
         );

      res.send(customer);
   }
);

export const getCustomerById = asyncHandler(
   async (req: Request, res: Response) => {
      const customer: ICustomer | null = await Customer.findById(
         req.params.id
      ).select('-__v');

      if (!customer)
         throw new AppError(
            'The customer with the given ID was not found.',
            404
         );

      res.send(customer);
   }
);
