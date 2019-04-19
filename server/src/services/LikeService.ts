import { UsersLikeArticles } from '../models/UsersLikeArticles';
import { UsersLikeComments } from '../models/UsersLikeComments';
export abstract class LikeService {
  public static likeDislikeCancelArticle = (userId: number, articleId: number) => async (ldc: number): Promise<any> => {
    const userLikeArticle = await UsersLikeArticles.findOne({ where: { userId: userId, articleId: articleId }})
    if(userLikeArticle) {
      const result = await UsersLikeArticles.update(
        { likeOrDislike: ldc }, 
        { where: { 
          userId: userId, 
          articleId: articleId }
        })
      return result;
    } else {
      const result = await UsersLikeArticles.create<UsersLikeArticles>({
        userId,
        articleId,
        likeOrDislike: ldc
      })
      return result;
    }
  }

  public static likeDislikeCancelComment = (userId: number, commentId: number) => async (ldc: number): Promise<any> => {
    const userLikeComment = await UsersLikeComments.findOne({ where: { userId: userId, commentId: commentId }})
    if(userLikeComment) {
      const result = await UsersLikeArticles.update(
        { likeOrDislike: ldc }, 
        { where: { 
          userId: userId, 
          commentId: commentId }
        })
      return result;
    } else {
      const result = await UsersLikeArticles.create<UsersLikeArticles>({
        userId: userId,
        commentId: commentId,
        likeOrDislike: ldc
      })
      return result;
    }
  }
}