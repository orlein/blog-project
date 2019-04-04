import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './api';
import morgan from 'morgan';
import { cookieSecret, isDevelopment, isProudction, port } from './config';
import session from 'express-session';
import flash from 'connect-flash';

const app = express();
if (isDevelopment) {
  app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser(cookieSecret));
app.use(routes);
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: cookieSecret,
  cookie: {
    httpOnly: true,
    secure: false
  }  
}));
app.use(flash());
app.set('port', port);

app.get('*', (req: Request, res: Response) =>{
  res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response) => {
  res.locals.message = error.message;
  res.locals.error = isDevelopment ? error : {};
  res.status(error.status || 500);
  res.sendStatus(500);
})


app.listen(1337, (err: any) =>{ console.log('Listening on 1337') });