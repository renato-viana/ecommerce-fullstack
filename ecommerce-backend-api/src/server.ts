import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './handlers/product';
import userRoutes from './handlers/user';
import orderRoutes from './handlers/order';

dotenv.config();

const apiHost = process.env.API_HOST;
const apiPort = process.env.API_PORT;

const app: express.Application = express();
const address = `${apiHost}:${apiPort}`;

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(apiPort, function () {
  console.log(`starting app on: ${address}`);
});
