import { Request, Response, NextFunction } from 'express';

export abstract class UsersController {
  public static GetUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('return all users');
  }
}