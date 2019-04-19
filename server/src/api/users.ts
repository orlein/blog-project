import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { Util, SUCCESSFUL, ResponseBody, CustomError, USER_NOT_EXISTS } from '../common';
import { FollowingUser } from '../models/FollowingUser';
import { BlockingUser } from '../models/BlockingUser';
import { USER_ALREADY_EXISTS } from '../common';
import passport from 'passport';


export abstract class UsersController {

  /**
   * POST /api/v1/login 
   */
  public static login = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      await passport.authenticate('local', {session: false}, (err: any, user: User, info: any) => {
        if(err) { return next(err) }
        if(user) {
          user.localToken = user.generateJWT();
          const responseBody = new ResponseBody(SUCCESSFUL, user.toAuthJson());
          return res.status(200).json(responseBody);
        } else {
          throw new CustomError(USER_NOT_EXISTS);
        }
      })(req, res, next);
      return res.sendStatus(500);
    }catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/users
   */
  public static join = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const isAlready = await User.findOne({ where: { email: req.user.email }});
      if (isAlready) {
        throw new CustomError(USER_ALREADY_EXISTS);
      }
      const user = await User.create<User>(req.body);
      await user.save();
      const responseBody = new ResponseBody(SUCCESSFUL, user);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
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
      const responseBody = new ResponseBody(SUCCESSFUL, user);
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
      const result = await User.update(req.body, {where: { id }})
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }


  /**
   * DELETE /api/v1/users/{id}
   */
  public static deleteSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.params.id);
      const result = await User.update({ toBeDeleted: true }, { where: {id}});
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch (e) {
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
      const followerId = Util.safeParse(req.user.id);
      const followeeId = Util.safeParse(req.params.id);
      await FollowingUser.create<FollowingUser>({ followerId, followeeId });
      const responseBody = new ResponseBody(SUCCESSFUL, {});
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/followers
   * body: {
   *  followers: [
   *  ...asdf
   * ]}
   */
  public static addManyFollowers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const followerId = Util.safeParse(req.user.id);
      const [ ...followees ]: User[] = req.body.followees;

      const data = followees.map((followee: User) => { return { followerId, followeeId: followee.id }});
      const result = await FollowingUser.bulkCreate(data, { returning: true })
      
      const responseBody = new ResponseBody(SUCCESSFUL, { result });
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * DELETE /api/v1/followers/{id}
   */
  public static removeFollower = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const followerId = Util.safeParse(req.user.id);
      const followeeId = Util.safeParse(req.params.id);
      await FollowingUser.destroy({ where: { followerId, followeeId }})
      const responseBody = new ResponseBody(SUCCESSFUL, { followerId })
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/blockers/{id}
   */
  public static addBlockers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const blockerId = Util.safeParse(req.user.id);
      const blockeeId = Util.safeParse(req.params.id);
      const newBlockee = await BlockingUser.create<BlockingUser>({ blockerId, blockeeId });
      const responseBody = new ResponseBody(SUCCESSFUL, { blocker: newBlockee });
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * DELETE /api/v1/blockers/{id}
   */
  public static removeBlocker = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const blockerId = Util.safeParse(req.user.id);
      const blockeeId = Util.safeParse(req.params.id);
      const oldBlockee = await BlockingUser.destroy({ where: { blockerId, blockeeId }})
      const responseBody = new ResponseBody(SUCCESSFUL, { oldBlockee })
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }
}