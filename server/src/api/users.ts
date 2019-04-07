import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export abstract class UsersController {

  /**
   * POST /api/v1/login 
   */
  public static login = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('login');
  }

  /** 
   * GET /api/v1/users?page={page}&perPage={perPage}
   * */ 
  public static getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const user = await User.findAll();
      return res.status(200).json(user);
    } catch(e) {
      next(e);
    }
    // return res.status(200).send('return all users');
  }

  /**
   * GET /api/v1/users/{id}
   *  */  
  public static getSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {

    } catch (e) {
      next(e);
    }
    return res.status(200).send('single user');
  }

  /**
   * POST /api/v1/users
   */
  public static registerSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const user = await User.create(req.body);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
   
  }

  /**
   * PATCH /api/v1/users/{id}
   */
  public static updateSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('update single user');
  }

  /**
   * GET /api/v1/users/{id}/followers
   */
  public static getAllFollowers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get all followers of this user');
  } 

  /**
   * POST /api/v1/followers/{id}
   */
  public static addFollower = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user follows a user ');
  }

  /**
   * POST /api/v1/followers
   */
  public static addManyFollowers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user follows many users ');
  }

  /**
   * DELETE /api/v1/followers/{id}
   */
  public static removeFollower = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user unfollows a user ');
  }
  
  /**
   * POST /api/v1/blockers
   * DELETE method cannot get body
   */
  public static removeManyFollowers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user unfollow many users from body ');
  }

  /**
   * POST /api/v1/blockers/{id}
   */
  public static addBlockers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user follow a user ');
  }

  /**
   * DELETE /api/v1/blockers/{id}
   */
  public static removeBlocker = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user unfollow a user ');
  }

  /**
   * POST /api/v1/blockers
   * DELETE method cannot get body
   */
  public static removeManyBlocker = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user unfollow many users from body ');
  }

  /**
   * DELETE /api/v1/users/{id}
   */
  public static deleteSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('delete single user');
  }

  
  
}