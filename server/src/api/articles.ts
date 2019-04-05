import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export abstract class ArticlesController {

  /**
   * GET /api/v1/articles?page={page}&perPage={perPage}
   */
  public static getArticles = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{

  }
  /**
   * GET /api/v1/articles/{id}
   */
  public static getSingleArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{

  }

  /**
   * POST /api/v1/articles
   */
  public static postArticles = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{

  } 

  /**
   * PATCH /api/v1/articles/{id}
   */
  public static editArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{

  }

  /**
   * DELETE /api/v1/articles/{id}
   */
  public static deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{

  }

  /**
   * PATCH /api/v1/articles/{id}/like
   */
  public static likeArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
  
  }

  /**
   * PATCH /api/v1/articles/{id}/dislike
   */
  public static dislikeArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{

  }

}