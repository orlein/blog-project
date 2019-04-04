import { Request, Response, NextFunction } from 'express';

export abstract class UsersController {
  /** 
   * GET /api/v1/users?page={page}&perPage={perPage}
   * */ 
  public static getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('return all users');
  }

  /**
   * GET /api/v1/users/{id}
   *  */  
  public static getSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('single user');
  }

  /**
   * POST /api/v1/users
   */
  public static registerSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('register user');
  }

  /**
   * PATCH /api/v1/users/{id}
   */
  public static updateSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('update single user');
  }

  /**
   * DELETE /api/v1/users/{id}
   */
  public static deleteSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('delete single user');
  }

  /**
   * POST /api/v1/login
   */
  public static login = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('login');
  }
}