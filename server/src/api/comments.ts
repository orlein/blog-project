import { Request, Response, NextFunction } from 'express';
import { Util, ResponseBody, SUCCESSFUL } from '../common';
import { Comment } from '../models/Comment';
import { Article } from '../models/Article';
import { LikeService } from '../services';
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
      const articleId = Util.safeParse(req.params.id);
      const commentBody = {...req.body, articleId: articleId}
      const comment = await Comment.create<Comment>(commentBody);
      await comment.save();
      const responseBody = new ResponseBody(SUCCESSFUL, comment);
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
      const result = await Comment.update(req.body, {where: { id }})
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
      const result = await Comment.update({ toBeDeleted: true }, { where: {id}});
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
      const commentId = Util.safeParse(req.params.id);
      const result = await LikeService.likeDislikeCancelComment(likerId, commentId)(1);
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
      const commentId = Util.safeParse(req.params.id);
      const result = await LikeService.likeDislikeCancelComment(likerId, commentId)(-1);
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }


  /**
   * POST /api/v1/comments/{id}/cancel
   */
  public static cancelLikeComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const likerId = Util.safeParse(req.user.id);
      const articleId = Util.safeParse(req.params.id);
      const result = await LikeService.likeDislikeCancelComment(likerId, articleId)(0);
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  } 
}