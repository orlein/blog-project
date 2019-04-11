import { UsersLikeArticles } from '../models/UsersLikeArticles';
import { UsersLikeComments } from '../models/UsersLikeComments';
export abstract class LikeService {
  public static cancelArticleLikeDislike = (userId: number, articleId: number) => async (ldc: number): Promise<any> => {
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

  public static cancelCommentLikeDislike = (userId: number, commentId: number) => async (ldc: number): Promise<any> => {
    const userLikeComment = await UsersLikeComments.findOne({ where: { userId: userId, commentId: commentId }})
    if(userLikeComment) {
      const result = await UsersLikeArticles.update(
        { likeOrDislike: -1 }, 
        { where: { 
          userId: userId, 
          commentId: commentId }
        })
      return result;
    } else {
      const result = await UsersLikeArticles.create<UsersLikeArticles>({
        userId: userId,
        commentId: commentId,
        likeOrDislike: -1
      })
      return result;
    }
}