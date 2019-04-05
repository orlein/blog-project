import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './api';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import http from 'http';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { db_name, cookieSecret, isDevelopment, isProudction, port, db_user, db_password, db_host, db_port } from './config';

const app = express();
if (isDevelopment) {
  app.use(morgan('dev'))
}

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: db_name,
  host: db_host,
  port: db_port,
  username: db_user,
  password: db_password,
  models: [__dirname + '/models'],
  operatorsAliases: Op
})

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
});

(async () => {
  await sequelize.sync({force: true});
  http.createServer(app).listen(port, () => console.info(`Server running on port ${port}`))
})();
// app.listen(1337, (err: any) =>{ console.log('Listening on 1337') });