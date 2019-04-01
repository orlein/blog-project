import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('*', (req: Request, res: Response) =>{
  res.send('hi');
});

app.listen(1337, (err: any) =>{ console.log('Listening on 1337') });