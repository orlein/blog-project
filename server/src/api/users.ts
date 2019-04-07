import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { Util, CustomError, CANNOT_PARSE_NUMBER, SUCCESSFUL, ResponseBody } from '../common';
import { FollowingUser } from '../models/FollowingUser';

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
      const page = Util.safeParse(req.query.page);
      const perPage = Util.safeParse(req.query.perPage);
      const users = await User.scope('followerCount').findAll({offset: page * perPage, limit: perPage });
      const responseBody = new ResponseBody(SUCCESSFUL, users);
      return res.status(200).json(responseBody);
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
      const id = Util.safeParse(req.query.id);
      const user = await User.scope('followerCount').findOne({where: {id}});
      const responseBody = new ResponseBody(SUCCESSFUL, user);
      return res.status(200).send(responseBody);
    } catch (e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/users
   */
  public static registerSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const user = await User.create<User>(req.body);
      await user.save();
      const responseBody = new ResponseBody(SUCCESSFUL, {});
      return res.status(200).json(responseBody);
    } catch (e) {
      next(e);
    }
   
  }

  /**
   * PATCH /api/v1/users/{id}
   */
  public static updateSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.params.id);
      await User.update(req.body, {where: { id }})
      return res.status(200).json(SUCCESSFUL);
    } catch(e) {
      next(e);
    }
  }

  /**
   * GET /api/v1/users/{id}/followers
   */
  public static getAllFollowers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.params.id);
      
      const followers = await User.findAll<User>({ 
        where: { id },
        include: [{
          model: FollowingUser, as: 'followers',
          where: { 'foloweeid': id },
          required: true
        }]
      })
      const responseBody = new ResponseBody(SUCCESSFUL, followers);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  } 

  /**
   * POST /api/v1/followers/{id}
   */
  public static addFollower = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const followeeId = Util.safeParse(req.user.id);
      const followerId = Util.safeParse(req.params.id);
      await FollowingUser.create<FollowingUser>({ followerId, followeeId });
      const responseBody = new ResponseBody(SUCCESSFUL, {});
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
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