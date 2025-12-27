import { Document } from 'mongoose';

export interface JwtPayload {
   _id: string;
   name: string;
   email: string;
   isAdmin: boolean;
}

export interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   isAdmin: boolean;
   generateAuthToken(): string;
}

export interface IGenre extends Document {
   name: string;
}

export interface IMovie extends Document {
   title: string;
   genre: IGenre;
   numberInStock: number;
   dailyRentalRate: number;
}
