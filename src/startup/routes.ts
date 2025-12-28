import express from 'express';
import movies from '../routes/movies';
import generes from '../routes/generes';
import users from '../routes/users';
import auth from '../routes/auth';
import customers from '../routes/customers';
import rentals from '../routes/rentals';
import { errorHandler } from '../middleware/errorHandler';
import returns from '../routes/returns';
export default function (app: express.Application) {
   app.use(express.json());
   app.use('/api/movies', movies);
   app.use('/api/genres', generes);
   app.use('/api/users', users);
   app.use('/api/auth', auth);
   app.use('/api/customers', customers);
   app.use('/api/rentals', rentals);
   app.use('/api/returns', returns);
   app.use(errorHandler);
}
