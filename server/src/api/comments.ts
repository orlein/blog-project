import { Request, Response, NextFunction } from 'express';
import { Util, ResponseBody, SUCCESSFUL } from '../common';
import { Comment } from '../models/Comment';
export abstract class CommentsController {

  /**
   * GET /api/v1/articles/{id}/comments?page={page}&perPage={perPage}
   */
  public static getAllCommentsFromAnArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const page = Util.safeParse(req.query.page);
      const perPage = Util.safeParse(req.query.perPage);
      const articleId = Util.safeParse(req.query.id);
      const comments = await Comment.findAll({offset: page * perPage, limit: perPage, where: { articleId } });
      const responseBody = new ResponseBody(SUCCESSFUL, comments);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/articles/{id}/comments
   */
  public static postCommentToAnArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
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
   * PATCH /api/v1/comments/{id}
   */
  public static editComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
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
   * DELETE /api/v1/comments/{id}
   */
  public static deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
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
   * POST /api/v1/comments/{id}/like
   */
  public static likeComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const likerId = Util.safeParse(req.user.id);
      const articleId = Util.safeParse(req.params.id);
      const result = await LikeService.cancelArticleLikeDislike(likerId, articleId)(1);
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/comments/{id}/dislike
   */
  public static dislikeComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const likerId = Util.safeParse(req.user.id);
      const articleId = Util.safeParse(req.params.id);
      const result = await LikeService.cancelArticleLikeDislike(likerId, articleId)(-1);
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }


  /**
   * POST /api/v1/comments/{id}/cancel
   */
  public static cancelLikeComent = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const likerId = Util.safeParse(req.user.id);
      const articleId = Util.safeParse(req.params.id);
      const result = await LikeService.cancelArticleLikeDislike(likerId, articleId)(0);
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  } 
}