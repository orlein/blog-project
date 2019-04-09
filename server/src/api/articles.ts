import { Request, Response, NextFunction } from 'express';
import { Util, ResponseBody, SUCCESSFUL } from '../common';
import { Article } from '../models/Article';
import { UsersLikeArticles } from '../models/UsersLikeArticles';

export abstract class ArticlesController {

  /**
   * GET /api/v1/articles?page={page}&perPage={perPage}
   */
  public static getArticles = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const page = Util.safeParse(req.query.page);
      const perPage = Util.safeParse(req.query.perPage);
      const articles = await Article.findAll({offset: page * perPage, limit: perPage });
      const responseBody = new ResponseBody(SUCCESSFUL, articles);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * GET /api/v1/channel/{id}/articles?page={page}&perPage={perPage}
   */
  public static getArticlesFromChannel = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const [ channelId, page, perPage ] = Util.safeParseMany([req.query.id, req.query.page, req.query.perPage]);
      const articles = await Article.findAll({where: { channelId }});
      const responseBody = new ResponseBody(SUCCESSFUL, articles);
      return res.status(200).json(responseBody);
    } catch (e) {
      next(e);
    }
  }

  /**
   * GET /api/v1/articles/{id}
   */
  public static getSingleArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const articleId = Util.safeParse(req.params.id);
      const article = await Article.findOne({where: { id: articleId }});
      const responseBody = new ResponseBody(SUCCESSFUL, article);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/articles
   */
  public static postArticles = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const article = await Article.create<Article>(req.body);
      await article.save();
      const responseBody = new ResponseBody(SUCCESSFUL, article);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  } 

  /**
   * PATCH /api/v1/articles/{id}
   */
  public static updateArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.params.id);
      const result = await Article.update(req.body, { where: {id}});
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * DELETE /api/v1/articles/{id}
   */
  public static deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.params.id);
      const result = await Article.update({ toBeDeleted: true } , {where: { id }});
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/articles/{id}/like
   */
  public static likeArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const likerId = Util.safeParse(req.user.id);
      const articleId = Util.safeParse(req.params.id);
      const userLikeArticle = await UsersLikeArticles.findOne({ where: { userId: likerId, articleId: articleId }})
      const responseBody = new ResponseBody(SUCCESSFUL, {});
      if(userLikeArticle) {
        const result = await UsersLikeArticles.update(
          { likeOrDislike: 1 }, 
          { where: { 
            userId: likerId, 
            articleId: articleId }
          })
        responseBody.body = result;
        return res.status(200).json(responseBody);
      } else {
        const result = await UsersLikeArticles.create<UsersLikeArticles>({
          userId: likerId,
          articleId: articleId,
          likeOrDislike: 1
        })
        responseBody.body = result;
        return res.status(200).json(responseBody);
      }
    } catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/articles/{id}/dislike
   */
  public static dislikeArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const likerId = Util.safeParse(req.user.id);
      const articleId = Util.safeParse(req.params.id);
      const userLikeArticle = await UsersLikeArticles.findOne({ where: { userId: likerId, articleId: articleId }})
      const responseBody = new ResponseBody(SUCCESSFUL, {});
      if(userLikeArticle) {
        const result = await UsersLikeArticles.update(
          { likeOrDislike: 1 }, 
          { where: { 
            userId: likerId, 
            articleId: articleId }
          })
        responseBody.body = result;
        return res.status(200).json(responseBody);
      } else {
        const result = await UsersLikeArticles.create<UsersLikeArticles>({
          userId: likerId,
          articleId: articleId,
          likeOrDislike: -1
        })
        responseBody.body = result;
        return res.status(200).json(responseBody);
      }
    } catch(e) {
      next(e);
    }
  }

}