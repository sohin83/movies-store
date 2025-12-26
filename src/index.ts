import express, {
   NextFunction,
   type Express,
   type Request,
   type Response,
} from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
   res.send('Welcome to Express & TypeScript Server');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
