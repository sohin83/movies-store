import express, { type Express } from 'express';
import dotenv from 'dotenv';
import connectDB from './startup/db';
import routes from './startup/routes';
import './config/env';
const app: Express = express();
routes(app);
connectDB();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
export default server;
