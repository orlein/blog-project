import { Request, Response, NextFunction } from 'express';

export abstract class ArticlesController {

  /**
   * GET /api/v1/articles?page={page}&perPage={perPage}
   */
  public static getArticles = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get all articles by page');
  }

  /**
   * GET /api/v1/channel/{id}/articles?page={page}&perPage={perPage}
   */
  public static getArticlesFromChannel = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get all articles by page in a channel');
  }

  /**
   * GET /api/v1/articles/{id}
   */
  public static getSingleArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get a single article');
  }

  /**
   * POST /api/v1/articles
   */
  public static postArticles = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('post an article');
  } 

  /**
   * PATCH /api/v1/articles/{id}
   */
  public static editArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('edit an article');
  }

  /**
   * DELETE /api/v1/articles/{id}
   */
  public static deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('delete an article, but not instantly');
  }

  /**
   * POST /api/v1/articles/{id}/like
   */
  public static likeArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('this user likes an article');
  }

  /**
   * POST /api/v1/articles/{id}/dislike
   */
  public static dislikeArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('delete an article, but not instantly');
  }

}