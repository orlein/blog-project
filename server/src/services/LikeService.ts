import { UsersLikeArticles } from '../models/UsersLikeArticles';
export abstract class LikeService {
  public static likeDislikeCancel = (userId: number, articleId: number) => async (ldc: number): Promise<any> => {
    const userLikeArticle = await UsersLikeArticles.findOne({ where: { userId: userId, articleId: articleId }})
    if(userLikeArticle) {
      const result = await UsersLikeArticles.update(
        { likeOrDislike: -1 }, 
        { where: { 
          userId: userId, 
          articleId: articleId }
        })
      return result;
    } else {
      const result = await UsersLikeArticles.create<UsersLikeArticles>({
        userId: userId,
        articleId: articleId,
        likeOrDislike: -1
      })
      return result;
    }
  }
}