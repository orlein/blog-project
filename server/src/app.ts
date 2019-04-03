import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './api';
import { cookieSecret } from './config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser(cookieSecret));

app.use(routes);

app.get('*', (req: Request, res: Response) =>{
  res.send('hi');
});

app.listen(1337, (err: any) =>{ console.log('Listening on 1337') });