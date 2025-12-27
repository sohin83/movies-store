import express from 'express';
import movies from '../routes/movies';
import generes from '../routes/generes';
import users from '../routes/users';
import auth from '../routes/auth';
import { errorHandler } from '../middleware/errorHandler';
export default function (app: express.Application) {
   app.use(express.json());
   app.use('/api/movies', movies);
   app.use('/api/genres', generes);
   app.use('/api/users', users);
   app.use('/api/auth', auth);
   app.use(errorHandler);
}
