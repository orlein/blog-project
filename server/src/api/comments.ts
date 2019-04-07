import { Request, Response, NextFunction } from 'express';

export abstract class CommentsController {

  /**
   * GET /api/v1/articles/{id}/comments?page={page}&perPage={perPage}
   */
  public static getAllCommentsFromAnArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get all comments from this article');
  }

  /**
   * POST /api/v1/articles/{id}/comments
   */
  public static postCommentToAnArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get all comments from this article');
  }
  
  /**
   * PATCH /api/v1/comments/{id}
   */
  public static editComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('edit a comment from this article');
  }
  
  /**
   * DELETE /api/v1/comments/{id}
   */
  public static deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('delete a from this article');
  }

  /**
   * POST /api/v1/comments
   * delete many comments 
   */
  public static deleteManyComments = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('delete comments, but not instantly');
  }

  /**
   * POST /api/v1/comments/{id}/like
   */
  public static likeComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user likes an comment');
  }

  /**
   * POST /api/v1/comments/{id}/dislike
   */
  public static dislikeComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user dislikes an comment');
  }
}