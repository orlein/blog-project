import { Request, Response, NextFunction } from 'express';
import jwt from 'express-jwt';
import { jwtSecret } from '../config';
import { Util } from '../common';
import { User } from '../models/User';
import { Role } from '../models/Role';


const getTokenFromHeader = (req: Request): string | null => {
  const { authorization } = req.headers;

  const tokenIndicator = authorization && authorization.split(' ')[0];
  const token = authorization && authorization.split(' ')[1];
  if (tokenIndicator === 'Token' || 'Bearer') {
    return <string>token;
  }
  return null;
}

export const authentication = {
  required: jwt({
    secret: jwtSecret,
    userProperty: 'user',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: jwtSecret,
    userProperty: 'user',
    getToken: getTokenFromHeader,
    credentialsRequired: false
  })
}

export const authorization = {
  hasToOwn: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = Util.safeParse(req.user.id);
      const user = await User.findOne({where: { id }});
      if (!user) {
        return res.sendStatus(404);
      }
      else if (user.email !== req.user.email) {
        return res.sendStatus(403);
      }
      next();
    } catch(e) {
      next(e);
    }
  },
  authorizeRole: (roles: string[]) => async (req: Request, res:Response, next:NextFunction): Promise<Response | undefined> => {
    try {
      const id = Util.safeParse(req.user.id);
      const user = await User.findOne({ where: { id }});
      if (!user) {
        return res.sendStatus(404);
      } if (!user.authorize(roles)) {
        return res.sendStatus(403);
      }
      next();
    } catch(e) { 
      next(e); 
    }

  }
}