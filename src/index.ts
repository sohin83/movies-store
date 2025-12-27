import express, {
   type Express,
} from 'express';
import dotenv from 'dotenv';
import connectDB from './startup/db';
import routes from './startup/routes';
dotenv.config();
const app: Express = express();
routes(app);
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
